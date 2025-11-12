import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Server-side client (for API routes)
export const supabase = createClient(supabaseUrl, supabaseKey);

// Client-side browser client (for client components)
export const createClient_Browser = () => {
  return createBrowserClient(supabaseUrl, supabaseKey);
};

// Initialize the documents table and pgvector extension
export async function initializeDatabase() {
  // This should be run once to set up the database
  // You can run this in Supabase SQL editor:
  /*
  -- Enable the pgvector extension
  create extension if not exists vector;

  -- Create documents table
  create table if not exists documents (
    id uuid default gen_random_uuid() primary key,
    content text not null,
    embedding vector(768),
    metadata jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Create an index for faster similarity search
  create index if not exists documents_embedding_idx on documents 
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

  -- Create chat_sessions and chat_messages tables
  -- See supabase-setup.sql for full schema
  */
}
