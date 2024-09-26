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
    <div className="space-y-6">
      {memoriesError && (
        <p className="text-destructive">Error loading memories. Please try again later.</p>
      )}
      {memories && memories.length > 0 ? (
        <MemoryList memories={memories} />
      ) : (
        <p className="text-muted-foreground">You haven't created any memories yet.</p>
      )}
    </div>
  )
}