'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Map, { Marker } from 'react-map-gl'
import "mapbox-gl/dist/mapbox-gl.css";
import { Popup } from 'react-map-gl';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaTimes } from 'react-icons/fa'; // Import the X icon
import Link from 'next/link';




import MapContainer from './MapContainer';
import CitySearch from './CitySearch';
import { MarkerData } from '@/types/types';

interface InteractiveMapProps {
  onLocationSelect?: (lng: number, lat: number) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ onLocationSelect }) => {
  // Hard-coded markers
  const markers: MarkerData[] = [
    { id: 1, longitude: -71.0589, latitude: 42.3601, title: "Boston", summary: "Visit to Fenway Park", memoryId: "boston-001" },
    { id: 2, longitude: -74.0060, latitude: 40.7128, title: "New York", summary: "Broadway show and Central Park picnic", memoryId: "nyc-001" },
    { id: 3, longitude: -87.6298, latitude: 41.8781, title: "Chicago", summary: "Visit to the Art Institute", memoryId: "chicago-001" },
    { id: 4, longitude: -79.5555, latitude: 43.7178, title: "Etobicoke", summary: "Visit to the great Jomai Omandam", memoryId: "etobicoke-001" },
  ];

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

  return (
    <div>
      <CitySearch onCitySubmit={handleCitySubmit} />
      <MapContainer markers={markers} onLocationSelect={onLocationSelect} />
    </div>
  );
};

export default InteractiveMap;

