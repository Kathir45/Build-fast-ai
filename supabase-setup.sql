-- RAG Chatbot Database Setup for Supabase
-- Run this in your Supabase SQL Editor

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

-- Create chat_sessions table for storing conversation sessions
create table if not exists chat_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null default 'New Chat',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create chat_messages table for storing individual messages
create table if not exists chat_messages (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references chat_sessions(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for faster queries
create index if not exists chat_sessions_user_id_idx on chat_sessions(user_id);
create index if not exists chat_sessions_updated_at_idx on chat_sessions(updated_at desc);
create index if not exists chat_messages_session_id_idx on chat_messages(session_id);
create index if not exists chat_messages_created_at_idx on chat_messages(created_at);

-- Create function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger to auto-update updated_at
drop trigger if exists update_chat_sessions_updated_at on chat_sessions;
create trigger update_chat_sessions_updated_at
  before update on chat_sessions
  for each row
  execute function update_updated_at_column();

-- Create a function for similarity search
create or replace function match_documents (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
$$;

-- Grant necessary permissions (adjust if needed)
grant usage on schema public to anon, authenticated;
grant all on documents to anon, authenticated;
grant all on chat_sessions to anon, authenticated;
grant all on chat_messages to anon, authenticated;
grant execute on function match_documents to anon, authenticated;
grant execute on function update_updated_at_column to anon, authenticated;

-- Enable Row Level Security (RLS)
alter table chat_sessions enable row level security;
alter table chat_messages enable row level security;

-- RLS Policies for chat_sessions
-- Users can only see their own sessions (must be authenticated)
create policy "Users can view own chat sessions"
  on chat_sessions for select
  using (auth.uid() = user_id);

-- Users can insert their own sessions (must be authenticated)
create policy "Users can insert own chat sessions"
  on chat_sessions for insert
  with check (auth.uid() = user_id AND auth.uid() IS NOT NULL);

-- Users can update their own sessions (must be authenticated)
create policy "Users can update own chat sessions"
  on chat_sessions for update
  using (auth.uid() = user_id);

-- Users can delete their own sessions (must be authenticated)
create policy "Users can delete own chat sessions"
  on chat_sessions for delete
  using (auth.uid() = user_id);

-- RLS Policies for chat_messages
-- Users can view messages from their sessions (must be authenticated)
create policy "Users can view messages from own sessions"
  on chat_messages for select
  using (
    exists (
      select 1 from chat_sessions
      where chat_sessions.id = chat_messages.session_id
      and chat_sessions.user_id = auth.uid()
      and auth.uid() IS NOT NULL
    )
  );

-- Users can insert messages to their sessions (must be authenticated)
create policy "Users can insert messages to own sessions"
  on chat_messages for insert
  with check (
    auth.uid() IS NOT NULL
    AND exists (
      select 1 from chat_sessions
      where chat_sessions.id = chat_messages.session_id
      and chat_sessions.user_id = auth.uid()
    )
  );

-- Users can delete messages from their sessions (must be authenticated)
create policy "Users can delete messages from own sessions"
  on chat_messages for delete
  using (
    exists (
      select 1 from chat_sessions
      where chat_sessions.id = chat_messages.session_id
      and chat_sessions.user_id = auth.uid()
    )
  );
