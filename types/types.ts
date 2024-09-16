export interface MemoryData {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  tags: string[]; // Changed from string to string[]
  // ... other fields ...
}
