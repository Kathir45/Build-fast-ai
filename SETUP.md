# 🚀 Quick Setup Guide

Follow these steps to get your RAG Chatbot up and running!

## Step 1: Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Get API Key"
3. Create a new API key or use an existing one
4. Copy the API key

## Step 2: Set Up Supabase

### Create a Project

1. Go to [Supabase](https://app.supabase.com/)
2. Click "New Project"
3. Fill in:
   - **Project Name**: `rag-chatbot` (or your choice)
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to you
4. Click "Create new project" and wait 2-3 minutes

### Get Your Credentials

1. In your project dashboard, click the **Settings** icon (bottom left)
2. Go to **API** section
3. Copy these values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

### Set Up the Database

1. In your Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click "New query"
3. Open the `supabase-setup.sql` file from this project
4. Copy all the SQL code and paste it into the query editor
5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

This creates:
- The pgvector extension
- A `documents` table for storing embeddings
- A similarity search function
- Proper indexes for fast queries

## Step 3: Configure Environment Variables

1. Open the `.env.local` file in this project
2. Add your credentials:

```env
# Paste your Gemini API key here
GOOGLE_API_KEY=AIzaSy...your-key-here

# Paste your Supabase URL here
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co

# Paste your Supabase anon key here
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key-here
```

## Step 4: Install Dependencies & Run

```bash
# Install all dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 5: Initialize Knowledge Base

1. In the app, click the **"Init KB"** button in the top-right header
2. Wait for the success message
3. You're ready to chat!

## ✅ Verification

Test that everything works:

1. **Test Chat**: Ask "What is your return policy?"
   - You should get a response about the 30-day return policy

2. **Test Upload**: 
   - Click the upload icon
   - Upload a TXT or PDF file
   - Ask a question about the file content

3. **Test Dark Mode**: Click the sun/moon icon

## 🔧 Troubleshooting

### "Failed to fetch" error
- Check that your `.env.local` file has all three variables filled in
- Restart the dev server (`Ctrl+C` then `npm run dev`)

### "Supabase error" messages
- Make sure you ran the `supabase-setup.sql` script
- Check that your Supabase URL and key are correct
- Verify the pgvector extension is enabled (check in Supabase > Database > Extensions)

### "Gemini API error"
- Verify your API key is correct
- Check you have quota available at [Google AI Studio](https://makersuite.google.com/)
- Make sure the Gemini API is enabled

### File upload not working
- Check file size (keep under 10MB)
- Only PDF and TXT files are supported
- Check browser console (F12) for detailed errors

## 📚 Next Steps

- Customize the default knowledge base in `lib/rag.ts`
- Adjust chunk sizes and similarity thresholds
- Add more file type support
- Customize the UI colors and styling

## 🎉 You're All Set!

Your RAG Chatbot is now ready to use. Start chatting and exploring!

For more details, see the main [README.md](README.md)
