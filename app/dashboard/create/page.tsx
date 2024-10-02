'use client'

import React, { useState, Suspense, lazy } from 'react'
import { MemoryForm } from '@/components/MemoryForm'
import { Skeleton } from "@/components/ui/skeleton"

const InteractiveMap = lazy(() => import('@/components/InteractiveMap'))

export default function CreateMemoryPage() {
  const [selectedLocation, setSelectedLocation] = useState<{ longitude: number; latitude: number } | null>(null);
  const sidebarExpanded = false; // Set this based on your application logic

  const handleLocationSelect = (lng: number, lat: number) => {
    setSelectedLocation({ longitude: lng, latitude: lat });
  }

  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex-grow flex">
        <div className="flex-1 relative ml-4">
          <Suspense fallback={<Skeleton className="w-full h-full" />}>
            <InteractiveMap onLocationSelect={handleLocationSelect} />
          </Suspense>
        </div>
        <div className={`overflow-y-auto transition-all duration-300 ease-in-out ${sidebarExpanded ? 'w-96 min-w-[24rem]' : 'w-[calc(24rem+16rem)] min-w-[40rem]'}`}>
          <div className="p-4">
            <MemoryForm selectedLocation={selectedLocation} />
          </div>
        </div>
      </div>
    </div>
  )
}
