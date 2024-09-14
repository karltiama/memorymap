import React from 'react';
import { Popup } from 'react-map-gl';
import { FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { MarkerData } from '@/types/types';

interface MarkerPopupProps {
  marker: MarkerData;
  onClose: () => void;
}

const MarkerPopup: React.FC<MarkerPopupProps> = ({ marker, onClose }) => {
  return (
    <Popup
      longitude={marker.longitude}
      latitude={marker.latitude}
      onClose={onClose}
      closeOnClick={false}
      closeButton={false}
      anchor="bottom"
      offset={[0, -10]}
    >
      <div className="bg-white rounded-lg shadow-lg p-4 relative max-w-xs">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={onClose}>
          <FaTimes size={20} />
        </button>
        <h3 className="text-lg font-bold">{marker.title}</h3>
        <p className="mt-2 text-gray-700">{marker.summary}</p>
        <Link href={`/memory/${marker.memoryId}`} className="mt-4 inline-block text-blue-500 hover:underline">View Memory</Link>
      </div>
    </Popup>
  );
};

export default MarkerPopup;
