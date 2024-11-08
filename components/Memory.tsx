import React from 'react';
import Link from 'next/link';
import { MemoryData } from '@/types/types';
import StaticMap from './StaticMap';
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Loader2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AddToCollectionPopover } from './AddToCollectionPopover';
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
  isDeleting?: boolean;
}

const Memory: React.FC<MemoryProps> = ({ memory, onDelete, isDeleting }) => {
  const { toast } = useToast();

  /*

  const handleDelete = async () => {
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
    }
  };
  
  */


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
        {/* Add to Collection */}
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            {/* Add to Collection Popover - takes the memory id as a prop */}
            <AddToCollectionPopover memoryId={memory.id}>
              <TooltipTrigger asChild>
                <button className="p-1 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Plus size={20} className="text-gray-600 dark:text-gray-300" />
                </button>
              </TooltipTrigger>
            </AddToCollectionPopover>
            <TooltipContent side="left" className="z-30">
              <p>Add to Collection</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Delete Memory */}
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button 
                  className="p-1 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" 
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 size={20} className="text-gray-600 dark:text-gray-300 animate-spin" />
                  ) : (
                    <Trash2 size={20} className="text-gray-600 dark:text-gray-300" />
                  )}
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white dark:bg-gray-800">
                <AlertDialogHeader>
                  <AlertDialogTitle className="dark:text-gray-100">Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription className="dark:text-gray-300">
                    This action cannot be undone. This will permanently delete your memory.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => onDelete(memory.id)} 
                    disabled={isDeleting}
                    className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                  >
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
