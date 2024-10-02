'use client'

import React from 'react';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        sidebarExpanded={sidebarExpanded} 
        setSidebarExpanded={setSidebarExpanded}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4">
          {React.Children.map(children, (child) => 
            React.isValidElement(child) && typeof child.type !== 'string'
              ? React.cloneElement(child, { sidebarExpanded } as React.ComponentProps<typeof child.type>)
              : child
          )}
        </main>
      </div>
    </div>
  );
}
