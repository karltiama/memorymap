'use client'

import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ModeToggle'
import { LogOut } from 'lucide-react' // Import the LogOut icon

interface PageInfo {
  title: string;
  description: string;
}

const pageInfoMap: Record<string, PageInfo> = {
  '/dashboard': {
    title: 'Memories',
    description: 'Revisit your favorite moments captured in time.'
  },
  '/dashboard/collections': {
    title: 'Collections',
    description: 'Organize your memories into meaningful groups.'
  },
  '/dashboard/timeline': {
    title: 'Timeline',
    description: 'View your memories in chronological order.'
  },
  '/dashboard/map': {
    title: 'Places',
    description: 'Explore your memories by location.'
  },
  '/dashboard/create': {
    title: 'Create Memory',
    description: 'Create a new memory to add to your collection.'
  },
}

export function DashboardHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  const getPageInfo = (path: string): PageInfo => {
    if (path.startsWith('/dashboard/memories/')) {
      return { title: 'Memory', description: 'View details of your memory.' }
    }
    return pageInfoMap[path] || { title: 'Dashboard', description: 'Manage your memories and experiences.' }
  }

  const pageInfo = getPageInfo(pathname)

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
    } else {
      router.push('/')
    }
  }

  return (
    <header className="bg-background text-foreground shadow-sm z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col items-start">
            <h1 className="text-3xl font-bold tracking-tight">{pageInfo.title}</h1>
            <p className="text-muted-foreground">{pageInfo.description}</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleSignOut} 
              aria-label="Sign Out"
              className="h-8 w-8"
            >
              <LogOut className="h-5 w-5" />
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
