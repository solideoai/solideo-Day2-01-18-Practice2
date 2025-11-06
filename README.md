
# TripSync — AI 기반 개인화 여행 플래너 (스캐폴드)

이 저장소는 TripSync의 초기 스캐폴드입니다. TripSync는 실시간 교통정보, AI 기반 개인화 추천, 통합 예약 기능을 결합한 여행 플래너 서비스입니다.

## 기술 스택 (현재 스캐폴드)

- 프론트엔드: `Next.js 14` + `TypeScript` + `Tailwind CSS` (폴더: `frontend/`)
- 백엔드: `Kotlin Spring Boot (WebFlux)` (폴더: `backend/`)
- 데이터베이스 / 실시간: `Supabase` (Postgres + Realtime) (설정: `supabase/`)

## 현재 추가된 항목

- Next.js 14 앱 기본 구조 (App Router) 및 Tailwind 설정
- Kotlin Spring Boot (WebFlux) 최소 실행 스켈레톤과 Gradle 빌드 파일
- `supabase/.env.example` 및 Supabase 관련 안내
- 루트 `README.md` 및 `.gitignore`

## 로컬 실행 방법

프론트엔드

```bash
cd frontend
npm install
npm run dev
```

백엔드

```bash
cd backend
# 권장: Gradle Wrapper 사용(프로젝트에 wrapper 추가 시)
./gradlew bootRun
# 또는 로컬에 Gradle이 설치되어 있다면
gradle bootRun
```

Supabase

- Supabase에서 프로젝트를 생성하고, 프로젝트 URL 및 익명(anon) 키를 `supabase/.env.example`을 참고하여 로컬에 `.env`로 복사하세요.
- Realtime(실시간) 기능을 활성화하면 멀티 디바이스 실시간 동기화에 활용할 수 있습니다.

## 구성(권장)

- `frontend`에서 `@supabase/supabase-js`를 설치하고 클라이언트 래퍼를 만들어 인증/실시간 기능을 연결하세요.
- 백엔드는 Supabase의 Postgres 또는 Supabase 서비스 역할 키를 사용해 관리 작업(예: 배치/동기화)을 수행할 수 있습니다.

## 다음 개발 단계 제안

1. (우선) 프론트엔드에 Supabase 클라이언트를 연결하고 인증(Signup/Login) 흐름을 구현
2. 사용자 온보딩 설문(여행 취향 프로파일) 페이지 추가 — AI 개인화 추천을 위한 초기 데이터 수집
3. 간단한 Trips API(생성/조회) 및 프론트엔드 UI 연결
4. Google Maps 연동과 경로 시각화(지도 + 경로 비교 UI)
5. OpenAI 연동을 위한 추천 엔드포인트 설계 및 샘플 구현

원하시면(우선순위 선택)
- Supabase 연결 및 인증 구현
- Trips CRUD API 및 프론트엔드 연결
- 간단한 AI 추천 API(예: OpenAI 프롬프트 기반 샘플)

## 기타

- 이 저장소는 초기 스캐폴드입니다. 로컬에서 의존성을 설치하면 TypeScript/JSX 관련 경고가 해소됩니다.
- 백엔드 실행 시 Java 17 이상 및 Gradle 환경을 확인하세요.

필요하신 다음 작업을 알려주시면 바로 진행하겠습니다. 예: `Supabase 연결 및 Auth 구현` 또는 `Trips API 추가` 등.

