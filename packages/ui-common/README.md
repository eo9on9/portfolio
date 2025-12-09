# 공통 UI 패키지

[🔗 사이트 바로가기](https://portfolio-ui-ebon.vercel.app/)

[🔗 개발 문서 바로가기](https://morning-stone-025.notion.site/UI-2bde1b25930480779ff0eec8e961d177)

## 소개

관리자 시스템(어드민) 웹 프로젝트와 아이템 거래소 웹 프로젝트에 사용되는 공통 UI 컴포넌트들을 패키지화 합니다.

공통 컴포넌트를 개발하고 재사용함으로써 개발 효율성과 유지보수성을 높입니다.

또한 Storybook 기반의 문서화와 단위 테스트 환경을 통해, 서비스들이 UI 컴포넌트를 안정적으로 사용할 수 있도록 합니다.

## 사용 기술

- 코어: TypeScript, React, Vite
- UI·스타일링: Tailwind CSS, Radix UI, Lucid Icons
- 테스트: Vitest, React Testing Library
- 코드 품질: ESLint, Prettier
- 문서화: Storybook
- CI·CD: Vercel

## 실행 방법

### 필요 프로그램

- [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
- [pnpm](https://pnpm.io/ko/installation)

### 설치 방법

```
# .nvmrc에 명시된 Node.js 버전 설치
nvm install

# 해당 Node.js 버전 사용
nvm use

# 프로젝트 의존성 설치
pnpm install
```

### 실행 스크립트

```
# 테스트
pnpm test

# 테스트 워치 모드
pnpm test:watch

# 빌드 (코드, 타입, 스타일 포함)
pnpm build

# 빌드 워치 모드
pnpm build:watch

# 스토리북
pnpm storybook
```

## 핵심 구현 내용

- [[빌드] 패키지 독립성 유지](https://morning-stone-025.notion.site/2c3e1b259304804ca0b1c66015dfa050)
- [[문서화] 스토리북](https://morning-stone-025.notion.site/2c3e1b2593048046bff1dabeb32307c0)
- [[테스트] 단위 테스트](https://morning-stone-025.notion.site/2c3e1b259304802c9bfbdc24f882aa91)
- [[버튼] 다형 컴포넌트](https://morning-stone-025.notion.site/2c3e1b259304801fb0eddd323b359d6f)
