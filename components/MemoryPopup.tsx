import React from 'react';
import { Popup } from 'react-map-gl';
import { MemoryData } from '@/types/types';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Share, Star } from 'lucide-react';

interface MemoryPopupProps {
  memory: MemoryData;
  onClose: () => void;
}

const MemoryPopup: React.FC<MemoryPopupProps> = ({ memory, onClose }) => {
  // const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Commented out for future implementation
  // const nextPhoto = () => {
  //   setCurrentPhotoIndex((prevIndex) => 
  //     (prevIndex + 1) % memory.photos.length
  //   );
  // };

  // const prevPhoto = () => {
  //   setCurrentPhotoIndex((prevIndex) => 
  //     (prevIndex - 1 + memory.photos.length) % memory.photos.length
  //   );
  // };

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
      <Card className="w-full max-w-sm">
        <div className="relative">
          <img
            src="/placeholder.svg"
            alt={memory.title}
            className="w-full h-48 object-cover rounded-t-md"
            width="200"
            height="200"
            style={{ aspectRatio: "200/200", objectFit: "cover" }}
          />
          <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={onClose}>
            <Heart className="w-6 h-6 text-white" />
          </Button>
          <Button variant="ghost" size="icon" className="absolute top-2 right-10">
            <Share className="w-6 h-6 text-white" />
          </Button>
          {/* Commented out for future implementation
          {memory.photos && memory.photos.length > 1 && (
            <>
              <Button variant="ghost" size="icon" className="absolute top-1/2 left-2 transform -translate-y-1/2" onClick={prevPhoto}>
                <ChevronLeft className="w-6 h-6 text-white" />
              </Button>
              <Button variant="ghost" size="icon" className="absolute top-1/2 right-2 transform -translate-y-1/2" onClick={nextPhoto}>
                <ChevronRight className="w-6 h-6 text-white" />
              </Button>
            </>
          )} */}
        </div>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">{memory.title}</h3>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{memory.description}</p>
          
        </CardContent>
      </Card>
    </Popup>
  );
};

export default MemoryPopup;
