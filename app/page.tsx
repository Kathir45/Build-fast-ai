'use client';

import { useState, useEffect, useRef } from 'react';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import TypingIndicator from '@/components/TypingIndicator';
import FileUpload from '@/components/FileUpload';
import ThemeToggle from '@/components/ThemeToggle';
import AuthButton from '@/components/AuthButton';
import ChatHistory from '@/components/ChatHistory';
import { createClient_Browser } from '@/lib/supabase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [kbInitialized, setKbInitialized] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const supabase = createClient_Browser();

  // Check authentication status
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        // User logged out - clear session
        setCurrentSessionId(null);
        loadLocalHistory();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load chat history from localStorage for non-authenticated users
  const loadLocalHistory = () => {
    const saved = localStorage.getItem('chatHistory');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([]);
    }
  };

  // Initial load
  useEffect(() => {
    if (!user) {
      loadLocalHistory();
    }
  }, []);

  // Save to localStorage for non-authenticated users
  useEffect(() => {
    if (!user && messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages, user]);

  // Save to Supabase for authenticated users
  useEffect(() => {
    if (user && messages.length > 0) {
      saveChatSession();
    }
  }, [messages, user]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const saveChatSession = async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/chat-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: currentSessionId,
          messages,
        }),
      });

      if (!response.ok) {
        console.error('Error saving chat session:', await response.text());
        return;
      }

      const data = await response.json();
      
      if (data.session_id && !currentSessionId) {
        setCurrentSessionId(data.session_id);
      }
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const loadChatSession = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/chat-session?session_id=${sessionId}`);
      const data = await response.json();

      if (data.messages) {
        setMessages(data.messages.map((m: any) => ({
          role: m.role,
          content: m.content,
        })));
        setCurrentSessionId(sessionId);
      }
    } catch (error) {
      console.error('Error loading session:', error);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentSessionId(null);
    if (!user) {
      localStorage.removeItem('chatHistory');
    }
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          assistantMessage += chunk;
          
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            
            if (lastMessage?.role === 'assistant') {
              newMessages[newMessages.length - 1] = {
                role: 'assistant',
                content: assistantMessage
              };
            } else {
              newMessages.push({
                role: 'assistant',
                content: assistantMessage
              });
            }
            
            return newMessages;
          });
        }
      }
    } catch (error: any) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadSuccess = (message: string) => {
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: message
    }]);
    setShowUpload(false);
  };

  const initializeKnowledgeBase = async () => {
    try {
      const response = await fetch('/api/init-kb', { method: 'POST' });
      const data = await response.json();
      
      if (response.ok) {
        setKbInitialized(true);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: '✅ Knowledge base initialized with default FAQs. You can now ask me questions!'
        }]);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error: any) {
      alert(`Failed to initialize: ${error.message}`);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Chat History Sidebar - only show for authenticated users */}
      {user && (
        <ChatHistory
          onLoadSession={loadChatSession}
          onNewChat={handleNewChat}
          currentSessionId={currentSessionId}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    RAG Chatbot
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Powered by Gemini AI {user && '• Logged In'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowUpload(!showUpload)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                    hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title="Upload documents"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </button>
                
                {!kbInitialized && (
                  <button
                    onClick={initializeKnowledgeBase}
                    className="px-4 py-2 text-sm font-medium bg-green-500 hover:bg-green-600 
                      text-white rounded-lg transition-colors"
                  >
                    Init KB
                  </button>
                )}
                
                {user && (
                  <button
                    onClick={handleNewChat}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                      hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors hidden lg:block"
                    title="New chat"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                )}
                
                <ThemeToggle />
                <AuthButton />
              </div>
            </div>
          </div>
        </header>

        {/* File Upload Area */}
        {showUpload && (
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
            <div className="max-w-4xl mx-auto">
              <FileUpload onUploadSuccess={handleUploadSuccess} />
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl 
                  flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome to RAG Chatbot
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  Ask me anything! I can answer questions based on the knowledge base or uploaded documents.
                  {!user && ' Sign in to save your chat history.'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
                  {[
                    { title: '📚 Knowledge Base', desc: 'I have access to FAQs and documents' },
                    { title: '📤 Upload Files', desc: 'Upload PDFs or text files for me to learn' },
                    { title: '💬 Natural Chat', desc: 'Have a conversation in natural language' },
                    { title: user ? '💾 Auto-Save' : '🔍 Smart Search', 
                      desc: user ? 'Your chats are automatically saved' : 'I find relevant info using vector search' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="font-semibold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} index={index} />
            ))}
            
            {isLoading && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
