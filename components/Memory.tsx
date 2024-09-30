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
import { AddToCollectionPopover } from './AddToCollectionPopover';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface MemoryProps {
  memory: MemoryData;
  onDelete: (id: string) => Promise<void>;
}

const Memory: React.FC<MemoryProps> = ({ memory, onDelete }) => {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(memory.id);
      toast({
        title: "Memory deleted",
        description: "The memory has been successfully deleted.",
        className: "bg-white dark:bg-background",
      });
    } catch (error) {
      console.error('Error deleting memory:', error);
      toast({
        title: "Error",
        description: "Failed to delete the memory. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Function to handle different tag formats
  const getTags = (tags: string | string[] | null): string[] => {
    if (!tags) return [];
    if (typeof tags === 'string') return tags.split(',').map(tag => tag.trim());
    return tags;
  };

  const tags = getTags(memory.tags);

  return (
    <div className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] h-[400px] flex flex-col">
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
            <AddToCollectionPopover memoryId={memory.id}>
              <TooltipTrigger asChild>
                <button className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                  <Plus size={20} className="text-gray-600" />
                </button>
              </TooltipTrigger>
            </AddToCollectionPopover>
            <TooltipContent side="left" className="z-30">
              <p>Add to Collection</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <AlertDialog>
              <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                  <button className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors" disabled={isDeleting}>
                    <Trash2 size={20} className="text-gray-600" />
                  </button>
                </AlertDialogTrigger>
              </TooltipTrigger>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your memory.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-500 hover:bg-red-600">
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <TooltipContent side="left" className="z-30">
              <p>Delete Memory</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="relative h-[300px] w-full flex-shrink-0">
        <StaticMap
          latitude={memory.latitude}
          longitude={memory.longitude}
          zoom={14}
        />
      </div>
      <div className="p-4 bg-card text-card-foreground flex flex-col justify-between flex-grow">
        <h3 className="text-xl font-semibold truncate">{memory.title}</h3>
        <Link 
          href={`/dashboard/memories/${memory.id}`} 
          className="mt-2 inline-block text-blue-500 hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Memory;
