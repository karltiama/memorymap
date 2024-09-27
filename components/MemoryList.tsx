'use client'

import React, { useState } from 'react';
import { MemoryData } from '@/types/types';
import Memory from './Memory';
import { useToast } from "@/hooks/use-toast";

interface MemoryListProps {
  initialMemories: MemoryData[];
}

const MemoryList: React.FC<MemoryListProps> = ({ initialMemories }) => {
  const [memories, setMemories] = useState<MemoryData[]>(initialMemories);
  const { toast } = useToast();

  const handleDeleteMemory = async (id: string) => {
    try {
      const response = await fetch(`/api/memories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete memory');
      }

      // Update the local state to remove the deleted memory
      setMemories(prevMemories => prevMemories.filter(memory => memory.id !== id));

      toast({
        title: "Memory deleted",
        description: "The memory has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting memory:', error);
      toast({
        title: "Error",
        description: "Failed to delete the memory. Please try again.",
        variant: "destructive",
      });
      throw error; // Re-throw the error to be handled by the Memory component
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {memories.map((memory) => (
        <Memory key={memory.id} memory={memory} onDelete={handleDeleteMemory} />
      ))}
    </div>
  );
};

export default MemoryList;
