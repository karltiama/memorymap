import { createClient } from '@/utils/supabase/server'

export async function sendPasswordResetEmail(email: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
  })
  
  if (error) throw error
  return data
}

export async function verifyEmail(email: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })
  
  if (error) throw error
  return data
} 