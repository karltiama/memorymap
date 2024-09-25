import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import CollectionDetail from '@/components/CollectionDetail'

export default async function CollectionPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  
  // Fetch the collection
  const { data: collection, error: collectionError } = await supabase
    .from('collections')
    .select('*')
    .eq('id', params.id)
    .single()

  if (collectionError || !collection) {
    notFound()
  }

  // Fetch memories associated with this collection
  const { data: memories, error: memoriesError } = await supabase
    .from('collection_memories')
    .select('memories(*)')
    .eq('collection_id', params.id)

  if (memoriesError) {
    console.error('Error fetching memories for collection:', memoriesError)
  }

  return <CollectionDetail 
    collection={collection} 
    memories={memories?.flatMap(m => m.memories) || []} 
  />
}
