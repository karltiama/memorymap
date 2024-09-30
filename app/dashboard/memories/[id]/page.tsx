import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import MemoryDetail from '@/components/MemoryDetail'

export default async function MemoryPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: memory, error } = await supabase
    .from('memories')
    .select('*, image_urls')
    .eq('id', params.id)
    .single()

  if (error || !memory) {
    notFound()
  }

  return <MemoryDetail memory={memory} />
}
