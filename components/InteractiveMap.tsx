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

  if (isLoading) return <div>Loading memories...</div>;
  if (error) return <div>Error: {error}</div>;

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  if (!mapboxToken) return <div>Error: Mapbox access token is missing</div>;

  return (
    <MapContainer 
      memories={memories} 
      onLocationSelect={onLocationSelect}
      mapboxToken={mapboxToken}
    />
  );
};

export default InteractiveMap;

