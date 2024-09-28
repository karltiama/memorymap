import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = createClient()

  try {
    const { data: memories, error } = await supabase
      .from('memories')
      .select('id, title, description, latitude, longitude, image_urls')

    if (error) {
      console.error('Error fetching memories:', error)
      return NextResponse.json({ error: 'Failed to fetch memories' }, { status: 500 })
    }

    return NextResponse.json(memories)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const supabase = createClient()

  try {
    const { title, description, address, latitude, longitude, image_urls, tags, memory_date } = await request.json()

    // Get the user ID from the session
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('memories')
      .insert({
        user_id: user.id,
        title,
        description,
        address,
        latitude,
        longitude,
        image_urls,
        tags,
        memory_date
      })
      .select()

    if (error) {
      console.error('Error inserting memory:', error)
      return NextResponse.json({ error: 'Failed to insert memory' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
