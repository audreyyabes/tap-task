'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

function redirectToRegistration(params: Record<string, string>) {
  const searchParams = new URLSearchParams(params)

  redirect(`/registration?${searchParams.toString()}`)
}

function redirectToLogin(params: Record<string, string>) {
  const searchParams = new URLSearchParams(params)

  redirect(`/login?${searchParams.toString()}`)
}

export async function register(formData: FormData) {
  const fullName = String(formData.get('fullName') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  const confirmPassword = String(formData.get('confirmPassword') ?? '')

  if (!fullName || !email || !password || !confirmPassword) {
    redirectToRegistration({ error: 'Please fill in every field.' })
  }

  if (password.length < 8) {
    redirectToRegistration({
      error: 'Password must be at least 8 characters long.',
    })
  }

  if (password !== confirmPassword) {
    redirectToRegistration({ error: 'Passwords do not match.' })
  }

  const supabase = await createClient()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      ...(siteUrl ? { emailRedirectTo: `${siteUrl}/dashboard` } : {}),
    },
  })

  if (error) {
    console.error(error.message)
    redirectToRegistration({ error: 'Could not create account.' })
  }

  if (data.session) {
    redirect('/dashboard')
  }

  redirectToLogin({
    message: 'Account created. Check your email to confirm your account.',
  })
}
