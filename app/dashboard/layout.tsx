'use client'

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        sidebarExpanded={sidebarExpanded} 
        setSidebarExpanded={setSidebarExpanded}
      />
      <main className="flex-1 overflow-y-auto">
        <DashboardHeader />
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
