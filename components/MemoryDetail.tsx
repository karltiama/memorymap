'use client'

import React from 'react';
import { format } from 'date-fns';
import { MemoryData } from '@/types/types';
import { Button } from './ui/button';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"

interface MemoryDetailProps {
  memory: MemoryData;
}

const MemoryLocationMap: React.FC<{ latitude: number; longitude: number }> = ({ latitude, longitude }) => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  if (!mapboxToken) {
    console.error('Mapbox access token is missing');
    return <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-700">Map unavailable: Missing access token</div>;
  }

  return (
    <Map
      initialViewState={{
        latitude: latitude,
        longitude: longitude,
        zoom: 14
      }}
      style={{width: '100%', height: '100%'}}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={mapboxToken}
    >
      <Marker latitude={latitude} longitude={longitude} color="red" />
    </Map>
  );
};

const MemoryDetail: React.FC<MemoryDetailProps> = ({ memory }) => {
  const getTags = (tags: string | string[] | null): string[] => {
    if (!tags) return [];
    if (typeof tags === 'string') return tags.split(',').map(tag => tag.trim());
    return tags;
  };

  const tags = getTags(memory.tags);
  const imageUrls = Array.isArray(memory.image_urls) ? memory.image_urls : 
                  (typeof memory.image_urls === 'string' ? JSON.parse(memory.image_urls) : []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">{memory.title}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden h-[400px] sm:h-[500px]">
          <MemoryLocationMap latitude={memory.latitude} longitude={memory.longitude} />
        </div>
        <div className="relative">
          <Carousel className="h-[400px] sm:h-[500px]">
            <CarouselContent>
              {imageUrls.length > 0 ? (
                imageUrls.map((url: string, index: number) => (
                  <CarouselItem key={index}>
                    <div className="rounded-lg overflow-hidden h-full">
                      <img
                        src={url}
                        alt={`Memory Photo ${index + 1}`}
                        width={800}
                        height={500}
                        className="w-full h-full object-cover"
                        style={{ aspectRatio: "800/500", objectFit: "cover" }}
                      />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="rounded-lg overflow-hidden h-full flex items-center justify-center bg-gray-200 text-gray-500">
                    No photos available
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            {imageUrls.length > 1 && (
              <>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
              </>
            )}
          </Carousel>
        </div>
      </div>
      <div className="mt-12 space-y-6">
        <p className="text-gray-600">
          {format(new Date(memory.memory_date), 'MMMM d, yyyy')}
        </p>
        <p className="text-lg text-gray-700">{memory.description}</p>
        {tags.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant={index % 2 === 0 ? "default" : "secondary"}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mt-6">
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
          <Link href={`/memories/${memory.id}/edit`}>
            <Button>Edit Memory</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MemoryDetail;
