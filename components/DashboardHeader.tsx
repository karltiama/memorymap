'use client'

import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ModeToggle'

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

  const pageInfo = pageInfoMap[pathname] || { title: 'Dashboard', description: 'Manage your memories and experiences.' }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
    } else {
      router.push('/')
    }
  }

  return (
    <header className="flex items-center justify-between p-4 bg-background text-foreground shadow-sm">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{pageInfo.title}</h1>
        <p className="text-muted-foreground">{pageInfo.description}</p>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
        <ModeToggle />
      </div>
    </header>
  )
}
