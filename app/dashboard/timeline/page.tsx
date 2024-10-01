import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { MemoryData } from '@/types/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Plus } from 'lucide-react';
import Link from 'next/link';

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
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Memory Timeline</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </Button>
          <Link href="/dashboard/create">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Memory
            </Button>
          </Link>
        </div>
      </div>
      <div className="space-y-8">
        {memories && memories.length > 0 ? (
          memories.map((memory: MemoryData) => (
            <div key={memory.id} className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="w-px h-full bg-gray-300 pointer-events-none" />
                <div className="w-4 h-4 rounded-full bg-blue-600 border-4 border-white" />
              </div>
              <Card className="flex-grow">
                <CardHeader>
                  <CardTitle>{memory.title}</CardTitle>
                  <CardDescription>{new Date(memory.memory_date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{memory.description}</p>
                  {memory.image_urls && memory.image_urls.length > 0 && (
                    <div className="relative h-40 w-full overflow-hidden rounded-md">
                      <img
                        src={memory.image_urls[0]}
                        alt={memory.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <Link href={`/dashboard/memories/${memory.id}`}>
                    <Button className="mt-4">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          <p>No memories found. Start creating some!</p>
        )}
      </div>
    </div>
  );
}
