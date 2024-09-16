import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import MemoryList from '@/components/MemoryList'
import { MemoryData } from '@/types/types'

export default async function Dashboard() {
  const supabase = createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    redirect('/login')
  }

  const { data: memories, error: memoriesError } = await supabase
    .from('memories')
    .select('*')
    .order('created_at', { ascending: false })

  if (memoriesError) {
    console.error('Error fetching memories:', memoriesError)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">User email: {user.email}</p>
      <Link href="/memories/new">
        <Button className="mb-6">Create New Memory</Button>
      </Link>
      
      {memoriesError && <p className="text-red-500">Error loading memories. Please try again later.</p>}
      {memories && memories.length > 0 ? (
        <MemoryList memories={memories as MemoryData[]} />
      ) : (
        <p>You haven't created any memories yet.</p>
      )}
    </div>
  )
}