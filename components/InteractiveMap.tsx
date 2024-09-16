'use client'

import React, { useState, useEffect } from 'react'
import "mapbox-gl/dist/mapbox-gl.css";


import MapContainer from './MapContainer';
import CitySearch from './CitySearch';
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

  const handleCitySubmit = async (city: string) => {
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`)
      const data = await response.json()
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center
        if (onLocationSelect) {
          onLocationSelect(lng, lat)
        }
      }
    } catch (error) {
      console.error('Error fetching city coordinates:', error)
    }
  };

  if (isLoading) return <div>Loading memories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <MapContainer memories={memories} onLocationSelect={onLocationSelect} />
    </div>
  );
};

export default InteractiveMap;

