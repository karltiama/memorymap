'use client'

import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Collection {
  id: string;
  name: string;
}

interface AddToCollectionPopoverProps {
  memoryId: string;
  children: React.ReactNode;
}

export function AddToCollectionPopover({ memoryId, children }: AddToCollectionPopoverProps) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('Error getting user:', userError);
      toast({
        title: "Error",
        description: "Failed to fetch collections. Please try again.",
        variant: "destructive",
      });
      return;
    }

    const { data, error } = await supabase
      .from('collections')
      .select('id, name')
      .eq('user_id', user?.id);
    
    if (error) {
      console.error('Error fetching collections:', error);
      toast({
        title: "Error",
        description: "Failed to fetch collections. Please try again.",
        variant: "destructive",
      });
    } else {
      setCollections(data || []);
      console.log('Collections fetched:', data);
    }
  }

  async function addToCollection(collectionId: string) {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('collection_memories')
      .insert({ collection_id: collectionId, memory_id: memoryId })
      .select();
    
    if (error) {
      console.error('Error adding to collection:', error);
      toast({
        title: "Error",
        description: "Failed to add memory to collection. Please try again.",
        variant: "destructive",
      });
    } else {
      console.log('Memory added to collection:', data);
      toast({
        title: "Success",
        description: "Memory added to collection.",
      });
    }
    setIsLoading(false);
  }

  async function createNewCollection() {
    if (!newCollectionName.trim()) return;
    
    const confirmCreate = window.confirm(`Are you sure you want to create a new collection named "${newCollectionName}"?`);
    if (!confirmCreate) return;

    setIsLoading(true);
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('Error getting user:', userError);
      toast({
        title: "Error",
        description: "Failed to create new collection. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('collections')
      .insert({ name: newCollectionName, user_id: user?.id })
      .select();
    
    if (error) {
      console.error('Error creating new collection:', error);
      toast({
        title: "Error",
        description: "Failed to create new collection. Please try again.",
        variant: "destructive",
      });
    } else if (data) {
      console.log('New collection created:', data[0]);
      await fetchCollections(); // Refetch collections after creating a new one
      addToCollection(data[0].id);
      toast({
        title: "Success",
        description: `New collection "${newCollectionName}" created and memory added.`,
      });
    }
    setNewCollectionName('');
    setIsLoading(false);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h3 className="font-medium">Add to Collection</h3>
          <div className="space-y-2">
            {collections.map((collection) => (
              <Button
                key={collection.id}
                variant="outline"
                className="w-full justify-start"
                onClick={() => addToCollection(collection.id)}
                disabled={isLoading}
              >
                {collection.name}
              </Button>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input
              placeholder="New collection name"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
            />
            <Button onClick={createNewCollection} disabled={isLoading}>
              <Plus size={16} />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
