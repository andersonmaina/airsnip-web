import { createClient } from '@supabase/supabase-js'

// Use placeholder values to prevent crashes if env vars are missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder'

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
