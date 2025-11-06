# TripSync 프로젝트 구조

## 개요

TripSync는 프론트엔드(Next.js)와 백엔드(Kotlin Spring Boot)로 구성된 풀스택 애플리케이션입니다.

## 디렉토리 구조

```
tripsync/
├── frontend/                    # Next.js 14 Frontend
│   ├── app/                     # App Router 디렉토리
│   │   ├── layout.tsx           # 루트 레이아웃
│   │   ├── page.tsx             # 메인 페이지
│   │   └── globals.css          # 글로벌 스타일
│   ├── public/                  # 정적 파일
│   ├── .env.example             # 환경 변수 예시
│   ├── next.config.js           # Next.js 설정
│   ├── tailwind.config.ts       # Tailwind CSS 설정
│   ├── tsconfig.json            # TypeScript 설정
│   └── package.json             # npm 의존성
│
├── backend/                     # Kotlin Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── kotlin/
│   │   │   │   └── com/tripsync/
│   │   │   │       ├── TripSyncApplication.kt
│   │   │   │       ├── config/
│   │   │   │       │   └── WebConfig.kt      # CORS 등 웹 설정
│   │   │   │       └── controller/
│   │   │   │           └── HealthController.kt
│   │   │   └── resources/
│   │   │       └── application.yml            # 애플리케이션 설정
│   │   └── test/
│   ├── .env.example             # 환경 변수 예시
│   ├── build.gradle.kts         # Gradle 빌드 설정
│   ├── settings.gradle.kts      # Gradle 프로젝트 설정
│   └── gradlew                  # Gradle Wrapper
│
├── docs/                        # 프로젝트 문서
│   └── PROJECT_STRUCTURE.md     # 이 파일
│
├── .gitignore                   # Git 무시 파일
└── README.md                    # 프로젝트 메인 README

```

## 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: (TBD: React Context / Zustand)

### Backend
- **Framework**: Spring Boot 3.2.1 with WebFlux
- **Language**: Kotlin 1.9.21
- **Database**: Supabase (PostgreSQL with R2DBC)
- **Build Tool**: Gradle 8.5

### External Services
- **Google Maps API**: 지도 및 경로 최적화
- **대중교통 Open API**: 버스/지하철/기차 정보
- **OpenAI API**: AI 기반 추천 시스템

## 개발 환경 설정

### Frontend 실행

```bash
cd frontend
npm install
npm run dev
```

Frontend는 http://localhost:3000 에서 실행됩니다.

### Backend 실행

```bash
cd backend
./gradlew bootRun
```

Backend는 http://localhost:8080 에서 실행됩니다.

## API 통신

Frontend는 `NEXT_PUBLIC_API_URL` 환경 변수를 통해 Backend API와 통신합니다.

기본값: `http://localhost:8080`

## 다음 단계

- [ ] 사용자 인증 시스템 구축
- [ ] 지도 API 연동
- [ ] 대중교통 API 연동
- [ ] AI 추천 시스템 구축
- [ ] 예약 시스템 구현
