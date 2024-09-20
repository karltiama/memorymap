import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X, Menu, Grid, Star, Calendar, MapPin } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarExpanded, setSidebarExpanded }) => {
  const pathname = usePathname();

  const navItems = [
    { label: "All Memories", icon: Grid, href: "/dashboard" },
    { label: "Collections", icon: Star, href: "/dashboard/collections" },
    { label: "Timeline", icon: Calendar, href: "/dashboard/timeline" },
    { label: "Places", icon: MapPin, href: "/dashboard/map" },
  ];

  return (
    <TooltipProvider>
      <div
        className={cn(
          "bg-white shadow-md transition-all duration-300 ease-in-out flex flex-col",
          sidebarExpanded ? "w-64" : "w-16"
        )}
      >
        <div className="p-4 flex-grow">
          <div className="flex items-center justify-between mb-4">
            {sidebarExpanded && <h1 className="text-2xl font-bold">Memory</h1>}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarExpanded(!sidebarExpanded)}
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
          <div className="space-y-4">
            {navItems.map(({ label, icon: Icon, href }) => (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <Link href={href} passHref>
                    <Button
                      className={cn(
                        "w-full flex",
                        sidebarExpanded ? "justify-start" : "justify-center",
                        pathname === href ? "bg-gray-200" : ""
                      )}
                      variant="ghost"
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      {sidebarExpanded && <span className="ml-2">{label}</span>}
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