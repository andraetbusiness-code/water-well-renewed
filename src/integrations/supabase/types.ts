export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      external_user_mappings: {
        Row: {
          created_at: string
          external_id: string
          id: string
          system: Database["public"]["Enums"]["integration_system"]
          user_id: string
        }
        Insert: {
          created_at?: string
          external_id: string
          id?: string
          system: Database["public"]["Enums"]["integration_system"]
          user_id: string
        }
        Update: {
          created_at?: string
          external_id?: string
          id?: string
          system?: Database["public"]["Enums"]["integration_system"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "external_user_mappings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          config: Json
          created_at: string
          id: string
          is_active: boolean
          last_error: string | null
          last_sync_at: string | null
          system: Database["public"]["Enums"]["integration_system"]
          updated_at: string
        }
        Insert: {
          config?: Json
          created_at?: string
          id?: string
          is_active?: boolean
          last_error?: string | null
          last_sync_at?: string | null
          system: Database["public"]["Enums"]["integration_system"]
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          id?: string
          is_active?: boolean
          last_error?: string | null
          last_sync_at?: string | null
          system?: Database["public"]["Enums"]["integration_system"]
          updated_at?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          customer_name: string | null
          external_id: string
          id: string
          job_type: string | null
          revenue: number | null
          scheduled_at: string | null
          status: string
          synced_at: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          customer_name?: string | null
          external_id: string
          id?: string
          job_type?: string | null
          revenue?: number | null
          scheduled_at?: string | null
          status?: string
          synced_at?: string
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          customer_name?: string | null
          external_id?: string
          id?: string
          job_type?: string | null
          revenue?: number | null
          scheduled_at?: string | null
          status?: string
          synced_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      kpi_snapshots: {
        Row: {
          created_at: string
          id: string
          metrics: Json
          snapshot_date: string
          source: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          metrics?: Json
          snapshot_date: string
          source: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          metrics?: Json
          snapshot_date?: string
          source?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "kpi_snapshots_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      leaderboard_cache: {
        Row: {
          badges: Json | null
          fetched_at: string
          id: string
          period: string
          rank: number | null
          score: number | null
          user_id: string
        }
        Insert: {
          badges?: Json | null
          fetched_at?: string
          id?: string
          period: string
          rank?: number | null
          score?: number | null
          user_id: string
        }
        Update: {
          badges?: Json | null
          fetched_at?: string
          id?: string
          period?: string
          rank?: number | null
          score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leaderboard_cache_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          assigned_to: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string
          deal_value: number | null
          external_id: string
          id: string
          lead_source: string | null
          pipeline_stage: string
          synced_at: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          deal_value?: number | null
          external_id: string
          id?: string
          lead_source?: string | null
          pipeline_stage?: string
          synced_at?: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          deal_value?: number | null
          external_id?: string
          id?: string
          lead_source?: string | null
          pipeline_stage?: string
          synced_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pending_syncs: {
        Row: {
          action: string
          created_at: string
          error_message: string | null
          id: string
          last_attempt: string | null
          payload: Json
          retry_count: number
          status: string
          system: Database["public"]["Enums"]["integration_system"]
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          error_message?: string | null
          id?: string
          last_attempt?: string | null
          payload?: Json
          retry_count?: number
          status?: string
          system: Database["public"]["Enums"]["integration_system"]
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          error_message?: string | null
          id?: string
          last_attempt?: string | null
          payload?: Json
          retry_count?: number
          status?: string
          system?: Database["public"]["Enums"]["integration_system"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pending_syncs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      presentations: {
        Row: {
          category: Database["public"]["Enums"]["presentation_category"]
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_public: boolean
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["presentation_category"]
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["presentation_category"]
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          status: Database["public"]["Enums"]["user_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      slides: {
        Row: {
          background_type: Database["public"]["Enums"]["slide_background_type"]
          background_value: string | null
          content: Json
          created_at: string
          id: string
          order_index: number
          presentation_id: string
          slide_type: Database["public"]["Enums"]["slide_type"]
          speaker_notes: string | null
          title: string | null
        }
        Insert: {
          background_type?: Database["public"]["Enums"]["slide_background_type"]
          background_value?: string | null
          content?: Json
          created_at?: string
          id?: string
          order_index: number
          presentation_id: string
          slide_type: Database["public"]["Enums"]["slide_type"]
          speaker_notes?: string | null
          title?: string | null
        }
        Update: {
          background_type?: Database["public"]["Enums"]["slide_background_type"]
          background_value?: string | null
          content?: Json
          created_at?: string
          id?: string
          order_index?: number
          presentation_id?: string
          slide_type?: Database["public"]["Enums"]["slide_type"]
          speaker_notes?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "slides_presentation_id_fkey"
            columns: ["presentation_id"]
            isOneToOne: false
            referencedRelation: "presentations"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          created_at: string | null
          id: string
          team_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          team_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          id: string
          manager_user_id: string | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          manager_user_id?: string | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          manager_user_id?: string | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_team_manager: {
        Args: { _manager_id: string; _member_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "manager" | "learner"
      integration_system: "housecall_pro" | "enzy" | "ghl"
      presentation_category: "training" | "marketing" | "internal"
      slide_background_type: "cream" | "teal" | "white" | "image"
      slide_type:
        | "title"
        | "purpose"
        | "sector-overview"
        | "sector-detail"
        | "leadership"
        | "quote"
      user_status: "active" | "invited" | "suspended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "manager", "learner"],
      integration_system: ["housecall_pro", "enzy", "ghl"],
      presentation_category: ["training", "marketing", "internal"],
      slide_background_type: ["cream", "teal", "white", "image"],
      slide_type: [
        "title",
        "purpose",
        "sector-overview",
        "sector-detail",
        "leadership",
        "quote",
      ],
      user_status: ["active", "invited", "suspended"],
    },
  },
} as const
