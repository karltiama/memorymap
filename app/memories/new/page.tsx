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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Memory</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-[80vh]">
          <InteractiveMap onLocationSelect={handleLocationSelect} />
        </div>
        <div>
          <MemoryForm selectedLocation={selectedLocation} />
        </div>
      </div>
    </div>
  )
}

