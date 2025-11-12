# 🚀 RAG Chatbot - AI-Powered Conversational Assistant

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-purple?style=for-the-badge&logo=google)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=for-the-badge&logo=supabase)

*A production-ready, full-featured RAG chatbot with authentication, chat history, and intelligent document processing*

### 🌐 **[Live Demo on Vercel →](https://your-app-name.vercel.app)**
> **Note**: After deploying to Vercel, update this link with your actual deployment URL

[Features](#-features) • [Screenshots](#-screenshots--demo) • [Setup](#-quick-start) • [Architecture](#-architecture--technical-details) • [Deploy](#-deployment-to-vercel)

</div>

---

## 📋 Project Overview

This is a **Retrieval-Augmented Generation (RAG) chatbot** that combines the power of Google's Gemini AI with vector-based document retrieval to provide intelligent, context-aware responses. Unlike traditional chatbots, this system can:

- **Learn from your documents** - Upload PDFs and text files to create a custom knowledge base
- **Provide accurate answers** - Retrieve relevant context before generating responses
- **Remember conversations** - Save and resume chat sessions across devices
- **Work for everyone** - Guest mode for quick use, authentication for persistent history

### 🎯 Key Highlights

- **Zero Hallucinations**: Answers are grounded in your uploaded documents
- **Real-time Streaming**: See responses as they're generated
- **Production Ready**: Built with enterprise-grade tools (Next.js 14, TypeScript, Supabase)
- **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- **Open Source**: MIT licensed and ready to customize

---

## ✨ Features

### 🤖 **Advanced AI Capabilities**
- **Gemini 1.5 Flash Integration** - Lightning-fast responses with Google's latest AI model
- **Real-time Streaming** - See responses as they're generated, token by token
- **RAG (Retrieval-Augmented Generation)** - Context-aware answers using vector similarity search
- **Smart Context Injection** - Automatically retrieves relevant documents to enhance responses
- **768-Dimensional Embeddings** - High-quality semantic understanding with text-embedding-004

### 📚 **Document Intelligence**
- **PDF & TXT Upload** - Drag-and-drop or click to upload documents
- **Automatic Text Extraction** - Intelligent parsing with chunking for large documents
- **Vector Storage** - Documents stored as embeddings in Supabase pgvector
- **Similarity Search** - IVFFlat index for fast, accurate document retrieval
- **Smart Chunking** - Configurable chunk sizes with overlap for context preservation
- **Default Knowledge Base** - 8 pre-loaded FAQs covering common topics

### � **Authentication & Security**
- **Supabase Auth** - Secure email/password authentication
- **Email Verification** - Optional email confirmation for new accounts
- **Row Level Security (RLS)** - Database-level security policies
- **Session Management** - Persistent sessions with automatic refresh
- **Protected Routes** - Middleware-based authentication flow
- **Guest Mode** - Try the chatbot without creating an account

### 💾 **Chat Management**
- **Persistent History** - Save all conversations to the database
- **Session Sidebar** - Browse and load up to 20 recent chats
- **Auto-save** - Messages automatically saved as you chat
- **Smart Titles** - Auto-generated titles from first message
- **Session Management** - Create, load, and delete chat sessions
- **Real-time Sync** - Instant updates via Supabase subscriptions
- **Dual Storage** - localStorage for guests, database for authenticated users

### 🎨 **Beautiful UI/UX**
- **Modern Design** - Clean, intuitive interface with Tailwind CSS 4
- **Dark Mode** - Toggle between light and dark themes with persistence
- **Framer Motion Animations** - Smooth, delightful transitions
- **Typing Indicators** - Animated dots while AI is thinking
- **Message Bubbles** - Distinct styling for user vs assistant messages
- **Copy to Clipboard** - One-click copying of AI responses
- **Responsive Layout** - Mobile-first design for all screen sizes
- **Loading States** - Visual feedback for all async operations

### � **Mobile Optimization**
- **Touch-Friendly** - Large tap targets and swipe gestures
- **Responsive Sidebar** - Floating button on mobile, sidebar on desktop
- **Full-Screen Modal** - Immersive chat experience on small screens
- **Adaptive Layout** - Optimized for phones, tablets, and desktops

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

### 📱 **Mobile Optimization**
- **Touch-Friendly** - Large tap targets and swipe gestures
- **Responsive Sidebar** - Floating button on mobile, sidebar on desktop
- **Full-Screen Modal** - Immersive chat experience on small screens
- **Adaptive Layout** - Optimized for phones, tablets, and desktops

### ⚡ **Performance & Scalability**
- **Edge Runtime Ready** - Optimized for Vercel Edge Functions
- **Streaming Responses** - Lower latency with progressive rendering
- **Efficient Chunking** - Memory-safe processing of large documents (up to 500KB)
- **IVFFlat Indexing** - Fast vector search with 100 lists
- **Smart Caching** - Theme and auth state persisted locally
- **Optimized Queries** - Database indexes on critical paths

---

## 📸 Screenshots & Demo

### 🎬 Live Demo
👉 **[Try it now on Vercel](https://build-fast-ai.vercel.app/)** 👈

### 💬 Chat Interface
![Chat Interface](https://github.com/Kathir45/Build-fast-ai/blob/main/Screenshot%202025-11-12%20164457.png)
*Real-time streaming responses with context-aware answers*

### 📄 Authentication
![Document Upload](https://github.com/Kathir45/Build-fast-ai/blob/main/Screenshot%202025-11-12%20164546.png)
*Drag-and-drop PDF/TXT files to build your knowledge base*

### 🌙 Dark Mode & Chat History
![Dark Mode](https://github.com/Kathir45/Build-fast-ai/blob/main/Screenshot%202025-11-12%20164713.png)
*Beautiful dark mode with persistent chat sessions*

### 📱 Mobile Responsive
![Mobile View](https://github.com/Kathir45/Build-fast-ai/blob/main/Screenshot%202025-11-12%20165212.png)
*Fully responsive design for all screen sizes*

> **Note**: Replace the placeholder image URLs above with actual screenshots from your deployed app

---

## 🏗️ Architecture & Technical Details

### RAG Pipeline Overview

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   User      │      │   Document   │      │   Vector    │
│   Query     │─────▶│   Retrieval  │─────▶│   Database  │
└─────────────┘      └──────────────┘      └─────────────┘
                            │                      │
                            │                      │
                            ▼                      ▼
                     ┌──────────────┐      ┌─────────────┐
                     │   Gemini AI  │◀─────│  Embeddings │
                     │   Generator  │      │   (768-dim) │
                     └──────────────┘      └─────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │   Streamed   │
                     │   Response   │
                     └──────────────┘
```

### Retrieval Method

**1. Document Ingestion**
- Files are uploaded and parsed (PDF via `pdf-parse`, TXT natively)
- Text is split into **500-character chunks** with **50-character overlap**
- Each chunk is embedded using **Gemini text-embedding-004** (768 dimensions)
- Embeddings stored in **Supabase pgvector** database

**2. Query Processing**
- User query is embedded using the same model
- **Cosine similarity search** finds top 5 most relevant chunks (threshold: 0.3)
- Uses **IVFFlat index** with 100 lists for fast retrieval (<100ms)

**3. Response Generation**
- Retrieved chunks are injected into the system prompt as context
- **Gemini 1.5 Flash** generates response with context awareness
- Response is **streamed token-by-token** using Vercel AI SDK
- Total latency: ~1-2 seconds for complete response

### Models Used

| Component | Model/Technology | Specs |
|-----------|-----------------|-------|
| **Chat Generation** | Gemini 1.5 Flash | Fast, cost-effective, streaming support |
| **Embeddings** | text-embedding-004 | 768 dimensions, latest Google model |
| **Vector Search** | pgvector (PostgreSQL) | IVFFlat index, cosine distance |
| **Database** | Supabase | PostgreSQL with pgvector extension |

### Tech Stack Deep Dive

**Frontend**
- **Next.js 14** - App Router with React Server Components
- **TypeScript 5** - Full type safety
- **Tailwind CSS 4** - Utility-first styling with custom theme
- **Framer Motion** - 60fps animations for messages and UI
- **React 19** - Latest features with concurrent rendering

**Backend**
- **Next.js API Routes** - Serverless endpoints
- **Vercel AI SDK** - Streaming chat responses
- **Google Generative AI** - Gemini API client
- **Supabase** - PostgreSQL, Auth, Real-time subscriptions

**Data Layer**
- **pgvector** - Vector similarity search
- **Row Level Security (RLS)** - User data isolation
- **Indexes** - IVFFlat on embeddings, B-tree on timestamps
- **Triggers** - Auto-update timestamps on session changes

### Security & Performance

- **Environment Variables** - API keys never exposed to client
- **Server-Side Auth** - Supabase SSR with cookie-based sessions
- **Edge Runtime Ready** - Can deploy to Vercel Edge Functions
- **Streaming Responses** - Lower perceived latency
- **Efficient Chunking** - Memory-safe processing (500KB max per file)
- **Database Pooling** - Connection reuse via Supabase

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:
- **Node.js 18+** and npm installed ([Download](https://nodejs.org/))
- **Supabase Account** ([Sign up for free](https://app.supabase.com/))
- **Google AI API Key** ([Get it here](https://makersuite.google.com/app/apikey))

### Step 1: Clone & Install

### Step 1: Clone & Install

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/Kathir45/Build-fast-ai.git
cd Build-fast-ai/rag-chatbot

# Install all dependencies
npm install
```

### Step 2: Database Setup (Supabase)

1. **Create a Supabase Project**
   - Go to [Supabase Dashboard](https://app.supabase.com/)
   - Click "New Project"
   - Note your project URL and anon key

2. **Run Database Migration**
   - In your Supabase dashboard, go to **SQL Editor**
   - Copy the entire contents of `supabase-setup.sql`
   - Paste and click "Run"
   - This will:
     - Enable pgvector extension
     - Create `documents` table with vector column
     - Create `chat_sessions` and `chat_messages` tables
     - Set up similarity search function
     - Add proper indexes and RLS policies

3. **Configure Authentication** (Optional)
   - Go to **Authentication** → **Providers** → **Email**
   - Toggle on "Enable Email provider"
   - (Optional) Disable "Confirm email" for faster testing

### Step 3: Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.local.example .env.local
```

Edit `.env.local` with your actual credentials:

```env
# Get from https://makersuite.google.com/app/apikey
GOOGLE_API_KEY=your_google_gemini_api_key_here

# Get from Supabase Dashboard → Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Step 4: Run the Development Server

```bash
# Start the Next.js dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser! 🎉

### Step 5: Initialize Knowledge Base

1. Click the **"Init KB"** button in the top navigation
2. This will populate the database with 8 default FAQ entries
3. You can now ask questions like "What is your return policy?"

---

## 🎯 Usage Guide

### Project Structure
```
rag-chatbot/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API Routes
│   │   ├── chat/                 # Streaming chat endpoint
│   │   ├── upload/               # File upload processor
│   │   ├── init-kb/              # Knowledge base initializer
│   │   └── chat-session/         # Save/load chat sessions
│   ├── auth/callback/            # Supabase auth callback
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Main chat interface
│   └── globals.css               # Global styles
├── components/                    # React Components
│   ├── ChatMessage.tsx           # Message bubble with copy
│   ├── ChatInput.tsx             # Input field with send
│   ├── ChatHistory.tsx           # Sidebar with sessions
│   ├── TypingIndicator.tsx       # Animated typing dots
│   ├── FileUpload.tsx            # Drag-and-drop upload
│   ├── ThemeToggle.tsx           # Dark mode toggle
│   ├── AuthButton.tsx            # Login/signup/profile
│   └── AuthModal.tsx             # Auth modal dialog
├── lib/                          # Utilities & Core Logic
│   ├── rag.ts                    # RAG engine & embeddings
│   ├── supabase.ts               # Supabase clients
│   └── fileUtils.ts              # PDF/TXT parsing
├── middleware.ts                 # Auth session refresh
├── supabase-setup.sql            # Complete DB schema
└── supabase-disable-rls.sql      # Quick RLS disable for testing
```

### Key Technologies

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework with App Router | 14.0.1 |
| **TypeScript** | Type-safe development | 5.x |
| **Gemini AI** | LLM for chat & embeddings | 1.5 Flash |
| **Supabase** | PostgreSQL + Auth + pgvector | Latest |
| **Tailwind CSS** | Utility-first styling | 4.x |
| **Framer Motion** | Animation library | 12.23.24 |
| **Vercel AI SDK** | Streaming chat responses | 5.0.92 |
| **pdf-parse** | PDF text extraction | 2.4.5 |

---

## 🎯 Usage Guide

### For Guests (No Account)
1. **Start Chatting** - Messages stored in browser localStorage
2. **Upload Documents** - Add PDFs/TXT files to the knowledge base
3. **Use Dark Mode** - Toggle theme in top-right corner
4. **Copy Responses** - Hover over messages to copy

### For Authenticated Users
1. **Sign Up** - Click "Sign Up" and create an account
2. **Verify Email** - Check your email (or skip if disabled in Supabase)
3. **Auto-Save** - Chats automatically saved to database
4. **Browse History** - Access past conversations from sidebar
5. **Multi-Device** - Chat history syncs across devices

### Document Upload Tips
- **Supported Formats**: PDF, TXT
- **Max Size**: 500KB (automatically truncated)
- **Best Practices**: 
  - Use TXT files for best compatibility on Windows
  - Break large documents into smaller chunks
  - Include relevant context in filenames (stored as metadata)

---

## � Configuration

### Customize RAG Parameters

Edit `lib/rag.ts`:

```typescript
// Chunk size for document splitting
const CHUNK_SIZE = 500;        // Characters per chunk
const CHUNK_OVERLAP = 50;      // Overlap between chunks

// Similarity search settings
const MATCH_THRESHOLD = 0.3;   // Minimum similarity score (0-1)
const MATCH_COUNT = 5;         // Top K results to retrieve
```

### Customize AI Behavior

Edit `app/api/chat/route.ts`:

```typescript
const systemPrompt = `You are a helpful AI assistant...`;
```

### Disable Email Confirmation

In Supabase Dashboard:
1. **Authentication** → **Providers** → **Email**
2. Toggle off "**Confirm email**"
3. Users can now sign in immediately

---

## 🛠️ Troubleshooting

### PDF Upload Issues (Windows)
**Error**: `ENOENT: no such file or directory`

**Solution**: The `pdf-parse` library has known issues on Windows. Options:
1. Upload TXT files instead (recommended)
2. Convert PDFs to text online first
3. The error is now handled gracefully with helpful messages

### RLS (Row Level Security) Errors
**Error**: `new row violates row-level security policy`

**Quick Fix**: Run `supabase-disable-rls.sql` in Supabase SQL Editor

**Proper Fix**: Ensure you've run the complete `supabase-setup.sql` script

### Authentication Not Working
1. Check `.env.local` has correct Supabase URL and anon key
2. Verify redirect URL in Supabase: `http://localhost:3000/auth/callback`
3. Check middleware is running (should see logs in terminal)

### Blank Page
1. Check browser console for errors
2. Ensure all environment variables are set
3. Restart dev server: `npm run dev`
4. Clear browser cache and localStorage

---

## �🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/rag-chatbot)

**Manual Deployment**:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Then deploy to production
vercel --prod
```

### Environment Variables on Vercel
Add these in **Settings** → **Environment Variables**:
- `GOOGLE_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Update Supabase Redirect URLs
In Supabase Dashboard → **Authentication** → **URL Configuration**:
- Add your production URL: `https://your-app.vercel.app/auth/callback`

---

## 📚 Additional Resources

- **[FEATURES.md](./FEATURES.md)** - Complete feature list with technical details
- **[AUTH-FEATURES.md](./AUTH-FEATURES.md)** - Authentication system documentation
- **[SETUP.md](./SETUP.md)** - Detailed setup instructions
- **[DEV-GUIDE.md](./DEV-GUIDE.md)** - Development and contribution guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide
- **[PROJECT-SUMMARY.md](./PROJECT-SUMMARY.md)** - Architecture overview

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini** for powerful AI capabilities
- **Supabase** for seamless backend infrastructure
- **Vercel** for Next.js and hosting platform
- **Tailwind CSS** for beautiful styling
- **Framer Motion** for delightful animations

---

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/kathir45/rag-chatbot/issues)
- **Discussions**: [GitHub Discussions](https://github.com/kathir45/rag-chatbot/discussions)
- **Email**: kathirselvam05@gmail.com

---

<div align="center">

**Built with ❤️ using Next.js, Gemini AI, and Supabase**

[⭐ Star this repo](https://github.com/kathir45/rag-chatbot) • [🐛 Report Bug](https://github.com/kathir45/rag-chatbot/issues) • [✨ Request Feature](https://github.com/kathir45/rag-chatbot/issues)

</div>
