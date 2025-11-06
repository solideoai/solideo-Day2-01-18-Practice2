# Database Schema - TripSync

## Overview
TripSync의 Phase 1 MVP를 위한 데이터베이스 스키마 설계

## Tables

### 1. users (Supabase Auth에서 관리)
Supabase Auth의 기본 사용자 테이블 사용
- id (uuid, primary key)
- email (string)
- created_at (timestamp)

### 2. user_profiles
사용자 프로필 및 취향 정보

```sql
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name VARCHAR(100),
    avatar_url TEXT,

    -- 여행 취향 정보
    travel_style VARCHAR(50), -- 'business', 'leisure', 'family', 'adventure'
    preferred_budget VARCHAR(50), -- 'budget', 'mid-range', 'luxury'
    preferred_transport JSONB, -- ['public', 'car', 'flight', 'train']

    -- 선호도
    interests JSONB, -- ['nature', 'culture', 'food', 'shopping', 'history']

    -- 타임스탬프
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(user_id)
);
```

### 3. trips
사용자의 여행 계획

```sql
CREATE TABLE trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    -- 여행 기본 정보
    title VARCHAR(200) NOT NULL,
    description TEXT,
    trip_type VARCHAR(50), -- 'day_trip', 'short_trip', 'long_trip'

    -- 날짜 정보
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,

    -- 예산
    budget_min DECIMAL(10, 2),
    budget_max DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'KRW',

    -- 상태
    status VARCHAR(50) DEFAULT 'planning', -- 'planning', 'confirmed', 'in_progress', 'completed', 'cancelled'

    -- 타임스탬프
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- 인덱스
    INDEX idx_trips_user_id (user_id),
    INDEX idx_trips_start_date (start_date),
    INDEX idx_trips_status (status)
);
```

### 4. favorite_places
즐겨찾기 장소

```sql
CREATE TABLE favorite_places (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    -- 장소 정보
    name VARCHAR(200) NOT NULL,
    address TEXT,
    place_type VARCHAR(50), -- 'home', 'work', 'custom'

    -- 위치 정보
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,

    -- Google Places ID (선택)
    google_place_id VARCHAR(255),

    -- 타임스탬프
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- 인덱스
    INDEX idx_favorite_places_user_id (user_id),
    UNIQUE(user_id, google_place_id)
);
```

### 5. trip_waypoints
여행 경로의 경유지 (출발지, 목적지, 중간 경유지)

```sql
CREATE TABLE trip_waypoints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,

    -- 경유지 정보
    name VARCHAR(200) NOT NULL,
    address TEXT,
    waypoint_type VARCHAR(50) NOT NULL, -- 'origin', 'destination', 'waypoint'
    sequence_order INT NOT NULL, -- 순서

    -- 위치 정보
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,

    -- 시간 정보
    arrival_time TIMESTAMP WITH TIME ZONE,
    departure_time TIMESTAMP WITH TIME ZONE,
    duration_minutes INT, -- 체류 시간

    -- Google Places ID
    google_place_id VARCHAR(255),

    -- 타임스탬프
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- 인덱스
    INDEX idx_trip_waypoints_trip_id (trip_id),
    INDEX idx_trip_waypoints_sequence (trip_id, sequence_order)
);
```

### 6. trip_routes
여행 경로 정보 (교통수단별)

```sql
CREATE TABLE trip_routes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    from_waypoint_id UUID NOT NULL REFERENCES trip_waypoints(id) ON DELETE CASCADE,
    to_waypoint_id UUID NOT NULL REFERENCES trip_waypoints(id) ON DELETE CASCADE,

    -- 교통수단 정보
    transport_mode VARCHAR(50) NOT NULL, -- 'driving', 'transit', 'walking', 'bicycling', 'flight', 'train'

    -- 경로 상세
    distance_meters INT,
    duration_seconds INT,
    polyline TEXT, -- Google Maps encoded polyline

    -- 대중교통 상세 (JSONB)
    transit_details JSONB, -- 버스/지하철 노선, 환승 정보 등

    -- 비용
    estimated_cost DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'KRW',

    -- 타임스탬프
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- 인덱스
    INDEX idx_trip_routes_trip_id (trip_id),
    INDEX idx_trip_routes_waypoints (from_waypoint_id, to_waypoint_id)
);
```

### 7. search_history
검색 히스토리 (AI 추천을 위한 데이터)

```sql
CREATE TABLE search_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    -- 검색 정보
    origin_name VARCHAR(200),
    origin_lat DECIMAL(10, 8),
    origin_lng DECIMAL(11, 8),

    destination_name VARCHAR(200),
    destination_lat DECIMAL(10, 8),
    destination_lng DECIMAL(11, 8),

    -- 검색 조건
    transport_mode VARCHAR(50),
    search_date TIMESTAMP WITH TIME ZONE,

    -- 타임스탬프
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- 인덱스
    INDEX idx_search_history_user_id (user_id),
    INDEX idx_search_history_created_at (created_at)
);
```

## Relations

```
auth.users (Supabase)
    ↓ 1:1
user_profiles

auth.users
    ↓ 1:N
trips
    ↓ 1:N
trip_waypoints
    ↓ N:N (through trip_routes)
trip_waypoints

auth.users
    ↓ 1:N
favorite_places

auth.users
    ↓ 1:N
search_history
```

## Indexes & Performance

### 주요 인덱스
- user_id 기반 조회를 위한 인덱스
- 날짜 범위 검색을 위한 인덱스
- 위치 기반 검색을 위한 spatial 인덱스 (향후 추가)

### RLS (Row Level Security)
Supabase의 RLS를 활용하여 사용자별 데이터 접근 제어

```sql
-- user_profiles RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
ON user_profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
ON user_profiles FOR UPDATE
USING (auth.uid() = user_id);

-- trips RLS
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own trips"
ON trips FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own trips"
ON trips FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trips"
ON trips FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own trips"
ON trips FOR DELETE
USING (auth.uid() = user_id);

-- favorite_places RLS (동일한 패턴)
-- search_history RLS (동일한 패턴)
```

## Migration Strategy

1. Supabase 콘솔에서 SQL Editor를 통해 테이블 생성
2. RLS 정책 적용
3. 초기 데이터 시딩 (필요 시)
4. 인덱스 성능 모니터링

## Future Enhancements (Phase 2+)

- AI 추천을 위한 user_preferences 테이블
- 예약 정보를 위한 bookings 테이블
- 리뷰 및 평점을 위한 reviews 테이블
- 소셜 기능을 위한 trip_shares 테이블
