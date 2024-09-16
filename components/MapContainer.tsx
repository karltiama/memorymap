import React, { useState, useCallback } from 'react';
import Map, { Marker } from 'react-map-gl';
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

  const handleClick = useCallback((event: any) => {
    const { lng, lat } = event.lngLat;
    setSelectedLocation({ longitude: lng, latitude: lat });
    if (onLocationSelect) {
      onLocationSelect(lng, lat);
    }
  }, [onLocationSelect]);

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{width: '100%', height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onClick={handleClick}
      mapboxAccessToken={mapboxToken}
    >
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
    </Map>
  );
};

export default MapContainer;
