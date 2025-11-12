import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from './supabase';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// Generate embeddings using Gemini
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

// Store document with embedding in Supabase
export async function storeDocument(content: string, metadata?: any) {
  try {
    const embedding = await generateEmbedding(content);
    
    const { data, error } = await supabase
      .from('documents')
      .insert({
        content,
        embedding,
        metadata: metadata || {}
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error storing document:', error);
    throw error;
  }
}

// Retrieve relevant documents using similarity search
export async function retrieveRelevantDocuments(
  query: string,
  limit: number = 5,
  threshold: number = 0.5
): Promise<{ content: string; similarity: number; metadata?: any }[]> {
  try {
    const queryEmbedding = await generateEmbedding(query);

    // Use Supabase RPC for similarity search
    const { data, error } = await supabase.rpc('match_documents', {
      query_embedding: queryEmbedding,
      match_threshold: threshold,
      match_count: limit
    });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error retrieving documents:', error);
    // Fallback: return empty array if no documents found
    return [];
  }
}

// Chunk large text into smaller pieces
export function chunkText(text: string, chunkSize: number = 500, overlap: number = 50): string[] {
  const chunks: string[] = [];
  let start = 0;
  const maxChunks = 1000; // Limit to prevent memory issues
  
  // Validate inputs
  if (chunkSize <= 0 || overlap < 0 || overlap >= chunkSize) {
    throw new Error('Invalid chunk parameters');
  }
  
  // Limit text size to prevent memory issues (max ~500KB)
  const maxTextLength = 500000;
  if (text.length > maxTextLength) {
    console.warn(`Text too long (${text.length} chars), truncating to ${maxTextLength}`);
    text = text.substring(0, maxTextLength);
  }

  while (start < text.length && chunks.length < maxChunks) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.slice(start, end));
    start = end - overlap;
    
    if (start >= text.length) break;
  }
  
  if (chunks.length >= maxChunks) {
    console.warn(`Reached maximum chunk limit of ${maxChunks}`);
  }

  return chunks;
}

// Store multiple chunks with embeddings
export async function storeDocumentChunks(
  text: string,
  metadata?: any,
  chunkSize: number = 500
) {
  const chunks = chunkText(text, chunkSize);
  const results = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunkMetadata = {
      ...metadata,
      chunkIndex: i,
      totalChunks: chunks.length
    };
    
    const result = await storeDocument(chunks[i], chunkMetadata);
    results.push(result);
  }

  return results;
}

// Default knowledge base - Sample FAQs
export const defaultKnowledge = [
  {
    content: "Our company offers 24/7 customer support through multiple channels including email, phone, and live chat. Response times are typically under 2 hours for email and immediate for chat during business hours.",
    metadata: { category: "support", topic: "customer-service" }
  },
  {
    content: "We have a 30-day return policy for all products. Items must be in original condition with tags attached. Refunds are processed within 5-7 business days after we receive the returned item.",
    metadata: { category: "policy", topic: "returns" }
  },
  {
    content: "Shipping is free for orders over $50. Standard shipping takes 3-5 business days, while express shipping delivers in 1-2 business days. International shipping is available to over 100 countries.",
    metadata: { category: "shipping", topic: "delivery" }
  },
  {
    content: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All transactions are encrypted and secure. We do not store your credit card information on our servers.",
    metadata: { category: "payment", topic: "methods" }
  },
  {
    content: "Our products come with a 1-year warranty covering manufacturing defects. Extended warranty options are available at checkout. Warranty claims can be filed through our customer portal.",
    metadata: { category: "policy", topic: "warranty" }
  },
  {
    content: "Account registration is free and takes less than 2 minutes. Registered users get exclusive benefits including early access to sales, loyalty points, and personalized recommendations.",
    metadata: { category: "account", topic: "registration" }
  },
  {
    content: "We use industry-standard encryption to protect your personal data. Your information is never shared with third parties without your consent. You can request data deletion at any time.",
    metadata: { category: "privacy", topic: "data-protection" }
  },
  {
    content: "Track your order using the tracking number sent to your email. Real-time updates are available in your account dashboard. You'll receive notifications at each shipping milestone.",
    metadata: { category: "shipping", topic: "tracking" }
  }
];

// Initialize default knowledge base
export async function initializeDefaultKnowledge() {
  try {
    for (const item of defaultKnowledge) {
      await storeDocument(item.content, item.metadata);
    }
    console.log('Default knowledge base initialized');
  } catch (error) {
    console.error('Error initializing knowledge base:', error);
  }
}
