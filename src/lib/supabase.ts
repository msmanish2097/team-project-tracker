import { createClient } from '@supabase/supabase-js';

const supabaseUrl = typeof import.meta !== 'undefined' ? (import.meta.env?.VITE_SUPABASE_URL || '') : '';
const supabaseAnonKey = typeof import.meta !== 'undefined' ? (import.meta.env?.VITE_SUPABASE_ANON_KEY || '') : '';

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : createClient('https://placeholder.supabase.co', 'placeholder-key');

export interface Database {
  public: {
    Tables: {
      team_members: {
        Row: {
          id: string;
          name: string;
          email: string;
          avatar: string;
          role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          avatar: string;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          avatar?: string;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          name: string;
          description: string;
          status: 'planning' | 'active' | 'completed' | 'on-hold';
          deadline: string;
          progress: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          status: 'planning' | 'active' | 'completed' | 'on-hold';
          deadline: string;
          progress?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          status?: 'planning' | 'active' | 'completed' | 'on-hold';
          deadline?: string;
          progress?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      leave_requests: {
        Row: {
          id: string;
          employee_id: string;
          leave_type: 'vacation' | 'sick' | 'personal' | 'unpaid';
          start_date: string;
          end_date: string;
          reason: string;
          status: 'pending' | 'approved' | 'rejected';
          days: number;
          applied_date: string;
          approved_by: string | null;
          approved_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          employee_id: string;
          leave_type: 'vacation' | 'sick' | 'personal' | 'unpaid';
          start_date: string;
          end_date: string;
          reason: string;
          status?: 'pending' | 'approved' | 'rejected';
          days: number;
          applied_date?: string;
          approved_by?: string | null;
          approved_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          employee_id?: string;
          leave_type?: 'vacation' | 'sick' | 'personal' | 'unpaid';
          start_date?: string;
          end_date?: string;
          reason?: string;
          status?: 'pending' | 'approved' | 'rejected';
          days?: number;
          applied_date?: string;
          approved_by?: string | null;
          approved_date?: string | null;
          created_at?: string;
        };
      };
    };
  };
}
