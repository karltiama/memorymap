import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Memory {
  id: string
  title: string
  description: string
  created_at: string
}

interface Collection {
  id: string
  name: string
  created_at: string
}

interface CollectionDetailProps {
  collection: Collection
  memories: Memory[]
}

export default function CollectionDetail({ collection, memories }: CollectionDetailProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{collection.name}</h1>
      <p className="text-muted-foreground mb-4">
        Created on: {new Date(collection.created_at).toLocaleDateString()}
      </p>
      <h2 className="text-xl font-semibold mb-4">Memories in this Collection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {memories.length > 0 ? (
          memories.map((memory) => (
            <Card key={memory.id}>
              <CardHeader>
                <CardTitle>{memory.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {memory.description.substring(0, 100)}...
                </p>
                <Link href={`/memories/${memory.id}`} passHref>
                  <Button>View Memory</Button>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">
            This collection doesn't have any memories yet.
          </p>
        )}
      </div>
    </div>
  )
}
