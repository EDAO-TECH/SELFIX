import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://iijkujefusfauclndpfq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlpamt1amVmdXNmYXVjbG5kcGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3ODEyNjUsImV4cCI6MjA2NTM1NzI2NX0.Mg4IFPRGZlsKTkC5VibbOTTdc7m9le8OjtM1aUxIKZU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);