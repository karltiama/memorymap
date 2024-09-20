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
        setView={setView} // Pass the setView function to the Sidebar
      />
      <main className={`flex-1 p-4 overflow-y-auto ${sidebarExpanded ? 'ml-64' : 'ml-20'}`} style={{ height: 'calc(100vh - 0px)' }}>
        {children} {/* Render the child pages here */}
      </main>
    </div>
  );
}
