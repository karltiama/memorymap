'use client'

import React, { useState, useEffect } from 'react';
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
  image_url: z.string().url().nullable(),
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
    image_url: null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <div className="h-full overflow-y-auto">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Share a Memory</CardTitle>
          <CardDescription>Add a new memory to the interactive map.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input id="title" type="text" placeholder="My Vacation in Hawaii" onChange={handleChange} value={formData.title} />
              {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Tell us about your memory..." className="min-h-[120px]" onChange={handleChange} value={formData.description} />
              {errors.description && <p className="text-red-500">{errors.description}</p>}
            </div>
            <div className="grid gap-3">
              <Label>Latitude and Longitude</Label>
              {formData.latitude && formData.longitude && (
                <p>Selected: {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" type="text" placeholder="Add tags separated by commas" onChange={handleChange} value={formData.tags} />
              <p className="text-sm text-muted-foreground">
                Add keywords or people to help others find your memory.
              </p>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="date">Date</Label>
              <DatePicker date={formData.memory_date} setDate={handleDateChange} />
              {errors.memory_date && <p className="text-red-500">{errors.memory_date}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Memory'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

