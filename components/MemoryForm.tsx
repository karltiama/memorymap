'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createClient } from '@/utils/supabase/client';
import { DatePicker } from "@/components/DatePicker";
import { format } from "date-fns";
import { Plus, X, Upload } from "lucide-react"; // Import icons
import { useDropzone } from 'react-dropzone';

// Define the Zod schema
const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  description: z.string().min(1, 'Description is required').max(1000, 'Description must be 1000 characters or less'),
  memory_date: z.date({
    required_error: "A date is required.",
  }),
  tags: z.string(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  image_urls: z.array(z.string().url()).optional(),
})

type FormData = z.infer<typeof formSchema>

interface MemoryFormProps {
  selectedLocation: { longitude: number; latitude: number } | null;
}

export function MemoryForm({ selectedLocation }: MemoryFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    memory_date: new Date(),
    tags: '',
    latitude: null,
    longitude: null,
    image_urls: [],
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);

  useEffect(() => {
    if (selectedLocation) {
      setFormData(prevData => ({
        ...prevData,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      }));
    }
  }, [selectedLocation]);

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, memory_date: date || prev.memory_date }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = formSchema.parse(formData);
      
      // Format the date to ISO string
      const formattedData = {
        ...validatedData,
        memory_date: validatedData.memory_date ? format(validatedData.memory_date, "yyyy-MM-dd") : null,
      };

      const supabase = createClient();
      
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No authenticated user found');
      }

      // Process tags: split by comma and trim whitespace
      const processedTags = validatedData.tags
        ? validatedData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        : [];

      // Add the user_id to the validated data and process tags
      const dataToSubmit = {
        ...formattedData,
        user_id: user.id,
        tags: processedTags, // Use the processed tags array
        latitude: validatedData.latitude ? Number(validatedData.latitude) : null,
        longitude: validatedData.longitude ? Number(validatedData.longitude) : null,
        image_urls: formData.image_urls,
      };

      console.log('Submitting data:', dataToSubmit);

      const { data, error } = await supabase
        .from('memories')
        .insert([dataToSubmit])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Memory submitted successfully:', data);
      
      // Redirect to dashboard
      router.push('/dashboard');

    } catch (error) {
      console.error('Error in form submission:', error);
      if (error instanceof z.ZodError) {
        console.log('Zod validation error:', error.flatten().fieldErrors);
        setErrors(error.flatten().fieldErrors as Partial<Record<keyof FormData, string>>);
      } else {
        console.error('Unexpected error:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setSelectedPhotos(prevPhotos => [...prevPhotos, ...acceptedFiles]);

    try {
      const uploadedUrls = await Promise.all(acceptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to upload image: ${errorData.error || response.statusText}`);
        }

        const { url } = await response.json();
        return url;
      }));

      setFormData(prevData => ({
        ...prevData,
        image_urls: [...(prevData.image_urls || []), ...uploadedUrls],
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      // You can set an error state here to display to the user
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removePhoto = (index: number) => {
    setSelectedPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
    setFormData(prevData => ({
      ...prevData,
      image_urls: prevData.image_urls?.filter((_, i) => i !== index) || [],
    }));
  };

  return (
    <div className="h-full overflow-y-auto">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Share a Memory</CardTitle>
          <CardDescription>Add a new memory to the interactive map.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Input
                id="title"
                type="text"
                placeholder="Title: My Vacation in Hawaii"
                onChange={handleChange}
                value={formData.title}
                className="w-full"
                aria-label="Title"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>
            <div className="grid gap-2">
              <Textarea
                id="description"
                placeholder="Description: Tell us about your memory..."
                className="min-h-[100px] w-full"
                onChange={handleChange}
                value={formData.description}
                aria-label="Description"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>
            <div className="grid gap-2">
              <Input
                id="tags"
                type="text"
                placeholder="Tags: Add keywords or people, separated by commas"
                onChange={handleChange}
                value={formData.tags}
                className="w-full"
                aria-label="Tags"
              />
            </div>
            <div className="grid gap-2">
              <DatePicker
                date={formData.memory_date}
                setDate={handleDateChange}
                aria-label="Date"
              />
              {errors.memory_date && <p className="text-red-500 text-sm">{errors.memory_date}</p>}
            </div>
            <div className="grid gap-2">
              <div {...getRootProps()} className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${isDragActive ? 'border-primary' : 'border-gray-300'}`}>
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
              {selectedPhotos.length > 0 && (
                <div className="mt-2 space-y-1 max-h-24 overflow-y-auto">
                  {selectedPhotos.map((photo, index) => (
                    <div key={index} className="flex items-center justify-between bg-secondary p-2 rounded text-sm">
                      <span className="truncate">{photo.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removePhoto(index)}
                        className="h-6 w-6 p-0"
                        aria-label={`Remove ${photo.name}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Memory'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}