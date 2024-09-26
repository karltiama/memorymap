'use client'

import React, { useState, Suspense, lazy } from 'react'
import { MemoryForm } from '@/components/MemoryForm'
import { Skeleton } from "@/components/ui/skeleton"

const InteractiveMap = lazy(() => import('@/components/InteractiveMap'))

export default function CreateMemoryPage() {
  const [selectedLocation, setSelectedLocation] = useState<{ longitude: number; latitude: number } | null>(null);

  const handleLocationSelect = (lng: number, lat: number) => {
    setSelectedLocation({ longitude: lng, latitude: lat });
  }

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-4rem)]">
      <div className="flex h-[calc(100%-2rem)] gap-4">
        <div className="w-[70%] h-full">
          <Suspense fallback={<Skeleton className="w-full h-full" />}>
            <InteractiveMap onLocationSelect={handleLocationSelect} />
          </Suspense>
        </div>
        <div className="w-[30%] h-full overflow-y-auto">
          <MemoryForm selectedLocation={selectedLocation} />
        </div>
      </div>
    </div>
  )
}
