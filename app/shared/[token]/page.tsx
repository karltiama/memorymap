import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import MemoryDetail from '@/components/MemoryDetail';

export default async function SharedMemoryPage({ params }: { params: { token: string } }) {
  const supabase = createClient();

  const { data: shareData, error: shareError } = await supabase
    .from('memory_shares')
    .select('memory_id')
    .eq('share_token', params.token)
    .single();

  if (shareError || !shareData) {
    notFound();
  }

  const { data: memory, error: memoryError } = await supabase
    .from('memories')
    .select('*')
    .eq('id', shareData.memory_id)
    .single();

  if (memoryError || !memory) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shared Memory</h1>
      <MemoryDetail memory={memory} isSharedView={true} />
    </div>
  );
}
