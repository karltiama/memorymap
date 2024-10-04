import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X, Menu, Grid, Star, Calendar, MapPin, ImagePlus } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from '@/contexts/SidebarContext'; // Import the context

const Sidebar: React.FC = () => {
  const { sidebarExpanded, setSidebarExpanded } = useSidebar(); // Use context to get sidebar state
  const pathname = usePathname();

  const navItems = [
    { label: "All Memories", icon: Grid, href: "/dashboard" },
    { label: "Collections", icon: Star, href: "/dashboard/collections" },
    { label: "Timeline", icon: Calendar, href: "/dashboard/timeline" },
    { label: "Places", icon: MapPin, href: "/dashboard/map" },
    { label: "Create Memory", icon: ImagePlus, href: "/dashboard/create" },
  ];

  return (
    <TooltipProvider>
      <div
        className={cn(
          "bg-primary text-white shadow-md transition-all duration-300 ease-in-out flex flex-col h-full",
          sidebarExpanded ? "w-64" : "w-16",
          "hidden md:flex" // Hide on mobile, show on medium screens and up
        )}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div className={cn(!sidebarExpanded && "w-full")}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSidebarExpanded(!sidebarExpanded)} // Toggle sidebar state
                    aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
                    className={cn("h-8 w-8", !sidebarExpanded && "mx-auto")}
                  >
                    {sidebarExpanded ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="flex flex-col space-y-2 flex-grow">
            {navItems.map(({ label, icon: Icon, href }) => (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <Link href={href} passHref>
                    <Button
                      className={cn(
                        "w-full flex",
                        sidebarExpanded ? "justify-start" : "justify-center",
                        pathname === href ? "bg-accent" : ""
                      )}
                      variant="ghost"
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {sidebarExpanded && <span className="ml-2 text-xl font-medium">{label}</span>}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {!sidebarExpanded && (
                  <TooltipContent side="right">
                    <p>{label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;