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

// Define the Zod schema
const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  description: z.string().min(1, 'Description is required').max(1000, 'Description must be 1000 characters or less'),
  address: z.string().min(1, 'Address is required'),
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
    address: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Submitting form...', formData);

    try {
      const validatedData = formSchema.parse(formData);
      console.log('Data validated successfully:', validatedData);
      
      const supabase = createClient();
      const { data, error } = await supabase
        .from('memories')
        .insert([validatedData])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Memory submitted successfully:', data);
      
      // Redirect to dashboard
      console.log('Redirecting to dashboard...');
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
    <Card>
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
            <Label htmlFor="address">Address</Label>
            <Input id="address" type="text" placeholder="123 Main St, Anytown USA" onChange={handleChange} value={formData.address} />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>
          <div className="grid gap-3">
            <Label>Location</Label>
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
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Memory'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

