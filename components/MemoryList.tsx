import React from 'react';
import { MemoryData } from '@/types/types';
import Memory from './Memory';

interface MemoryListProps {
  memories: MemoryData[];
}

const MemoryList: React.FC<MemoryListProps> = ({ memories }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {memories.map((memory) => (
        <Memory key={memory.id} memory={memory} />
      ))}
    </div>
  );
};

export default MemoryList;
