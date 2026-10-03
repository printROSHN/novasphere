// Supabase client configuration
// Supports Vercel environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || "https://ajtiyxobodkrtdpcuqyu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqdGl5eG9ib2RrcnRkcGN1cXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5NTI1NTAsImV4cCI6MjA3MzUyODU1MH0.tb2zGybkDRZtkwByGB1AV3P7uyYMqIfY1f-TQ3UYsBY";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});