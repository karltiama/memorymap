import React, { useState, useCallback, useEffect } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { MarkerData } from '@/types/types'; // Create a types file for shared types
import MarkerPopup from './MarkerPopup';

interface MapContainerProps {
  markers: MarkerData[];
  onLocationSelect?: (lng: number, lat: number) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({ markers, onLocationSelect }) => {
  const [viewState, setViewState] = useState({
    longitude: -98.5795,
    latitude: 39.8283,
    zoom: 3,
  });
  const [marker, setMarker] = useState<{ lng: number; lat: number } | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

  const handleClick = useCallback((event: mapboxgl.MapMouseEvent) => {
    const { lng, lat } = event.lngLat;

    // Proximity threshold logic
    const zoomLevel = viewState.zoom;
    let proximityThreshold = zoomLevel < 5 ? 0.1 : zoomLevel < 10 ? 0.05 : zoomLevel < 16 ? 0.01 : 0.005;

    const clickedMarker = markers.find(marker => 
      Math.abs(marker.longitude - lng) < proximityThreshold && 
      Math.abs(marker.latitude - lat) < proximityThreshold
    );

    if (!clickedMarker) {
      setMarker({ lng, lat });
      if (onLocationSelect) {
        onLocationSelect(lng, lat);
      }
    }
  }, [onLocationSelect, markers, viewState.zoom]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '80vh' }}>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        onClick={handleClick}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      >
        <NavigationControl position="top-right" />
        {/* Stats Overlay */}
        <div style={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          padding: '5px 10px',
          borderRadius: '4px',
          zIndex: 1,
        }}>
          <div>Longitude: {viewState.longitude.toFixed(4)}</div>
          <div>Latitude: {viewState.latitude.toFixed(4)}</div>
          <div>Zoom: {viewState.zoom.toFixed(2)}</div>
        </div>

        {marker && (
          <Marker longitude={marker.lng} latitude={marker.lat}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'red', border: '2px solid white' }} />
          </Marker>
        )}
        {markers.map(marker => (
          <Marker key={marker.id} longitude={marker.longitude} latitude={marker.latitude}>
            <div 
              style={{ backgroundColor: 'blue', width: '20px', height: '20px', borderRadius: '50%', cursor: 'pointer', border: '2px solid white' }} 
              onClick={() => setSelectedMarker(marker)}
            />
          </Marker>
        ))}
        {selectedMarker && (
          <MarkerPopup marker={selectedMarker} onClose={() => setSelectedMarker(null)} />
        )}
      </Map>
    </div>
  );
};

export default MapContainer;
