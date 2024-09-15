import React from 'react';
import { Popup } from 'react-map-gl';
import { FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { MemoryData } from '@/types/types';

interface MemoryPopupProps {
  memory: MemoryData;
  onClose: () => void;
}

const MemoryPopup: React.FC<MemoryPopupProps> = ({ memory, onClose }) => {
  return (
    <Popup
      longitude={memory.longitude}
      latitude={memory.latitude}
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
        <h3 className="text-lg font-bold">{memory.title}</h3>
        <p className="mt-2 text-gray-700">{memory.description}</p>
        <Link href={`/memory/${memory.id}`} className="mt-4 inline-block text-blue-500 hover:underline">
          View Memory
        </Link>
      </div>
    </Popup>
  );
};

export default MemoryPopup;
