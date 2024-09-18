import React from 'react';
import Link from 'next/link';
import { MemoryData } from '@/types/types';
import StaticMap from './StaticMap';
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MemoryProps {
  memory: MemoryData;
}

const Memory: React.FC<MemoryProps> = ({ memory }) => {
  // Function to handle different tag formats
  const getTags = (tags: string | string[] | null): string[] => {
    if (!tags) return [];
    if (typeof tags === 'string') return tags.split(',').map(tag => tag.trim());
    return tags;
  };

  const tags = getTags(memory.tags);

  return (
    <div className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02]">
      {/* Tags */}
      <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant={index % 2 === 0 ? "default" : "secondary"}>
            {tag}
          </Badge>
        ))}
      </div>

      {/* Action Icons with Tooltips */}
      <div className="absolute top-2 right-2 z-20 flex gap-2">
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <button className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                <Plus size={20} className="text-gray-600" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" className="z-30">
              <p>Add to Collection</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <button className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                <Trash2 size={20} className="text-gray-600" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" className="z-30">
              <p>Delete Memory</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="relative h-[300px] w-full">
        <StaticMap
          latitude={memory.latitude}
          longitude={memory.longitude}
          zoom={14}
        />
      </div>
      <div className="p-4 bg-card text-card-foreground">
        <h3 className="text-xl font-semibold">{memory.title}</h3>
        <p className="text-sm text-muted-foreground mt-2">
          {memory.description.length > 150 
            ? `${memory.description.substring(0, 150)}...` 
            : memory.description}
        </p>
        <Link 
          href={`/memories/${memory.id}`} 
          className="mt-4 inline-block text-blue-500 hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Memory;
