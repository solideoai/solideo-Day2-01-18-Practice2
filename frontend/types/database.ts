export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          user_id: string
          display_name: string | null
          avatar_url: string | null
          travel_style: string | null
          preferred_budget: string | null
          preferred_transport: Json
          interests: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          display_name?: string | null
          avatar_url?: string | null
          travel_style?: string | null
          preferred_budget?: string | null
          preferred_transport?: Json
          interests?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          display_name?: string | null
          avatar_url?: string | null
          travel_style?: string | null
          preferred_budget?: string | null
          preferred_transport?: Json
          interests?: Json
          created_at?: string
          updated_at?: string
        }
      }
      favorite_places: {
        Row: {
          id: string
          user_id: string
          name: string
          address: string | null
          place_type: string
          latitude: number
          longitude: number
          google_place_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          address?: string | null
          place_type?: string
          latitude: number
          longitude: number
          google_place_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          address?: string | null
          place_type?: string
          latitude?: number
          longitude?: number
          google_place_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      trips: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          trip_type: string | null
          start_date: string
          end_date: string
          budget_min: number | null
          budget_max: number | null
          currency: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          trip_type?: string | null
          start_date: string
          end_date: string
          budget_min?: number | null
          budget_max?: number | null
          currency?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          trip_type?: string | null
          start_date?: string
          end_date?: string
          budget_min?: number | null
          budget_max?: number | null
          currency?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      trip_waypoints: {
        Row: {
          id: string
          trip_id: string
          name: string
          address: string | null
          waypoint_type: string
          sequence_order: number
          latitude: number
          longitude: number
          arrival_time: string | null
          departure_time: string | null
          duration_minutes: number | null
          google_place_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          trip_id: string
          name: string
          address?: string | null
          waypoint_type: string
          sequence_order: number
          latitude: number
          longitude: number
          arrival_time?: string | null
          departure_time?: string | null
          duration_minutes?: number | null
          google_place_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          trip_id?: string
          name?: string
          address?: string | null
          waypoint_type?: string
          sequence_order?: number
          latitude?: number
          longitude?: number
          arrival_time?: string | null
          departure_time?: string | null
          duration_minutes?: number | null
          google_place_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      trip_routes: {
        Row: {
          id: string
          trip_id: string
          from_waypoint_id: string
          to_waypoint_id: string
          transport_mode: string
          distance_meters: number | null
          duration_seconds: number | null
          polyline: string | null
          transit_details: Json
          estimated_cost: number | null
          currency: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          trip_id: string
          from_waypoint_id: string
          to_waypoint_id: string
          transport_mode: string
          distance_meters?: number | null
          duration_seconds?: number | null
          polyline?: string | null
          transit_details?: Json
          estimated_cost?: number | null
          currency?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          trip_id?: string
          from_waypoint_id?: string
          to_waypoint_id?: string
          transport_mode?: string
          distance_meters?: number | null
          duration_seconds?: number | null
          polyline?: string | null
          transit_details?: Json
          estimated_cost?: number | null
          currency?: string
          created_at?: string
          updated_at?: string
        }
      }
      search_history: {
        Row: {
          id: string
          user_id: string
          origin_name: string | null
          origin_lat: number | null
          origin_lng: number | null
          destination_name: string | null
          destination_lat: number | null
          destination_lng: number | null
          transport_mode: string | null
          search_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          origin_name?: string | null
          origin_lat?: number | null
          origin_lng?: number | null
          destination_name?: string | null
          destination_lat?: number | null
          destination_lng?: number | null
          transport_mode?: string | null
          search_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          origin_name?: string | null
          origin_lat?: number | null
          origin_lng?: number | null
          destination_name?: string | null
          destination_lat?: number | null
          destination_lng?: number | null
          transport_mode?: string | null
          search_date?: string | null
          created_at?: string
        }
      }
    }
  }
}

// Utility types
export type UserProfile = Database['public']['Tables']['user_profiles']['Row']
export type FavoritePlace = Database['public']['Tables']['favorite_places']['Row']
export type Trip = Database['public']['Tables']['trips']['Row']
export type TripWaypoint = Database['public']['Tables']['trip_waypoints']['Row']
export type TripRoute = Database['public']['Tables']['trip_routes']['Row']
export type SearchHistory = Database['public']['Tables']['search_history']['Row']

// Enums
export enum TravelStyle {
  BUSINESS = 'business',
  LEISURE = 'leisure',
  FAMILY = 'family',
  ADVENTURE = 'adventure',
}

export enum PreferredBudget {
  BUDGET = 'budget',
  MID_RANGE = 'mid-range',
  LUXURY = 'luxury',
}

export enum TripType {
  DAY_TRIP = 'day_trip',
  SHORT_TRIP = 'short_trip',
  LONG_TRIP = 'long_trip',
}

export enum TripStatus {
  PLANNING = 'planning',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum WaypointType {
  ORIGIN = 'origin',
  DESTINATION = 'destination',
  WAYPOINT = 'waypoint',
}

export enum TransportMode {
  DRIVING = 'driving',
  TRANSIT = 'transit',
  WALKING = 'walking',
  BICYCLING = 'bicycling',
  FLIGHT = 'flight',
  TRAIN = 'train',
}

export enum PlaceType {
  HOME = 'home',
  WORK = 'work',
  CUSTOM = 'custom',
}
