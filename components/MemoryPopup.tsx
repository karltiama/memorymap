import React, { useState } from 'react';
import { Popup } from 'react-map-gl';
import { MemoryData } from '@/types/types';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Share, Star, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';

interface MemoryPopupProps {
  memory: MemoryData;
  onClose: () => void;
}

const MAX_DESCRIPTION_LENGTH = 100; // Set the maximum length for the description

const truncateDescription = (description: string) => {
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return description.substring(0, MAX_DESCRIPTION_LENGTH) + '...';
  }
  return description;
};

const MemoryPopup: React.FC<MemoryPopupProps> = ({ memory, onClose }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const imageUrls = Array.isArray(memory.image_urls) ? memory.image_urls : 
                  (typeof memory.image_urls === 'string' ? JSON.parse(memory.image_urls) : []);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => 
      (prevIndex + 1) % imageUrls.length
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => 
      (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  return (
    <Popup
      longitude={memory.longitude}
      latitude={memory.latitude}
      onClose={onClose}
      closeOnClick={false}
      closeButton={false}
      anchor="bottom"
      offset={[0, -10]}
      className="custom-popup" // Add a custom class for styling
    >
      <Card className="w-full max-w-sm overflow-hidden shadow-lg">
        <div className="relative">
          {imageUrls.length > 0 ? (
            <Image
              src={imageUrls[currentPhotoIndex]}
              alt={memory.title}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={onClose}>
            <X className="w-6 h-6 text-white" />
          </Button>
          <Button variant="ghost" size="icon" className="absolute top-2 right-10">
            <Share className="w-6 h-6 text-white" />
          </Button>
          {imageUrls.length > 1 && (
            <>
              <Button variant="ghost" size="icon" className="absolute top-1/2 left-2 transform -translate-y-1/2" onClick={prevPhoto}>
                <ChevronLeft className="w-6 h-6 text-white" />
              </Button>
              <Button variant="ghost" size="icon" className="absolute top-1/2 right-2 transform -translate-y-1/2" onClick={nextPhoto}>
                <ChevronRight className="w-6 h-6 text-white" />
              </Button>
            </>
          )}
        </div>
        <CardContent className="space-y-2 bg-white">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">{memory.title}</h3>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{truncateDescription(memory.description)}</p>
        </CardContent>
      </Card>
    </Popup>
  );
};

export default MemoryPopup;
