import { GoogleGenerativeAI } from '@google/generative-ai';
import { streamText } from 'ai';
import { retrieveRelevantDocuments } from '@/lib/rag';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage.content;

    // Retrieve relevant documents from vector database
    const relevantDocs = await retrieveRelevantDocuments(userQuery, 5, 0.3);

    // Build context from retrieved documents
    let context = '';
    const sources: any[] = [];
    
    if (relevantDocs.length > 0) {
      context = '\n\nRelevant information from knowledge base:\n';
      relevantDocs.forEach((doc, idx) => {
        context += `\n[${idx + 1}] ${doc.content}`;
        sources.push({
          index: idx + 1,
          content: doc.content.substring(0, 100) + '...',
          similarity: doc.similarity,
          metadata: doc.metadata
        });
      });
    }

    // Create system prompt with RAG context
    const systemPrompt = `You are a helpful AI assistant. Answer the user's question based on the provided context from the knowledge base. 
    
If the context contains relevant information, use it to provide accurate answers and mention that the information comes from the knowledge base.
If the context doesn't contain relevant information, you can provide a general answer but mention that it's not from the specific knowledge base.

Always be helpful, concise, and accurate.${context}`;

    // Prepare messages for Gemini
    const geminiMessages = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Add system prompt as first user message
    geminiMessages.unshift({
      role: 'user',
      parts: [{ text: systemPrompt }]
    });

    // Get Gemini model (using gemini-1.5-flash-latest which is available)
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048,
      }
    });

    // Start chat with history
    const chat = model.startChat({
      history: geminiMessages.slice(0, -1),
    });

    // Stream the response
    const result = await chat.sendMessageStream(geminiMessages[geminiMessages.length - 1].parts[0].text);

    // Create a readable stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            controller.enqueue(encoder.encode(text));
          }
          
          // Add sources information at the end if available
          if (sources.length > 0) {
            const sourcesText = `\n\n---\n**Sources:** ${sources.length} relevant documents found`;
            controller.enqueue(encoder.encode(sourcesText));
          }
          
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Sources': JSON.stringify(sources),
      },
    });

  } catch (error: any) {
    console.error('Error in chat API:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'An error occurred' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
