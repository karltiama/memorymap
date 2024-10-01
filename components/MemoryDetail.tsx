'use client'

import React, { useState } from 'react';
import { format } from 'date-fns';
import { MemoryData } from '@/types/types';
import { Button } from './ui/button';
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, FolderPlus, Share2, MessageCircle, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import FullScreenGallery from './FullScreenGallery';

interface MemoryDetailProps {
  memory: MemoryData;
}

const MemoryDetail: React.FC<MemoryDetailProps> = ({ memory }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);

  const getTags = (tags: string | string[] | null): string[] => {
    if (!tags) return [];
    if (typeof tags === 'string') return tags.split(',').map(tag => tag.trim());
    return tags;
  };

  const tags = getTags(memory.tags);
  const imageUrls = Array.isArray(memory.image_urls) ? memory.image_urls : 
                  (typeof memory.image_urls === 'string' ? JSON.parse(memory.image_urls) : []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  const editMemory = () => {
    // Implement edit functionality
  };

  const deleteMemory = () => {
    // Implement delete functionality
  };

  const addToCollection = () => {
    // Implement add to collection functionality
  };

  const shareMemory = () => {
    // Implement share functionality
  };

  const addComment = () => {
    // Implement add comment functionality
  };

  return (
    <TooltipProvider>
      <Card className="w-full max-w-5xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-3xl">{memory.title}</CardTitle>
            <p className="text-lg text-muted-foreground">
              {format(new Date(memory.memory_date), 'MMMM d, yyyy')}
            </p>
          </div>
          {/* Memory Actions With Tooltips */}
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={editMemory}>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit Memory</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Memory</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={deleteMemory}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete Memory</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Memory</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={addToCollection}>
                  <FolderPlus className="h-4 w-4" />
                  <span className="sr-only">Add to Collection</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to Collection</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={shareMemory}>
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share Memory</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share Memory</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Static Map */}
            <div className="w-full h-64 bg-muted rounded-md overflow-hidden">
              <Map
                initialViewState={{
                  latitude: memory.latitude,
                  longitude: memory.longitude,
                  zoom: 14
                }}
                style={{width: '100%', height: '100%'}}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
              >
                <Marker latitude={memory.latitude} longitude={memory.longitude} color="red" />
              </Map>
            </div>

            {/* Image Carousel */}
            <div className="relative">
              <div className="w-full h-64 bg-muted rounded-md overflow-hidden">
                {imageUrls.length > 0 ? (
                  <img 
                    src={imageUrls[currentImageIndex]} 
                    alt={`Memory image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setIsFullScreenOpen(true)}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No images available
                  </div>
                )}
              </div>
              {imageUrls.length > 1 && (
                <>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute top-1/2 left-2 transform -translate-y-1/2"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                    <span className="sr-only">Previous Image</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute top-1/2 right-2 transform -translate-y-1/2"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                    <span className="sr-only">Next Image</span>
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-2 right-2"
                onClick={() => setIsFullScreenOpen(true)}
              >
                <Expand className="h-4 w-4" />
                <span className="sr-only">View Full Screen</span>
              </Button>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg">{memory.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-base px-3 py-1">{tag}</Badge>
            ))}
          </div>

          {/* Comments Section */}
          <div className="space-y-4">
            <Button 
              variant="outline" 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              {showComments ? "Hide Comments" : "Show Comments"}
            </Button>
            {showComments && (
              <div className="space-y-4">
                {/* Implement comments rendering here */}
                <div className="space-y-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button onClick={addComment}>Post Comment</Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <FullScreenGallery
        images={imageUrls}
        initialIndex={currentImageIndex}
        isOpen={isFullScreenOpen}
        onClose={() => setIsFullScreenOpen(false)}
      />
    </TooltipProvider>
  );
};

export default MemoryDetail;