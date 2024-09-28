import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()
  
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const { data, error } = await supabase.storage
      .from('memory-images')
      .upload(`${Date.now()}_${file.name}`, file)

    if (error) {
      console.error('Supabase storage error:', error)
      return NextResponse.json({ error: `Failed to upload file: ${error.message}` }, { status: 500 })
    }

    const { data: { publicUrl } } = supabase.storage
      .from('memory-images')
      .getPublicUrl(data.path)

    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: `An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}` }, { status: 500 })
  }
}
