export async function extractTextFromPDF(fileBuffer: Buffer): Promise<string> {
  try {
    // Import the core pdf-parse library directly to bypass the debug code in index.js
    // @ts-ignore - pdf-parse doesn't have TypeScript types
    const pdfParse = require('pdf-parse/lib/pdf-parse.js');
    
    // Call the parser with the buffer
    const data = await pdfParse(fileBuffer);
    
    if (!data || !data.text) {
      throw new Error('No text content extracted from PDF');
    }
    
    return data.text.trim();
  } catch (error: any) {
    console.error('PDF parsing error:', error);
    
    // Provide helpful error messages
    if (error.code === 'ENOENT') {
      throw new Error(`File not found: ${error.path}`);
    }
    
    if (error.message?.includes('@napi-rs/canvas') || error.message?.includes('Cannot find module')) {
      throw new Error('PDF parsing dependencies missing. Please try reinstalling: npm install pdf-parse');
    }
    
    throw new Error(`PDF parsing failed: ${error.message || 'Unknown error'}`);
  }
}

export async function extractTextFromFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  
  if (file.type === 'application/pdf') {
    return extractTextFromPDF(buffer);
  } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
    return buffer.toString('utf-8');
  } else {
    throw new Error('Unsupported file type. Please upload PDF or TXT files.');
  }
}
