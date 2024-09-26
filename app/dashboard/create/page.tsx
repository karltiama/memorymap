'use client'

import React, { useState } from 'react'
import InteractiveMap from '@/components/InteractiveMap'
import { MemoryForm } from '@/components/MemoryForm'

export default function CreateMemoryPage() {
  const [selectedLocation, setSelectedLocation] = useState<{ longitude: number; latitude: number } | null>(null);

  const handleLocationSelect = (lng: number, lat: number) => {
    setSelectedLocation({ longitude: lng, latitude: lat });
  }

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-4rem)]">
      <div className="flex h-[calc(100%-2rem)] gap-4">
        <div className="w-[70%] h-full">
          <InteractiveMap onLocationSelect={handleLocationSelect} />
        </div>
        <div className="w-[30%] h-full overflow-y-auto">
          <MemoryForm selectedLocation={selectedLocation} />
        </div>
      </div>
    </div>
  )
}
