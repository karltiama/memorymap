import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();

  // Generate a unique share token
  const shareToken = nanoid();

  // Store the share token in the database
  const { error } = await supabase
    .from('memory_shares')
    .insert({ memory_id: params.id, share_token: shareToken });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Generate the share URL
  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/shared/${shareToken}`;

  return NextResponse.json({ shareUrl });
}
