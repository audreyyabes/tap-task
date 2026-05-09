import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Welcome {user.email}</h1>
      <p>You are logged in 🎉</p>
    </div>
  )
}