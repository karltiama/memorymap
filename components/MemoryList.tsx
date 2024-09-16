import React from 'react';
import { MemoryData } from '@/types/types';
import Memory from './Memory';

interface MemoryListProps {
  memories: MemoryData[];
}

const MemoryList: React.FC<MemoryListProps> = ({ memories }) => {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h2 className="text-3xl font-bold tracking-tight">Memories</h2>
            <p className="text-muted-foreground">Revisit your favorite moments captured in time.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory) => (
            <Memory key={memory.id} memory={memory} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemoryList;
