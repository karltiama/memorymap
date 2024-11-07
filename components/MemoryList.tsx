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
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  // Delete memory from dashboard
  const handleDeleteMemory = async (id: string) => {
    try {
      // Set loading state for specific memory
      setIsDeleting(id);
      
      // API call
      const response = await fetch(`/api/memories/${id}`, {
        method: 'DELETE',
      });

      // Error handling
      if (!response.ok) {
        throw new Error('Failed to delete memory');
      }

      // Optimistic Update
      setMemories(prevMemories => prevMemories.filter(memory => memory.id !== id));

      // User Feedback
      toast({
        title: "Memory deleted",
        description: "The memory has been successfully deleted.",
      });
    } catch (error) {
      // Error Feedback
      console.error('Error deleting memory:', error);
      toast({
        title: "Error",
        description: "Failed to delete the memory. Please try again.",
        variant: "destructive",
      });
      throw error; // Re-throw the error to be handled by the Memory component
    } finally {
      // Reset loading state regardless of outcome
      setIsDeleting(null);
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {memories.map((memory) => (
        <Memory 
          key={memory.id} 
          memory={memory} 
          onDelete={handleDeleteMemory}
          isDeleting={isDeleting === memory.id} // Pass loading state to Memory component
        />
      ))}
    </div>
  );
};

export default MemoryList;
