export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          category: string | null;
          status: string | null;
          website_url: string | null;
          primary_cta: string | null;
          offer_summary: string | null;
          target_market_summary: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          category?: string | null;
          status?: string | null;
          website_url?: string | null;
          primary_cta?: string | null;
          offer_summary?: string | null;
          target_market_summary?: string | null;
          created_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
        Relationships: [];
      };
      audiences: {
        Row: {
          id: string;
          product_id: string;
          name: string;
          description: string | null;
          pains_json: Json | null;
          desires_json: Json | null;
          channels_json: Json | null;
          titles_json: Json | null;
          keywords_json: Json | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          name: string;
          description?: string | null;
          pains_json?: Json | null;
          desires_json?: Json | null;
          channels_json?: Json | null;
          titles_json?: Json | null;
          keywords_json?: Json | null;
        };
        Update: Partial<Database["public"]["Tables"]["audiences"]["Insert"]>;
        Relationships: [];
      };
      offers: {
        Row: {
          id: string;
          product_id: string;
          name: string;
          offer_type: string | null;
          description: string | null;
          cta_url: string | null;
          funnel_stage: string | null;
          active: boolean | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          name: string;
          offer_type?: string | null;
          description?: string | null;
          cta_url?: string | null;
          funnel_stage?: string | null;
          active?: boolean | null;
        };
        Update: Partial<Database["public"]["Tables"]["offers"]["Insert"]>;
        Relationships: [];
      };
      organizations: {
        Row: {
          id: string;
          product_id: string;
          org_type: string | null;
          name: string;
          domain: string | null;
          website_url: string | null;
          social_url: string | null;
          company_size_estimate: string | null;
          location: string | null;
          notes: string | null;
          source: string | null;
          fit_score: number | null;
          status: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          org_type?: string | null;
          name: string;
          domain?: string | null;
          website_url?: string | null;
          social_url?: string | null;
          company_size_estimate?: string | null;
          location?: string | null;
          notes?: string | null;
          source?: string | null;
          fit_score?: number | null;
          status?: string | null;
          created_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["organizations"]["Insert"]>;
        Relationships: [];
      };
      contacts: {
        Row: {
          id: string;
          product_id: string;
          organization_id: string | null;
          full_name: string | null;
          title: string | null;
          email: string | null;
          linkedin_url: string | null;
          role_type: string | null;
          source: string | null;
          confidence_score: number | null;
          status: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          organization_id?: string | null;
          full_name?: string | null;
          title?: string | null;
          email?: string | null;
          linkedin_url?: string | null;
          role_type?: string | null;
          source?: string | null;
          confidence_score?: number | null;
          status?: string | null;
          created_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["contacts"]["Insert"]>;
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          product_id: string;
          organization_id: string | null;
          contact_id: string | null;
          lead_type: string | null;
          source_channel: string | null;
          lifecycle_stage: string | null;
          fit_score: number | null;
          intent_score: number | null;
          owner: string | null;
          tags_json: Json | null;
          next_action: string | null;
          next_action_at: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          organization_id?: string | null;
          contact_id?: string | null;
          lead_type?: string | null;
          source_channel?: string | null;
          lifecycle_stage?: string | null;
          fit_score?: number | null;
          intent_score?: number | null;
          owner?: string | null;
          tags_json?: Json | null;
          next_action?: string | null;
          next_action_at?: string | null;
          created_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
        Relationships: [];
      };
      campaigns: {
        Row: {
          id: string;
          product_id: string;
          name: string;
          campaign_type: string | null;
          objective: string | null;
          channel: string | null;
          audience_id: string | null;
          offer_id: string | null;
          status: string | null;
          created_at: string | null;
          conversion_rate: number | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          name: string;
          campaign_type?: string | null;
          objective?: string | null;
          channel?: string | null;
          audience_id?: string | null;
          offer_id?: string | null;
          status?: string | null;
          created_at?: string | null;
          conversion_rate?: number | null;
        };
        Update: Partial<Database["public"]["Tables"]["campaigns"]["Insert"]>;
        Relationships: [];
      };
      playbooks: {
        Row: {
          id: string;
          product_id: string;
          name: string;
          playbook_type: string | null;
          trigger_rules_json: Json | null;
          scoring_rules_json: Json | null;
          messaging_rules_json: Json | null;
          approval_rules_json: Json | null;
          active: boolean | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          name: string;
          playbook_type?: string | null;
          trigger_rules_json?: Json | null;
          scoring_rules_json?: Json | null;
          messaging_rules_json?: Json | null;
          approval_rules_json?: Json | null;
          active?: boolean | null;
        };
        Update: Partial<Database["public"]["Tables"]["playbooks"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
