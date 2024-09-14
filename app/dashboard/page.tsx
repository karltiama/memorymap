import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default async function Dashboard() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">User email: {data.user.email}</p>
      <Link href="/memories/new">
        <Button>Create New Memory</Button>
      </Link>
    </div>
  )
}