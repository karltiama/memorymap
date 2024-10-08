import { createClient } from '@/utils/supabase/server'
import MemoryList from '@/components/MemoryList'
import { MemoryData } from '@/types/types'

export default async function Dashboard() {
  const supabase = createClient()

  const { data: memories, error: memoriesError } = await supabase
    .from('memories')
    .select('*')
    .order('created_at', { ascending: false })

  if (memoriesError) {
    console.error('Error fetching memories:', memoriesError)
    return <p className="text-destructive">Error loading memories. Please try again later.</p>
  }

  return (
    <div className="p-6 space-y-6">
      {memories && memories.length > 0 ? (
        <MemoryList initialMemories={memories as MemoryData[]} />
      ) : (
        <p className="text-muted-foreground">You haven't created any memories yet.</p>
      )}
    </div>
  )
}