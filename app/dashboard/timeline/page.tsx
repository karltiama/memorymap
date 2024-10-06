'use client'

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { MemoryData } from '@/types/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Plus } from 'lucide-react';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function TimelinePage() {
  const [memories, setMemories] = useState<MemoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const supabase = createClient();

  React.useEffect(() => {
    fetchMemories();
  }, [sortOrder]);

  const fetchMemories = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('memories')
      .select('*')
      .order('memory_date', { ascending: sortOrder === 'asc' });

    if (error) {
      console.error('Error fetching memories:', error);
    } else {
      setMemories(data as MemoryData[]);
    }
    setIsLoading(false);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Memory Timeline</h2>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortOrder('desc')}>
                Newest First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder('asc')}>
                Oldest First
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
