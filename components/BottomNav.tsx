import { Grid, Image, MapPin, Clock, Plus } from "lucide-react"
import Link from "next/link"

function NavItem({ href, icon: Icon, label }: { href: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; label: string }) {
  return (
    <li>
      <Link 
        href={href} 
        aria-label={label} 
        className="flex flex-col items-center p-2 text-white hover:text-gray-300"
      >
        <Icon className="h-6 w-6 text-white" /> 
        <span className="text-xs mt-1 font-semibold">{label}</span>
      </Link>
    </li>
  )
}

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-primary border-t border-border" role="navigation">
      <div className="max-w-md mx-auto px-4 py-2">
        <ul className="flex items-center justify-between relative">
          <NavItem href="/dashboard" icon={Grid} label="All" />
          <NavItem href="/dashboard/collections" icon={Image} label="Collection" />
          <li className="-mt-8">
            <Link 
              href="/dashboard/create" 
              className="border border-white absolute left-1/2 -translate-x-1/2 -top-8 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors" 
              aria-label="Add New Memory"
            >
              <Plus className="h-6 w-6 text-white" /> 
              <span className="sr-only">Add New Memory</span>
            </Link>
          </li>
          <NavItem href="/dashboard/places" icon={MapPin} label="Places" />
          <NavItem href="/dashboard/timeline" icon={Clock} label="Timeline" />
        </ul>
      </div>
    </nav>
  )
}


