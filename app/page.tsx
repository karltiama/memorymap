"use client"

import Link from "next/link";
import Image from "next/image";
import { MapIcon, MapPin, PenTool, Share2, Image as ImageIcon, AudioLines } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState, useCallback } from 'react';
import Map, { MapLayerMouseEvent, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent } from "@/components/ui/card";

interface MarkerType {
  longitude: number;
  latitude: number;
}
// Interactive Map Component - Make this a component
const InteractiveMap: React.FC = () => {
  const [viewState, setViewState] = useState({
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 12
  });
  const [marker, setMarker] = useState<MarkerType | null>(null);
  const [showPopup, setShowPopup] = useState(true);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  if (!mapboxToken) {
    console.error('Mapbox access token is missing');
    return <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center text-gray-700">Map unavailable</div>;
  }

  const handleClick = useCallback((event: MapLayerMouseEvent) => {
    const { lngLat } = event;
    setMarker({
      longitude: lngLat.lng,
      latitude: lngLat.lat
    });
    setShowPopup(false);
  }, []);

  return (
    <div className="w-full h-[400px] relative rounded-xl overflow-hidden">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        onClick={handleClick}
        style={{width: '100%', height: '100%'}}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={mapboxToken}
      >
        {marker && (
          <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            color="#3b82f6" // Tailwind blue-500
          />
        )}
        {showPopup && (
          <Popup
            longitude={viewState.longitude}
            latitude={viewState.latitude}
            closeButton={false}
            closeOnClick={false}
            anchor="bottom"
            offset={[0, -15]}
          >
            <div className="bg-background dark:bg-background p-3 rounded-lg shadow-lg">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Click anywhere to add a memory!
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Explore and pin your favorite moments.
              </p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Header - Make this a component */}
      <header className="px-4 lg:px-6 h-14 flex items-center max-w-7xl mx-auto w-full">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <MapIcon className="h-6 w-6" />
          <span className="sr-only">MemoryMap</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
            Features
          </Link>
          <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
            Pricing
          </Link>
          <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-center">
                    Pin Your Memories on the Map with Memory Mapper.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl text-center mx-auto">
                    Create digital notes of your memories and pin them on an interactive map. Relive your experiences, share your stories, and never forget that special moment.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Explore MemoryMap
                  </Link>
                </div>
              </div>
              <div className="w-full max-w-[550px] mx-auto lg:order-last">
                <Image
                  src="/images/hero-image.png"
                  width={550}
                  height={550}
                  alt="MemoryMap Hero Image"
                  className="w-full h-auto aspect-square object-cover rounded-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-12">
              <div className="w-full max-w-[550px] lg:w-1/2">
                <InteractiveMap />
              </div>
              <div className="flex flex-col justify-center space-y-4 lg:w-1/2">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">Interactive Map Pinning</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-center">
                    Easily pin your memories to specific locations on our interactive map. Zoom in, explore, and
                    rediscover your favorite moments with just a click.
                  </p>
                </div>
                <div className="flex justify-center"> {/* Added this wrapper div */}
                  <ul className="grid gap-2 py-4 max-w-md"> {/* Added max-w-md for better control */}
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Precise location tagging</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <PenTool className="h-4 w-4" />
                      <span>Customizable pins and icons</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      <span>Easy sharing with friends</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid items-center gap-6 lg:grid-cols-[500px_1fr] lg:gap-12 xl:grid-cols-[550px_1fr]">
              <div className="flex flex-col justify-center space-y-4 text-center mx-auto"> {/* Added text-center here */}
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Digital Memory Notes</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Create rich, multimedia notes to capture your memories in detail. Add text, photos, and even voice
                    recordings to preserve the essence of your experiences.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid gap-8 sm:grid-cols-2 md:gap-12">
                <Card>
                  <CardContent className="flex flex-col items-center space-y-2 p-6 text-center">
                    <PenTool className="h-12 w-12 text-primary" />
                    <h3 className="text-xl font-bold">Rich Text Editor</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Format your notes with ease using our intuitive rich text editor.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center space-y-2 p-6 text-center">
                    <ImageIcon className="h-12 w-12 text-primary" />
                    <h3 className="text-xl font-bold">Photo Uploads</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Attach multiple photos to your notes to visually relive your memories.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center space-y-2 p-6 text-center">
                    <AudioLines className="h-12 w-12 text-primary" />
                    <h3 className="text-xl font-bold">Voice Memos</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Capture the sounds and emotions of your memories with voice recordings.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center space-y-2 p-6 text-center">
                    <Share2 className="h-12 w-12 text-primary" />
                    <h3 className="text-xl font-bold">Easy Sharing</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Share your memories with friends and family or keep them private.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            <div className="grid gap-6">
              {/* FAQ items */}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            <form className="grid gap-6">
              {/* Contact form fields */}
            </form>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 border-t">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto flex flex-col gap-2 sm:flex-row items-center">
          <p className="text-xs text-muted-foreground">&copy; 2024 MemoryMap. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
