# 관리자 시스템(어드민) 웹

[🔗 서비스 바로가기](https://portfolio-admin-git-main-eo9on9s-projects.vercel.app/)

[🔗 개발 문서 바로가기](https://개발문서노션링크)

## 소개

서비스 운영자가 실제로 사용할 만한 CRUD·필터링·대시보드 기능을 중심으로 구현한 관리자 시스템입니다.

핵심 구현 내용은 별도의 [개발 문서](https://개발문서노션링크)는 별도로 작성되었습니다.

## 사용 기술

- 코어: TypeScript, React, Next.js
- UI·스타일링: Tailwind CSS, Radix UI, Lucid Icons
- 상태 관리: TanStack Query, React Hook Form
- 서버·스토리지: Next.js, Redis
- 코드 품질: ESLint, Prettier
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
# 개발 환경
pnpm dev
```

## 폴더 아키텍처

> [FSD(Feature Sliced Design)](https://feature-sliced.design/)

- 단위에 따른 레이어들로 구조화하는 아키텍처입니다. 관심사의 분리와 확장성을 목표로 합니다.
- 전역(shared) → 도메인(entity) → 기능(feature) → 화면(widget) → 페이지(page) 순의 단방향으로 의존성이 흐릅니다.

### 레이어 간략 소개

- app: 애플리케이션 단위
- pages: 라우트 페이지 단위
- widgets: 화면의 섹션 단위
- features: 행동·기능 단위
- entities: 비즈니스 도메인 단위
- shared: 공통 전역 리소스 단위

## 로드맵

- 테스트: 기능 모듈과 UI 모듈의 단위 테스트 도입으로 코드 안정성 확보할 예정입니다.
