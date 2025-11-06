# TripSync Backend

Kotlin Spring Boot WebFlux 기반의 TripSync 백엔드 API 서버

## 기술 스택

- **Language**: Kotlin 1.9.21
- **Framework**: Spring Boot 3.2.1 with WebFlux
- **Database**: PostgreSQL (Supabase) with R2DBC
- **Build Tool**: Gradle 8.5

## 시작하기

### 사전 요구사항

- Java 17 이상
- Gradle 8.0 이상
- PostgreSQL (또는 Supabase 계정)

### 환경 설정

1. `.env.example` 파일을 `.env`로 복사하고 필요한 값을 설정하세요.

```bash
cp .env.example .env
```

2. 데이터베이스 연결 정보를 설정하세요.

### 빌드 및 실행

```bash
# 빌드
./gradlew build

# 실행
./gradlew bootRun
```

서버는 http://localhost:8080 에서 실행됩니다.

### API 엔드포인트

#### Health Check
```
GET /health
```

응답:
```json
{
  "status": "UP",
  "service": "TripSync Backend",
  "version": "0.0.1"
}
```

## 프로젝트 구조

```
src/
├── main/
│   ├── kotlin/
│   │   └── com/tripsync/
│   │       ├── TripSyncApplication.kt
│   │       ├── config/
│   │       │   └── WebConfig.kt
│   │       └── controller/
│   │           └── HealthController.kt
│   └── resources/
│       └── application.yml
└── test/
    └── kotlin/
```

## 개발 가이드

### 코드 스타일

- Kotlin 공식 코딩 컨벤션을 따릅니다.
- 함수형 프로그래밍 스타일을 권장합니다.

### 테스트

```bash
./gradlew test
```

## 라이선스

프로젝트 라이선스는 루트 디렉토리의 LICENSE.md를 참조하세요.
