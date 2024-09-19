'use client'

import React, { useState } from 'react'
import InteractiveMap from '@/components/InteractiveMap'
import { MemoryForm } from '@/components/MemoryForm'

export default function NewMemoryPage() {
  const [selectedLocation, setSelectedLocation] = useState<{ longitude: number; latitude: number } | null>(null);

  const handleLocationSelect = (lng: number, lat: number) => {
    setSelectedLocation({ longitude: lng, latitude: lat });
  }

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-bold mb-4">Create a New Memory</h1>
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

