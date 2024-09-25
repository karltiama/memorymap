import React from 'react';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Collection {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
}

export default async function CollectionsPage() {
  const supabase = createClient();

  // Fetch the current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error('Error fetching user:', userError);
    return <div>Error loading user information. Please try again later.</div>;
  }

  // Fetch collections for the current user
  const { data: collections, error: collectionsError } = await supabase
    .from('collections')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false });

  if (collectionsError) {
    console.error('Error fetching collections:', collectionsError);
    return <div>Error loading collections. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Collections</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections && collections.length > 0 ? (
          collections.map((collection: Collection) => (
            <Card key={collection.id}>
              <CardHeader>
                <CardTitle>{collection.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Created on: {new Date(collection.created_at).toLocaleDateString()}
                </p>
                <Link href={`/dashboard/collections/${collection.id}`} passHref>
                  <Button>View Collection</Button>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">
            You haven't created any collections yet.
          </p>
        )}
      </div>
    </div>
  );
}
