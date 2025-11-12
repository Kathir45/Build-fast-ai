-- Temporary: Disable RLS for testing
-- Run this in your Supabase SQL Editor if you're having RLS issues

-- Disable RLS on chat tables
alter table chat_sessions disable row level security;
alter table chat_messages disable row level security;

-- Note: For production, you should re-enable RLS and use proper policies
-- See supabase-setup.sql for the full RLS policies
