'use client'

import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    address: '',
    tags: '',
    latitude: null,
    longitude: null,
    image_url: null,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

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
    e.preventDefault()
    try {
      const validatedData = formSchema.parse(formData)
      
      const response = await fetch('/api/memories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit memory')
      }

      const result = await response.json()
      console.log('Memory submitted successfully:', result)
      
      // Reset form or show success message
      setFormData({
        title: '',
        description: '',
        address: '',
        tags: '',
        latitude: null,
        longitude: null,
        image_url: null,
      })
      setErrors({})
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors as Partial<Record<keyof FormData, string>>)
      } else {
        console.error('Error submitting memory:', error)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleLocationSelect = (lng: number, lat: number) => {
    setFormData({ ...formData, longitude: lng, latitude: lat })
  }

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
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="w-10 h-10 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="tags">Tags</Label>
            <Input id="tags" type="text" placeholder="Add tags separated by commas" onChange={handleChange} value={formData.tags} />
            <p className="text-sm text-muted-foreground">
              Add keywords or people to help others find your memory.
            </p>
          </div>
          <Button type="submit" className="w-full">
            Submit Memory
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

