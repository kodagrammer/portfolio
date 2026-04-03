## Spring Batch Deadlock 해결 — 병렬 Job 환경의 메타 테이블 락 경쟁

### 문제 상황

Quartz 기반으로 3개의 정산 Batch Job이 15분 주기로 동시에 실행되는 환경이었다.
운영 초기에는 문제가 없었는데, 병렬 실행이 겹치는 특정 시간대마다 반복적으로 아래 예외가 발생했다.

```text
org.springframework.dao.DeadlockLoserDataAccessException: PreparedStatementCallback;
```

처음에는 비즈니스 로직 쪽 쿼리 문제로 접근했다. 하지만 발생 지점을 추적해보니 Spring Batch 메타테이블에 접근 시 발생하는 문제라는 것을 발견했다.

---
### 원인 분석

#### Spring Batch 메타테이블에서 왜 Deadlock이 발생했나

Spring Batch는 Job 실행 이력을 `BATCH_JOB_INSTANCE`, `BATCH_JOB_EXECUTION` 등 메타테이블에 기록한다. 
여러 Job이 동시에 실행되면 이 메타테이블에 동시 INSERT가 발생한다.

MySQL InnoDB는 기본 격리수준이 **REPEATABLE_READ**다. 
이 격리수준에서는 INSERT 시 인덱스 범위에 대해 갭 락(Gap Lock) 또는 넥스트 키 락(Next-Key Lock)이 함께 걸릴 수 있다. 
당시 Deadlock 로그를 통해 정확한 락 유형을 확인하지는 못했지만, 서로 다른 Row를 삽입하더라도 동일한 인덱스 범위를 점유하려는 과정에서 경쟁이 발생한 것으로 추정했다.

```text
Job A  ── INSERT ──┐
                   ├── BATCH_JOB_INSTANCE (인덱스 범위 락 경쟁 추정)
Job B  ── INSERT ──┘
```

추가로, Spring Batch의 `JobRepository`는 트랜잭션을 **Step이 완전히 종료될 때까지 유지**한다. 정산 Step의 처리 시간이 길수록 Lock 점유 시간도 길어지고, 그만큼 다른 Job과 충돌할 확률이 높아진다.

---

### 검토한 대안들

| 대안 | 검토 내용 | 결론 |
|------|-----------|------|
| RetryTemplate 적용 | Deadlock 발생 시 재시도 → 근본 원인 미해결, 재시도 중 또 충돌 가능 | ❌ |
| Spring Batch 버전 업그레이드 |  v5.0 DDL 변경(시퀀스 테이블 → DB 네이티브 SEQUENCE)이 관련 이슈를 개선하나, MySQL 환경에서 직접적인 효과 불확실 + Spring Boot 호환성 검토 공수 부담 | ❌ |
| **격리수준 분리** | **메타데이터에만 READ_COMMITTED 적용, 비즈니스 데이터는 유지** | ✅ |

RetryTemplate은 증상을 감추는 것이고, 버전 업그레이드는 MySQL 환경에서 효과가 불확실한 데다 공수도 컸다. 
메타테이블은 Job 실행 이력 기록 용도라 READ_COMMITTED로 낮춰도 정산 데이터 정합성에 영향이 없다고 판단해 격리수준 분리 방향으로 결정했다.

---

### 조치

#### 첫 번째 시도 — HikariCP 격리수준 변경

가장 간단한 접근으로 HikariCP의 격리수준을 READ_COMMITTED로 변경했다. 결과는 여전히 Deadlock이었다.
원인을 파악해보니 두 가지였다.

첫째, 서비스 DataSource와 배치 DataSource가 같은 HikariCP 설정을 공유하고 있었다. 
HikariCP 격리수준을 변경하면 비즈니스 데이터 처리에도 영향이 간다. 정산 데이터 일관성 측면에서 리스크였다.

둘째, HikariCP 격리수준을 변경해도 `JobRepository` 자체의 격리수준은 별도로 관리된다. 
JobRepository는 메타테이블에 접근할 때 자체 트랜잭션 설정을 따르기 때문에, HikariCP만 바꿔서는 메타테이블 Lock 경쟁이 해소되지 않았다.

<br/>

#### 최종 조치 — JobRepository 전용 DataSource 분리 + 격리수준 병행 변경
두 설정을 모두 적용해야 했다. `JobRepository` 전용 DataSource를 분리하고, 해당 DataSource와 JobRepository 양쪽에 READ_COMMITTED를 적용했다.

```java
@Configuration
public class BatchDataSourceConfig {

    @Bean
    @ConfigurationProperties("spring.datasource.batch")
    public DataSource batchDataSource() {
        HikariDataSource ds = new HikariDataSource();
        ds.setTransactionIsolation("TRANSACTION_READ_COMMITTED");
        return ds;
    }

    @Bean
    public JobRepository jobRepository(DataSource batchDataSource,
                                       PlatformTransactionManager batchTxManager) throws Exception {
        JobRepositoryFactoryBean factory = new JobRepositoryFactoryBean();
        factory.setDataSource(batchDataSource);
        factory.setTransactionManager(batchTxManager);
        factory.setIsolationLevelForCreate("ISOLATION_READ_COMMITTED");
        factory.afterPropertiesSet();
        return factory.getObject();
    }
}
```

비즈니스 DataSource는 기존 REPEATABLE_READ를 그대로 유지했다. 
메타테이블은 Job 실행 이력 기록 용도라 READ_COMMITTED로 낮춰도 정산 데이터 정합성에 영향이 없다고 판단했다.

<br/>

#### 분리 결과
```text
[Application]
├── DataSource A (REPEATABLE_READ)
│   └── 비즈니스 데이터 (정산 테이블)
└── DataSource B (READ_COMMITTED)
    └── Batch 메타데이터 (BATCH_JOB_INSTANCE 등)
```

메타테이블은 Job 실행 이력 기록 용도라 READ_COMMITTED로 낮춰도 정산 데이터 정합성에 영향이 없다고 판단했다.

<br/>

#### 검증
3개 Job을 15분 간격으로 병렬 실행하며 1일 이상 모니터링했다. Deadlock은 재발하지 않았고, 이후 병렬 Job 운영 환경을 정식으로 전환했다.

---

### 마치며

Deadlock이라고 하면 비즈니스 로직의 쿼리 문제로 먼저 접근하기 쉽다. 이번 케이스는 프레임워크 내부 동작 방식과 DB 격리수준이 맞물린 문제였다.

격리수준 조정은 정합성과 성능 사이의 트레이드오프다. 이번 케이스에서 READ_COMMITTED를 선택할 수 있었던 건, 메타테이블이 서비스 로직과 분리된 이력 데이터라는 확신이 있었기 때문이다.