# 🤖 RAG Chatbot with Next.js 14, Gemini AI & Supabase

A production-ready Retrieval-Augmented Generation (RAG) chatbot built with modern technologies. This chatbot can answer questions based on uploaded documents or a predefined knowledge base using vector similarity search.

## ✨ Features

- 🧠 **RAG Architecture** - Combines retrieval with LLM reasoning for accurate, contextual answers
- 🚀 **Real-time Streaming** - Chat responses stream in real-time using Vercel AI SDK
- 📚 **Vector Database** - Supabase with pgvector for efficient similarity search
- 📤 **File Upload** - Support for PDF and TXT file uploads with automatic embedding
- 🔐 **Authentication** - Secure user authentication with Supabase Auth
- 💾 **Chat History** - Saved conversation history for logged-in users
- 🎨 **Modern UI** - Beautiful, responsive interface built with TailwindCSS
- 🌓 **Dark Mode** - Full dark mode support with theme persistence
- ⚡ **Gemini Embeddings** - Fast, accurate embeddings using Google's Gemini model
- 🔄 **Smooth Animations** - Enhanced UX with Framer Motion

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: TailwindCSS + Framer Motion
- **AI SDK**: Vercel AI SDK
- **LLM**: Google Gemini 1.5 Flash
- **Embeddings**: Gemini text-embedding-004
- **Database**: Supabase (PostgreSQL + pgvector)
- **Language**: TypeScript

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A [Google AI API key](https://makersuite.google.com/app/apikey)
- A [Supabase account](https://supabase.com) with a new project

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

### 2. Set Up Supabase

1. Create a new project on [Supabase](https://app.supabase.com/)
2. **Enable Email Authentication**:
   - Go to **Authentication** → **Providers**
   - Enable **Email** provider
   - Configure email templates (optional)
3. Go to **SQL Editor** and run the contents of `supabase-setup.sql`
4. This will:
   - Enable the pgvector extension
   - Create the documents table
   - Create chat_sessions and chat_messages tables
   - Set up the similarity search function
   - Configure proper indexes and triggers

### 3. Configure Environment Variables

Copy the example env file and add your credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
GOOGLE_API_KEY=your_google_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Run the Development Server

```bash
npm run dev
```

```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Initialize Knowledge Base

Click the **"Init KB"** button in the header to populate the database with default FAQs.

## 📖 Usage

### Authentication (Optional)
- **Sign Up**: Create an account to save your chat history
- **Sign In**: Access your previous conversations
- **Guest Mode**: Use without signing in (history saved in browser only)

### Chat with the Bot
- Type your question and press Enter
- The bot retrieves relevant context and streams responses in real-time
- Logged-in users: conversations auto-save to Supabase

### Upload Documents
- Click the upload icon → drag & drop PDF/TXT files
- Files are automatically chunked and embedded

### Chat History (Logged-in Users)
- **View History**: Sidebar shows your recent conversations
- **Load Chat**: Click any conversation to resume
- **New Chat**: Start a fresh conversation
- **Delete**: Remove unwanted conversations

### Features
- **Auto-Save**: Chat history automatically saved for logged-in users
- **Dark Mode**: Toggle light/dark theme
- **Copy Messages**: Hover over AI messages to copy

## 🏗️ Project Structure

```
rag-chatbot/
├── app/
│   ├── api/
│   │   ├── chat/          # Chat endpoint with RAG
│   │   ├── upload/        # File upload
│   │   └── init-kb/       # KB initialization
│   ├── page.tsx           # Main chat interface
│   └── layout.tsx         # Root layout
├── components/            # UI components
├── lib/
│   ├── supabase.ts       # Supabase client
│   ├── rag.ts            # RAG utilities
│   └── fileUtils.ts      # File processing
└── supabase-setup.sql    # Database setup
```

## 🚢 Deployment

Deploy to Vercel:

```bash
vercel
```

Add these environment variables in your Vercel dashboard:
- `GOOGLE_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## � Troubleshooting

### PDF Upload Issues

**Problem**: PDF parsing fails with `@napi-rs/canvas` or module errors

**Solutions**:
1. **Use TXT files instead**: The easiest workaround is to convert PDFs to TXT
2. **Extract text manually**: Copy text from PDF and save as `.txt` file
3. **For development only**: PDF parsing works best on Linux/Mac; Windows may have dependency issues

The app fully supports TXT file uploads which work reliably on all platforms.

### Gemini API Errors

**Problem**: 404 errors or model not found

**Solution**: Ensure you're using the correct model name (`gemini-pro`) and have a valid API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Supabase Connection Issues

**Problem**: Database errors or embeddings not saving

**Solutions**:
1. Verify you ran the `supabase-setup.sql` script
2. Check your Supabase URL and anon key are correct
3. Ensure pgvector extension is enabled in Supabase

## 📝 License

MIT License

---

**Built with ❤️ using Next.js 14, Gemini AI, and Supabase**
