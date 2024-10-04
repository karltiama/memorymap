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
    <div className="flex flex-col md:flex-row h-full overflow-hidden">
      <div className="flex-grow flex flex-col md:flex-row">
        <div className="h-[50vh] md:h-auto md:flex-1 relative m-4"> {/* Added margin classes here */}
          <Suspense fallback={<Skeleton className="w-full h-full" />}>
            <InteractiveMap onLocationSelect={handleLocationSelect} />
          </Suspense>
        </div>
        <div className="flex-1 overflow-y-auto md:w-[24rem] md:min-w-[24rem] lg:w-[40rem] lg:min-w-[40rem]">
          <div className="p-4">
            <MemoryForm selectedLocation={selectedLocation} />
          </div>
        </div>
      </div>
    </div>
  )
}
