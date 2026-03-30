# 고다영 포트폴리오 프로젝트

## 프로젝트 개요
백엔드 개발자 고다영의 GitHub Pages 포트폴리오 사이트.
React + Vite + Tailwind CSS 기반 단일 페이지 애플리케이션.

## 핵심 원칙
- **작업 전 `plan.md`로 끝나는 파일이 있다면 반드시 읽을 것**
- 컴포넌트 하나 완성 후 다음으로 넘어갈 것 (한 번에 여러 파일 동시 수정 금지)
- 데이터는 `src/data/portfoloi.json`에서만 가져오고, 컴포넌트 내부에 하드코딩 금지
- Tailwind 유틸리티 클래스 우선 사용, 커스텀 CSS는 최소화
- 설명이나 프롬프트 작성은 한국어을 우선하되, 기술에 대해서는 영어로 기재

## 기술 스택
- React 18 + Vite
- Tailwind CSS (커스텀 토큰은 tailwind.config.js에 정의)
- Fonts: Pretendard, Playfair Display

## 파일 구조
```
src/
  components/     # UI 컴포넌트
  data/
    portfolio.json   # 모든 콘텐츠 데이터
  utils/
    dateUtils.js  # 기간 계산 유틸
    parseMarkdown.jsx  # **볼드** 파싱 유틸
  App.jsx
  index.css
public/
  posts/          # 이슈 포스팅 마크다운 파일들
  images/
    profile.jpg
```

## 작업 금지 사항
- `portfolio.json` 데이터 구조 임의 변경 금지
- `DarkModeToggle` 컴포넌트 재추가 금지 (제거된 기능)
- `ProjectModal.jsx` 재사용 금지 (인라인 토글로 대체)
- 외부 UI 라이브러리 추가 금지 (shadcn, MUI 등)