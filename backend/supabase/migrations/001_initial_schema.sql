-- TripSync Initial Database Schema
-- Phase 1: MVP Tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. USER PROFILES
-- ============================================
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name VARCHAR(100),
    avatar_url TEXT,

    -- Travel preferences
    travel_style VARCHAR(50), -- 'business', 'leisure', 'family', 'adventure'
    preferred_budget VARCHAR(50), -- 'budget', 'mid-range', 'luxury'
    preferred_transport JSONB DEFAULT '[]'::jsonb, -- ['public', 'car', 'flight', 'train']

    -- Interests
    interests JSONB DEFAULT '[]'::jsonb, -- ['nature', 'culture', 'food', 'shopping', 'history']

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT unique_user_profile UNIQUE(user_id)
);

-- RLS for user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
    ON user_profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
    ON user_profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
    ON user_profiles FOR UPDATE
    USING (auth.uid() = user_id);

-- ============================================
-- 2. FAVORITE PLACES
-- ============================================
CREATE TABLE favorite_places (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    -- Place information
    name VARCHAR(200) NOT NULL,
    address TEXT,
    place_type VARCHAR(50) DEFAULT 'custom', -- 'home', 'work', 'custom'

    -- Location
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,

    -- Google Places ID (optional)
    google_place_id VARCHAR(255),

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_favorite_places_user_id ON favorite_places(user_id);
CREATE INDEX idx_favorite_places_location ON favorite_places(latitude, longitude);

-- RLS for favorite_places
ALTER TABLE favorite_places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorite places"
    ON favorite_places FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorite places"
    ON favorite_places FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own favorite places"
    ON favorite_places FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorite places"
    ON favorite_places FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- 3. TRIPS
-- ============================================
CREATE TABLE trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    -- Trip basic info
    title VARCHAR(200) NOT NULL,
    description TEXT,
    trip_type VARCHAR(50), -- 'day_trip', 'short_trip', 'long_trip'

    -- Date information
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,

    -- Budget
    budget_min DECIMAL(10, 2),
    budget_max DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'KRW',

    -- Status
    status VARCHAR(50) DEFAULT 'planning', -- 'planning', 'confirmed', 'in_progress', 'completed', 'cancelled'

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_trips_user_id ON trips(user_id);
CREATE INDEX idx_trips_start_date ON trips(start_date);
CREATE INDEX idx_trips_status ON trips(status);

-- RLS for trips
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own trips"
    ON trips FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own trips"
    ON trips FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trips"
    ON trips FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own trips"
    ON trips FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- 4. TRIP WAYPOINTS
-- ============================================
CREATE TABLE trip_waypoints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,

    -- Waypoint info
    name VARCHAR(200) NOT NULL,
    address TEXT,
    waypoint_type VARCHAR(50) NOT NULL, -- 'origin', 'destination', 'waypoint'
    sequence_order INT NOT NULL, -- Order in the trip

    -- Location
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,

    -- Time information
    arrival_time TIMESTAMP WITH TIME ZONE,
    departure_time TIMESTAMP WITH TIME ZONE,
    duration_minutes INT, -- Stay duration

    -- Google Places ID
    google_place_id VARCHAR(255),

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_trip_waypoints_trip_id ON trip_waypoints(trip_id);
CREATE INDEX idx_trip_waypoints_sequence ON trip_waypoints(trip_id, sequence_order);

-- RLS for trip_waypoints
ALTER TABLE trip_waypoints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own trip waypoints"
    ON trip_waypoints FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM trips
            WHERE trips.id = trip_waypoints.trip_id
            AND trips.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own trip waypoints"
    ON trip_waypoints FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM trips
            WHERE trips.id = trip_waypoints.trip_id
            AND trips.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own trip waypoints"
    ON trip_waypoints FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM trips
            WHERE trips.id = trip_waypoints.trip_id
            AND trips.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own trip waypoints"
    ON trip_waypoints FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM trips
            WHERE trips.id = trip_waypoints.trip_id
            AND trips.user_id = auth.uid()
        )
    );

-- ============================================
-- 5. TRIP ROUTES
-- ============================================
CREATE TABLE trip_routes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    from_waypoint_id UUID NOT NULL REFERENCES trip_waypoints(id) ON DELETE CASCADE,
    to_waypoint_id UUID NOT NULL REFERENCES trip_waypoints(id) ON DELETE CASCADE,

    -- Transport mode
    transport_mode VARCHAR(50) NOT NULL, -- 'driving', 'transit', 'walking', 'bicycling', 'flight', 'train'

    -- Route details
    distance_meters INT,
    duration_seconds INT,
    polyline TEXT, -- Google Maps encoded polyline

    -- Transit details (JSONB for flexibility)
    transit_details JSONB DEFAULT '{}'::jsonb,

    -- Cost
    estimated_cost DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'KRW',

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_trip_routes_trip_id ON trip_routes(trip_id);
CREATE INDEX idx_trip_routes_waypoints ON trip_routes(from_waypoint_id, to_waypoint_id);

-- RLS for trip_routes
ALTER TABLE trip_routes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own trip routes"
    ON trip_routes FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM trips
            WHERE trips.id = trip_routes.trip_id
            AND trips.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own trip routes"
    ON trip_routes FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM trips
            WHERE trips.id = trip_routes.trip_id
            AND trips.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own trip routes"
    ON trip_routes FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM trips
            WHERE trips.id = trip_routes.trip_id
            AND trips.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own trip routes"
    ON trip_routes FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM trips
            WHERE trips.id = trip_routes.trip_id
            AND trips.user_id = auth.uid()
        )
    );

-- ============================================
-- 6. SEARCH HISTORY
-- ============================================
CREATE TABLE search_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    -- Search information
    origin_name VARCHAR(200),
    origin_lat DECIMAL(10, 8),
    origin_lng DECIMAL(11, 8),

    destination_name VARCHAR(200),
    destination_lat DECIMAL(10, 8),
    destination_lng DECIMAL(11, 8),

    -- Search conditions
    transport_mode VARCHAR(50),
    search_date TIMESTAMP WITH TIME ZONE,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_search_history_user_id ON search_history(user_id);
CREATE INDEX idx_search_history_created_at ON search_history(created_at DESC);

-- RLS for search_history
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own search history"
    ON search_history FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own search history"
    ON search_history FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_favorite_places_updated_at
    BEFORE UPDATE ON favorite_places
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trips_updated_at
    BEFORE UPDATE ON trips
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trip_waypoints_updated_at
    BEFORE UPDATE ON trip_waypoints
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trip_routes_updated_at
    BEFORE UPDATE ON trip_routes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE user_profiles IS 'User profile and travel preferences';
COMMENT ON TABLE favorite_places IS 'User favorite places for quick access';
COMMENT ON TABLE trips IS 'User travel plans';
COMMENT ON TABLE trip_waypoints IS 'Waypoints in a trip (origin, destination, stops)';
COMMENT ON TABLE trip_routes IS 'Routes between waypoints with transport details';
COMMENT ON TABLE search_history IS 'User search history for AI recommendations';
