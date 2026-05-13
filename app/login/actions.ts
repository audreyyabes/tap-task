"use server"

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

function redirectToLogin(params: Record<string, string>) {
  const searchParams = new URLSearchParams(params)

  redirect(`/login?${searchParams.toString()}`)
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.log(error.message)
    redirectToLogin({ error: 'Could not authenticate user' })
  }

  redirect('/dashboard')
}

export async function register(formData: FormData) {
  const supabase = await createClient()

  const fullName = String(formData.get('fullName') ?? '').trim()
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    console.log(error.message)
    redirectToLogin({ error: 'Could not create account' })
  }

  if (data.session) {
    redirect('/dashboard')
  }

  redirectToLogin({ message: 'Account created. Check your email to continue.' })
}
