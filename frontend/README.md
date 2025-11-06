# TripSync Frontend

Next.js 14 기반의 TripSync 프론트엔드 애플리케이션

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: (TBD)

## 시작하기

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 환경 설정

1. `.env.example` 파일을 `.env.local`로 복사하고 필요한 값을 설정하세요.

```bash
cp .env.example .env.local
```

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버는 http://localhost:3000 에서 실행됩니다.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

## 프로젝트 구조

```
frontend/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 메인 페이지
│   └── globals.css        # 글로벌 스타일
├── public/                # 정적 파일
├── .env.example           # 환경 변수 예시
├── next.config.js         # Next.js 설정
├── tailwind.config.ts     # Tailwind CSS 설정
└── tsconfig.json          # TypeScript 설정
```

## 주요 기능

- 🏠 랜딩 페이지
- (추가 예정) 여행 검색 및 계획
- (추가 예정) AI 추천 시스템
- (추가 예정) 통합 예약 시스템

## 개발 가이드

### 코드 스타일

- ESLint를 사용한 코드 린팅
- TypeScript strict 모드 활성화
- Tailwind CSS를 사용한 스타일링

### 린팅

```bash
npm run lint
```

## 라이선스

프로젝트 라이선스는 루트 디렉토리의 LICENSE.md를 참조하세요.
