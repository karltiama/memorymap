'use client'

import React, { useState, useEffect } from 'react'
import "mapbox-gl/dist/mapbox-gl.css";
import MapContainer from './MapContainer';
import { MemoryData } from '@/types/types';

interface InteractiveMapProps {
  onLocationSelect?: (lng: number, lat: number) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ onLocationSelect }) => {
  const [memories, setMemories] = useState<MemoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await fetch('/api/memories');
        if (!response.ok) {
          throw new Error('Failed to fetch memories');
        }
        const data = await response.json();
        setMemories(data);
      } catch (err) {
        setError('Failed to load memories');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemories();
  }, []);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  if (!mapboxToken) return <div>Error: Mapbox access token is missing</div>;

  return (
    <div className="absolute inset-0">
      <MapContainer 
        memories={isLoading ? [] : memories} 
        onLocationSelect={onLocationSelect}
        mapboxToken={mapboxToken}
      />
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 bg-background dark:bg-background bg-opacity-80 p-4 text-center">
          Loading memories...
        </div>
      )}
      {error && <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-4 text-center">Error: {error}</div>}
    </div>
  );
};

export default InteractiveMap;

