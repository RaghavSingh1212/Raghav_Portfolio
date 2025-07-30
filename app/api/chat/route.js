import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message || message.trim() === '') {
      return NextResponse.json({ 
        reply: "Hi! I'm here to help you learn more about Raghav Singh. What would you like to know about him?" 
      });
    }

    // Read your context from a text file
    const filePath = path.join(process.cwd(), 'lib', 'raghav_context.txt');
    const RAG_CONTEXT = await fs.readFile(filePath, 'utf-8');

    // Enhanced prompt engineering for better responses
    const enhancedPrompt = `You are an AI assistant that helps people learn about Raghav Singh, a software engineer and AI enthusiast. 

Here is detailed information about Raghav:

${RAG_CONTEXT}

IMPORTANT INSTRUCTIONS:
1. Always respond in a friendly, professional, and enthusiastic manner
2. Be specific and detailed when discussing Raghav's skills, experience, and achievements
3. Use concrete examples from his background when relevant
4. If asked about technical topics, relate them to Raghav's expertise
5. If asked for advice or recommendations, provide thoughtful insights based on his experience
6. Keep responses conversational but informative
7. If you don't have specific information about something, say so honestly
8. Always maintain a positive and enthusiastic tone about Raghav's work and potential

User Question: ${message}

Please provide a helpful, detailed response about Raghav based on the information above:`;

    const ollamaRes = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt: enhancedPrompt,
        stream: false,
        options: {
          temperature: 0.7, // Slightly creative but focused
          top_p: 0.9,
          max_tokens: 500 // Reasonable response length
        }
      })
    });

    if (!ollamaRes.ok) {
      throw new Error(`Ollama API error: ${ollamaRes.status}`);
    }

    const data = await ollamaRes.json();
    
    if (!data.response) {
      throw new Error('No response from Ollama API');
    }

    // Clean up the response
    let reply = data.response.trim();
    
    // Remove any system-like prefixes if they appear
    reply = reply.replace(/^(AI|Assistant|Bot):\s*/i, '');
    
    // Ensure the response is not too long
    if (reply.length > 1000) {
      reply = reply.substring(0, 1000) + '...';
    }

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Provide helpful fallback responses based on common questions
    const fallbackResponses = {
      'skills': "Raghav is a skilled software engineer with expertise in React, Next.js, TypeScript, Python, and AI/ML technologies. He's particularly strong in full-stack development and has experience with Docker, Prometheus, Grafana, and various AI frameworks.",
      'experience': "Raghav has worked at several impressive companies including Scale AI (GenAI Intern), Nutanix (Software Engineer Co-Op), and UCSC Blueprint (Web Developer). He's also an undergraduate researcher at AIEA Lab working on AI and machine learning projects.",
      'education': "Raghav is currently pursuing his B.S. in Computer Science at UC Santa Cruz, where he's also a Group Tutor at the Baskin School of Engineering helping other students learn programming.",
      'projects': "Raghav has worked on various projects including a career matching platform for UCSC Blueprint, AI-powered applications, and performance monitoring systems. He's also active in hackathons and open source projects.",
      'ai': "Raghav is deeply passionate about AI and machine learning. He's currently working on LLM optimization at Scale AI, researching Transformer models at AIEA Lab, and has experience with AI inference optimization and data pipelines."
    };

    // Try to match the user's question to a fallback response
    const userMessage = req.body?.message?.toLowerCase() || '';
    let fallbackReply = "I'm having trouble connecting right now, but I'd be happy to tell you about Raghav! He's a software engineer and AI enthusiast with experience at companies like Scale AI and Nutanix. What specific aspect would you like to know more about?";

    for (const [key, response] of Object.entries(fallbackResponses)) {
      if (userMessage.includes(key)) {
        fallbackReply = response;
        break;
      }
    }

    return NextResponse.json({ reply: fallbackReply });
  }
} 