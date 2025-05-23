// lib/supabaseClient.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Validate environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create singleton instance
export const supabase = createSupabaseClient(supabaseUrl, supabaseKey)

// Export factory function for cases where new instance is needed
export const createClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseKey)
}
