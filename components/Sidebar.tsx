import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X, Menu, Grid, Star, Calendar, MapPin } from 'lucide-react';

interface SidebarProps {
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
  setView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarExpanded, setSidebarExpanded, setView }) => {
  return (
    <div
      className={cn(
        "bg-white shadow-md transition-all duration-300 ease-in-out flex flex-col",
        sidebarExpanded ? "w-64" : "w-16" // Adjusted width for expanded and collapsed states
      )}
    >
      <div className="p-4 flex-grow">
        <div className="flex items-center justify-between mb-4">
          {sidebarExpanded && <h1 className="text-2xl font-bold">Memory</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
            className={cn("h-8 w-8", !sidebarExpanded && "mx-auto")} // Center the button when collapsed
          >
            {sidebarExpanded ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
        <div className="space-y-4">
          <Button
            className={cn("w-full flex justify-between", sidebarExpanded ? "justify-between" : "justify-center")}
            variant="ghost"
            onClick={() => setView("cards")}
          >
            {sidebarExpanded && <span className="mr-2">All Memories</span>}
            <Grid className="h-4 w-4 flex-shrink-0" />
          </Button>
          <Button
            className={cn("w-full flex justify-between", sidebarExpanded ? "justify-between" : "justify-center")}
            variant="ghost"
            onClick={() => setView("collections")}
          >
            {sidebarExpanded && <span className="mr-2">Collections</span>}
            <Star className="h-4 w-4 flex-shrink-0" />
          </Button>
          <Button
            className={cn("w-full flex justify-between", sidebarExpanded ? "justify-between" : "justify-center")}
            variant="ghost"
            onClick={() => setView("timeline")}
          >
            {sidebarExpanded && <span className="mr-2">Timeline</span>}
            <Calendar className="h-4 w-4 flex-shrink-0" />
          </Button>
          <Button
            className={cn("w-full flex justify-between", sidebarExpanded ? "justify-between" : "justify-center")}
            variant="ghost"
            onClick={() => setView("map")}
          >
            {sidebarExpanded && <span className="mr-2">Places</span>}
            <MapPin className="h-4 w-4 flex-shrink-0" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;