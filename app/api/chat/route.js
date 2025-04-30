import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
    // Parse the request body to get messages
    const { messages } = await req.json();

    // Create a streaming text response using Groq
    const result = streamText({
        model: groq('llama3-70b-8192'),
        messages,
    });

    // Return the streaming response
    return result.toStreamingResponse();
} 