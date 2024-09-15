import React, { useState, useCallback, useEffect } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { MemoryData } from '@/types/types'; // Create a types file for shared types
import MemoryPopup from './MemoryPopup';

interface MapContainerProps {
  memories: MemoryData[];
  onLocationSelect?: (lng: number, lat: number) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({ memories, onLocationSelect }) => {
  const [viewState, setViewState] = useState({
    longitude: -98.5795,
    latitude: 39.8283,
    zoom: 3,
  });
  const [selectedMemory, setSelectedMemory] = useState<MemoryData | null>(null);
  const [newMarker, setNewMarker] = useState<{ longitude: number; latitude: number } | null>(null);
  const [citySearch, setCitySearch] = useState('');

  const handleClick = useCallback((event: mapboxgl.MapMouseEvent) => {
    const { lng, lat } = event.lngLat;
    setNewMarker({ longitude: lng, latitude: lat });
    if (onLocationSelect) {
      onLocationSelect(lng, lat);
    }
  }, [onLocationSelect]);

  const handleCitySearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(citySearch)}.json?access_token=${MAPBOX_API_KEY}`);
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      setViewState({
        longitude: lng,
        latitude: lat,
        zoom: 10,
      });
      setNewMarker({ longitude: lng, latitude: lat });
      if (onLocationSelect) {
        onLocationSelect(lng, lat);
      }
    }
  };

  useEffect(() => {
    if (newMarker && onLocationSelect) {
      onLocationSelect(newMarker.longitude, newMarker.latitude);
    }
  }, [newMarker, onLocationSelect]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '80vh' }}>
      <form onSubmit={handleCitySearch} style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
        <input
          type="text"
          value={citySearch}
          onChange={(e) => setCitySearch(e.target.value)}
          placeholder="Enter city name"
          style={{ padding: '5px', marginRight: '5px' }}
        />
        <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px' }}>
          Search
        </button>
      </form>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        onClick={handleClick}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      >
        <NavigationControl position="top-right" />
        <div style={{
          position: 'absolute',
          top: 10,
          right: 50,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          padding: '5px 10px',
          borderRadius: '4px',
          zIndex: 1,
        }}>
          <div>Longitude: {viewState.longitude.toFixed(4)}</div>
          <div>Latitude: {viewState.latitude.toFixed(4)}</div>
          <div>Zoom: {viewState.zoom.toFixed(2)}</div>
        </div>
        {memories.map(memory => (
          <Marker 
            key={memory.id} 
            longitude={memory.longitude} 
            latitude={memory.latitude}
            onClick={() => setSelectedMemory(memory)}
          >
            <div style={{ 
              width: '20px', 
              height: '20px', 
              borderRadius: '50%', 
              backgroundColor: 'blue', 
              border: '2px solid white',
              cursor: 'pointer'
            }} />
          </Marker>
        ))}
        {newMarker && (
          <Marker 
            longitude={newMarker.longitude} 
            latitude={newMarker.latitude}
            color="red"
          />
        )}
        {selectedMemory && (
          <MemoryPopup memory={selectedMemory} onClose={() => setSelectedMemory(null)} />
        )}
      </Map>
    </div>
  );
};

export default MapContainer;
