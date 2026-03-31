## 고다영 포트폴리오

백엔드 개발자 고다영의 포트폴리오 사이트입니다. 
🔗 **[바로가기](https://kodagrammer.github.io/portfolio)**

<br>

## 사용 기술

- React 18 + Vite
- Tailwind CSS (커스텀 디자인 토큰)
- Fonts: Pretendard, Playfair Display

<br>

## 기술 적용 및 구현 포인트

**타이핑 애니메이션 직접 구현**
- 외부 라이브러리 없이 `useEffect`와 `useRef`를 활용해 타이핑 효과 구현
- 문장 구조를 유지하면서 일부 키워드만 순차적으로 노출되도록 처리

**반응형 레이아웃 구성**
- Tailwind CSS를 활용해 모바일/데스크탑 환경에 맞는 UI 구성
- clamp 및 breakpoint를 활용한 타이포그래피 조정

**GitHub Pages 배포 환경 구성**
- Vite의 `base` 옵션 설정을 통해 서브 경로(`/portfolio`) 배포 대응
- 정적 자산 경로를 `import.meta.env.BASE_URL` 기준으로 처리

<br>

## 로컬 실행

```bash
npm install
npm run dev
```
