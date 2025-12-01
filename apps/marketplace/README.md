# 아이템 거래소 웹

[🔗 사이트 바로가기](https://portfolio-market-seven.vercel.app/)

[🔗 개발 문서 바로가기](https://morning-stone-025.notion.site/2b9e1b259304801797c5e5c92967dbf9)

## 소개

게임 유저들이 아이템을 판매하거나 구매할 수 있는 아이템 거래소 웹 입니다.

사용자는 등록된 매물을 조회하고, 상세 정보를 확인하거나, 직접 아이템을 등록해 거래를 시작할 수 있습니다.

또한 판매자·구매자 간에 메시지를 주고받아 거래를 진행할 수 있습니다.

## 사용 기술

- 코어: TypeScript, React, Next.js
- UI·스타일링: Tailwind CSS, Radix UI, Lucid Icons
- 상태 관리: TanStack Query, React Hook Form
- 서버·스토리지: Next.js, Redis, Pusher
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

## 핵심 구현 내용

- [[공통] 아이템 데이터 공통코드화](https://morning-stone-025.notion.site/2b9e1b25930480968f21f8db24bb2a4e)
- [[목록] 무한 스크롤](https://morning-stone-025.notion.site/2b9e1b259304803a8e3df5edd89d1742)
- [[알림·대화] 실시간 이벤트](https://morning-stone-025.notion.site/2b9e1b2593048094b7b6e2a66e2b7f92)
- [[검색] URL 쿼리 연동](https://morning-stone-025.notion.site/URL-2b9e1b2593048024b32bd5687782d246)

## 로드맵

- 이미지 플레이스 홀더: 이미지가 로딩되기 전까지 비어 보이지 않도록, 플레이스홀더를 적용할 예정입니다.
- UI 공통 컴포넌트 패키지화: 어플리케이션 간의 반복되는 UI를 별도 패키지로 분리해 관리할 예정입니다.
- 메시지 입력란 개선 (Input -> Textarea): 현재 단일 줄 입력만 가능한 인풋 필드를 다중 줄 입력이 가능한 텍스트에어리어로 변경할 예정입니다.
- 새로운 메시지만 모아보기: 읽지 않은 메시지 목록만 필터링해서 볼 수 있는 기능을 추가할 예정입니다.
