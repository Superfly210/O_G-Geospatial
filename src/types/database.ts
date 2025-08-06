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
      wells: {
        Row: {
          id: string
          name: string
          status: 'active' | 'inactive' | 'planned'
          type: 'Oil Well' | 'Gas Well' | 'Injection Well'
          depth: string
          production: string
          operator: string
          drill_date: string | null
          api_number: string | null
          location: unknown // PostGIS geography type
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          status?: 'active' | 'inactive' | 'planned'
          type: 'Oil Well' | 'Gas Well' | 'Injection Well'
          depth?: string
          production?: string
          operator: string
          drill_date?: string | null
          api_number?: string | null
          location: unknown
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          status?: 'active' | 'inactive' | 'planned'
          type?: 'Oil Well' | 'Gas Well' | 'Injection Well'
          depth?: string
          production?: string
          operator?: string
          drill_date?: string | null
          api_number?: string | null
          location?: unknown
          created_at?: string
          updated_at?: string
        }
      }
      pipelines: {
        Row: {
          id: string
          name: string
          type: 'oil' | 'gas' | 'water'
          diameter: string
          length: string
          operator: string
          capacity: string
          install_date: string | null
          material: string | null
          route: unknown // PostGIS geography type
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type?: 'oil' | 'gas' | 'water'
          diameter?: string
          length?: string
          operator: string
          capacity?: string
          install_date?: string | null
          material?: string | null
          route: unknown
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'oil' | 'gas' | 'water'
          diameter?: string
          length?: string
          operator?: string
          capacity?: string
          install_date?: string | null
          material?: string | null
          route?: unknown
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}