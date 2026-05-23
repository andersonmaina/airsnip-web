import { createClient } from '@supabase/supabase-js'

// Use placeholder values to prevent crashes if env vars are missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wxecumxnxjondbhpuosy.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4ZWN1bXhueGpvbmRiaHB1b3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwNjE1MzEsImV4cCI6MjA5MTYzNzUzMX0.APvsoN_2KHqqS-J-vmu5aRXK5qSvrpJGYFWC7Fjz3JI'


let supabaseInstance: any
try {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
} catch (e) {
  console.error('Supabase failed to initialize:', e)
  // Non-crashing fallback
  supabaseInstance = {
    from: () => ({
      insert: () => Promise.resolve({ error: new Error('Supabase not configured') })
    })
  }
}

export const supabase = supabaseInstance
