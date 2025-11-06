# TripSync - AI 기반 개인화 여행 플래너

실시간 교통정보와 AI 추천을 통해 개인 맞춤형 여행 경험을 제공하는 통합 여행 플래너

## 프로젝트 개요

TripSync는 여행 계획의 모든 과정을 하나의 플랫폼에서 제공합니다:
- 🚗 **스마트 라우팅**: 실시간 교통정보로 최적 경로 제안
- 🤖 **AI 개인화**: 취향 분석을 통한 맞춤 추천
- 🎫 **통합 예약**: 교통수단부터 숙박까지 원스톱 서비스

## Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context / Zustand (예정)

### Backend
- **Framework**: Kotlin Spring Boot with WebFlux
- **Language**: Kotlin
- **Database**: Supabase (PostgreSQL + Real-time)

### External APIs
- Google Maps Platform (경로 최적화)
- 대중교통 Open API (버스/지하철/기차)
- 항공사 API (실시간 항공편)
- OpenAI GPT-4 (AI 추천)

## 프로젝트 구조

```
tripsync/
├── frontend/          # Next.js 프론트엔드 애플리케이션
├── backend/           # Kotlin Spring Boot 백엔드 API
├── docs/              # 프로젝트 문서
└── README.md
```

## 시작하기

### 사전 요구사항
- Node.js 18+
- Java 17+
- Gradle 8+
- Supabase 계정

### Frontend 설치 및 실행

```bash
cd frontend
npm install
npm run dev
```

Frontend는 http://localhost:3000 에서 실행됩니다.

### Backend 설치 및 실행

```bash
cd backend
./gradlew bootRun
```

Backend는 http://localhost:8080 에서 실행됩니다.

## 핵심 기능

### 1. 스마트 여행 플래너
- 출발지-목적지 검색 (자동완성)
- GPS 기반 현재 위치 자동 설정
- 일정 설정 및 관리

### 2. 통합 교통수단 검색
- 대중교통, 항공편, 렌터카 실시간 정보
- Google Maps 기반 경로 최적화
- 취소표/할인표 실시간 알림

### 3. AI 기반 개인화 추천
- 취향 프로파일링
- 관광지, 맛집, 액티비티 추천
- 날씨/시즌 고려한 추천

### 4. 통합 예약 시스템
- 교통수단 통합 예약
- 숙박 시설 검색 및 예약
- 스마트 알림 시스템

## 개발 로드맵

- [x] **Phase 0**: 프로젝트 세팅
- [ ] **Phase 1** (3개월): MVP 개발
  - 기본 검색 및 경로 표시
  - 대중교통 API 연동
  - 사용자 인증 및 프로필
- [ ] **Phase 2** (2개월): AI 추천 시스템
- [ ] **Phase 3** (2개월): 통합 예약 시스템
- [ ] **Phase 4** (1개월): 고도화

## 기여하기

이 프로젝트는 현재 개발 중입니다. 기여 가이드라인은 추후 업데이트될 예정입니다.

## 라이선스

이 프로젝트의 라이선스는 LICENSE.md 파일을 참조하세요.

## 연락처

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.
