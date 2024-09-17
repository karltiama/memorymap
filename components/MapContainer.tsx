import React, { useState, useCallback, useEffect } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { MemoryData } from '@/types/types';

interface MapContainerProps {
  memories: MemoryData[];
  onLocationSelect?: (lng: number, lat: number) => void;
  mapboxToken: string;
}

const MapContainer: React.FC<MapContainerProps> = ({ memories, onLocationSelect, mapboxToken }) => {
  const [viewState, setViewState] = useState({
    longitude: -98.5795,
    latitude: 39.8283,
    zoom: 3,
  });
  const [selectedLocation, setSelectedLocation] = useState<{longitude: number; latitude: number} | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<{ longitude: number; latitude: number } | null>(null);

  const handleClick = useCallback((event: any) => {
    const { lng, lat } = event.lngLat;
    setSelectedLocation({ longitude: lng, latitude: lat });
    if (onLocationSelect) {
      onLocationSelect(lng, lat);
    }
  }, [onLocationSelect]);

  const handleCitySearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;

    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxToken}`);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        setSearchResult({ longitude: lng, latitude: lat });
        setViewState({
          longitude: lng,
          latitude: lat,
          zoom: 10,
        });
      }
    } catch (error) {
      console.error('Error searching for city:', error);
    }
  };

  return (
    <div className="relative w-full h-[400px]">
      <div className="absolute top-2 left-2 z-10 bg-white p-2 rounded shadow-md">
        <form onSubmit={handleCitySearch} className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a city"
            className="px-2 py-1 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Search
          </button>
        </form>
      </div>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: '100%', height: '100%'}}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onClick={handleClick}
        mapboxAccessToken={mapboxToken}
      >
        <NavigationControl position="top-right" />
        {memories.map((memory) => (
          <Marker 
            key={memory.id}
            longitude={memory.longitude} 
            latitude={memory.latitude}
            color="red"
          />
        ))}
        {selectedLocation && (
          <Marker 
            longitude={selectedLocation.longitude} 
            latitude={selectedLocation.latitude}
            color="blue"
          />
        )}
        {searchResult && (
          <Marker 
            longitude={searchResult.longitude} 
            latitude={searchResult.latitude}
            color="green"
          />
        )}
      </Map>
    </div>
  );
};

export default MapContainer;
