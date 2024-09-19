import React, { useState, useCallback, useEffect } from 'react';
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { MemoryData } from '@/types/types';
import MemoryPopup from './MemoryPopup';

interface MapContainerProps {
  memories: MemoryData[];
  onLocationSelect?: (lng: number, lat: number) => void;
  mapboxToken: string;
}

const MapContainer: React.FC<MapContainerProps> = ({ memories, onLocationSelect, mapboxToken }) => {
  const [viewState, setViewState] = useState({
    longitude: -83.5795,
    latitude: 43.8283,
    zoom: 5,
  });
  const [selectedMemory, setSelectedMemory] = useState<MemoryData | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{longitude: number; latitude: number} | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<{ longitude: number; latitude: number } | null>(null);

  const MIN_ZOOM_FOR_NEW_MEMORY = 10;
  const NEARBY_THRESHOLD = 0.01;
  const FREE_PLACEMENT_ZOOM = 16;

  const handleClick = useCallback((event: any) => {
    const { lng, lat } = event.lngLat;
    
    if (viewState.zoom >= FREE_PLACEMENT_ZOOM) {
      // Allow free placement at high zoom levels
      setSelectedLocation({ longitude: lng, latitude: lat });
      if (onLocationSelect) {
        onLocationSelect(lng, lat);
      }
      return;
    }

    if (viewState.zoom < MIN_ZOOM_FOR_NEW_MEMORY) {
      console.log("Zoom in to add a new memory");
      return;
    }

    // Check for nearby memories only if not in free placement mode
    const nearbyMemory = memories.find(memory => 
      Math.abs(memory.longitude - lng) < NEARBY_THRESHOLD &&
      Math.abs(memory.latitude - lat) < NEARBY_THRESHOLD
    );

    if (nearbyMemory) {
      setSelectedMemory(nearbyMemory);
    } else {
      setSelectedLocation({ longitude: lng, latitude: lat });
      if (onLocationSelect) {
        onLocationSelect(lng, lat);
      }
    }
  }, [onLocationSelect, memories, viewState.zoom]);

  const handleMemoryClick = useCallback((memory: MemoryData) => {
    setSelectedMemory(memory);
    // Clear the selected location to prevent adding a new marker
    setSelectedLocation(null);
  }, []);

  const handlePopupClose = useCallback(() => {
    setSelectedMemory(null);
  }, []);

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

  const handleViewStateChange = useCallback((newViewState: any) => {
    setViewState(newViewState);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col">
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
        onMove={evt => handleViewStateChange(evt.viewState)}
        style={{width: '100%', height: '100%'}}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onClick={handleClick}
        mapboxAccessToken={mapboxToken}
      >
        <NavigationControl position="top-right" />
        
        {/* Map Stats */}
        <div className="absolute top-2 right-14 bg-white p-2 rounded shadow-md text-xs">
          <div>Longitude: {viewState.longitude.toFixed(4)}</div>
          <div>Latitude: {viewState.latitude.toFixed(4)}</div>
          <div>Zoom: {viewState.zoom.toFixed(2)}</div>
        </div>

        {memories.map((memory) => (
          <Marker 
            key={memory.id}
            longitude={memory.longitude} 
            latitude={memory.latitude}
            color="red"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              handleMemoryClick(memory);
            }}
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
        {selectedMemory && (
          <MemoryPopup memory={selectedMemory} onClose={handlePopupClose} />
        )}
      </Map>
      {viewState.zoom < MIN_ZOOM_FOR_NEW_MEMORY && (
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
          Zoom in to add a new memory
        </div>
      )}
      {viewState.zoom >= FREE_PLACEMENT_ZOOM && (
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
          You can now place a memory anywhere on the map
        </div>
      )}
    </div>
  );
};

export default MapContainer;
