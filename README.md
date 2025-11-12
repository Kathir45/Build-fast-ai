# 🚀 RAG Chatbot - AI-Powered Conversational Assistant

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-purple?style=for-the-badge&logo=google)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=for-the-badge&logo=supabase)

*A production-ready, full-featured RAG chatbot with authentication, chat history, and intelligent document processing*

[Features](#-features) • [Demo](#-demo) • [Quick Start](#-quick-start) • [Documentation](#-documentation)

</div>

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

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Supabase Account** (free tier works!)
- **Google AI API Key** ([Get it here](https://makersuite.google.com/app/apikey))

### 1️⃣ Clone & Install

```bash
git clone https://github.com/yourusername/rag-chatbot.git
cd rag-chatbot
npm install
```

### 2️⃣ Environment Setup

Create `.env.local` in the root directory:

```bash
# Gemini API Key
GOOGLE_API_KEY=your_google_api_key_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3️⃣ Database Setup

1. Go to your Supabase dashboard → **SQL Editor**
2. Run the complete setup script from `supabase-setup.sql`
3. (Optional) Disable email confirmation in **Authentication** → **Providers** → **Email**

### 4️⃣ Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start chatting! 🎉

---

## 📖 Documentation

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

- **Issues**: [GitHub Issues](https://github.com/yourusername/rag-chatbot/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/rag-chatbot/discussions)
- **Email**: your.email@example.com

---

<div align="center">

**Built with ❤️ using Next.js, Gemini AI, and Supabase**

[⭐ Star this repo](https://github.com/yourusername/rag-chatbot) • [🐛 Report Bug](https://github.com/yourusername/rag-chatbot/issues) • [✨ Request Feature](https://github.com/yourusername/rag-chatbot/issues)

</div>
