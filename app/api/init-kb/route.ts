import { initializeDefaultKnowledge } from '@/lib/rag';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await initializeDefaultKnowledge();
    return NextResponse.json({ 
      success: true, 
      message: 'Default knowledge base initialized successfully' 
    });
  } catch (error: any) {
    console.error('Error initializing knowledge base:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to initialize knowledge base' },
      { status: 500 }
    );
  }
}
