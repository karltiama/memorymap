'use client'

import React from 'react'
import InteractiveMap from '@/components/InteractiveMap'
import { MemoryForm } from '@/components/MemoryForm'

export default function NewMemoryPage() {
  const handleLocationSelect = (lng: number, lat: number) => {
    // You can add any additional logic here if needed
    console.log(`Selected location: ${lng}, ${lat}`)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Memory</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-[80vh]"> {/* Adjust this height to match the map */}
          <InteractiveMap onLocationSelect={handleLocationSelect} />
        </div>
        <div>
          <MemoryForm />
        </div>
      </div>
    </div>
  )
}

