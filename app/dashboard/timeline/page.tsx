import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { MemoryData } from '@/types/types';

export default async function TimelinePage() {
  const supabase = createClient();

  const { data: memories, error } = await supabase
    .from('memories')
    .select('*')
    .order('memory_date', { ascending: false });

  if (error) {
    console.error('Error fetching memories:', error);
    return <div>Error loading timeline. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Memory Timeline</h1>
      <div className="space-y-8">
        {memories && memories.length > 0 ? (
          memories.map((memory: MemoryData) => (
            <div key={memory.id} className="bg-background dark:bg-background p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">{memory.title}</h2>
              <p className="text-gray-600 mb-2">{new Date(memory.memory_date).toLocaleDateString()}</p>
              <p className="text-gray-800">{memory.description}</p>
            </div>
          ))
        ) : (
          <p>No memories found. Start creating some!</p>
        )}
      </div>
    </div>
  );
}
