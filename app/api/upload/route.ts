import { NextRequest, NextResponse } from 'next/server';
import { storeDocumentChunks } from '@/lib/rag';
import { extractTextFromFile } from '@/lib/fileUtils';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Extract text from file
    const text = await extractTextFromFile(file);

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'No text content found in file' },
        { status: 400 }
      );
    }

    // Store document chunks with embeddings
    const metadata = {
      filename: file.name,
      fileType: file.type,
      uploadedAt: new Date().toISOString(),
    };

    await storeDocumentChunks(text, metadata);

    return NextResponse.json({
      success: true,
      message: `Successfully processed ${file.name}`,
      textLength: text.length,
      filename: file.name
    });

  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process file' },
      { status: 500 }
    );
  }
}
