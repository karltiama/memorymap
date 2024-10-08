export interface MemoryData {
  id: string;
  title: string;
  description: string;
  memory_date: string;
  latitude: number;
  longitude: number;
  tags: string[]; // Changed from string to string[]
  image_urls: string[] | string | null;
  // ... other fields ...
}
