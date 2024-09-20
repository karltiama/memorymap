'use client'

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true); // State for sidebar

  const setView = (view: string) => {
    // Handle view changes if necessary
    console.log(`Navigating to ${view}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        sidebarExpanded={sidebarExpanded} 
        setSidebarExpanded={setSidebarExpanded}
      />
      <main className="flex-1 overflow-y-auto">
        {children} {/* Render the child pages here */}
      </main>
    </div>
  );
}
