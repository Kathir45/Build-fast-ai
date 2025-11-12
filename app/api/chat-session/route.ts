import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      }
    );

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { session_id, messages } = await req.json();

    let sessionId = session_id;

    // Create new session if none exists
    if (!sessionId) {
      const firstUserMessage = messages.find((m: any) => m.role === 'user')?.content || 'New Chat';
      const title = firstUserMessage.substring(0, 50) + (firstUserMessage.length > 50 ? '...' : '');

      const { data: newSession, error: sessionError } = await supabase
        .from('chat_sessions')
        .insert({
          user_id: user.id,
          title,
        })
        .select()
        .single();

      if (sessionError) throw sessionError;

      sessionId = newSession.id;
    }

    // Save all messages
    const messagesToInsert = messages.map((msg: any) => ({
      session_id: sessionId,
      role: msg.role,
      content: msg.content,
    }));

    // Delete existing messages for this session first
    await supabase
      .from('chat_messages')
      .delete()
      .eq('session_id', sessionId);

    // Insert new messages
    const { error: messagesError } = await supabase
      .from('chat_messages')
      .insert(messagesToInsert);

    if (messagesError) throw messagesError;

    // Update session updated_at
    await supabase
      .from('chat_sessions')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', sessionId);

    return NextResponse.json({ success: true, session_id: sessionId });
  } catch (error: any) {
    console.error('Error saving chat session:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save chat session' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      }
    );

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    // Get messages for this session (RLS will ensure user owns this session)
    const { data: messages, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ messages: messages || [] });
  } catch (error: any) {
    console.error('Error loading chat session:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to load chat session' },
      { status: 500 }
    );
  }
}
