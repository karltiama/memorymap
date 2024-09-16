import React from 'react';

interface StaticMapProps {
  latitude: number;
  longitude: number;
  zoom: number;
}

const StaticMap: React.FC<StaticMapProps> = ({ latitude, longitude, zoom }) => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const imageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ff0000(${longitude},${latitude})/${longitude},${latitude},${zoom}/400x300@2x?access_token=${mapboxToken}`;

  return (
    <div className="w-full h-full relative">
      <img 
        src={imageUrl} 
        alt="Location Map" 
        className="w-full h-full object-cover absolute top-0 left-0"
      />
    </div>
  );
};

export default StaticMap;
