import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message || message.trim() === "") {
      return NextResponse.json({
        reply:
          "Hi! I’m here to help people learn about Raghav Singh. What would you like to know?",
      });
    }

    const filePath = path.join(process.cwd(), "lib", "raghav_context.txt");
    const RAG_CONTEXT = await fs.readFile(filePath, "utf-8");

    const prompt = `
You are a portfolio assistant for Raghav Singh.
Answer questions using ONLY the information in the context below.
If the answer is not explicitly stated in the context, say:
"I don't know based on the provided information."

CONTEXT:
${RAG_CONTEXT}

USER QUESTION:
${message}

ANSWER:
`;

    const ollamaRes = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt,
        stream: false,
        options: {
          temperature: 0.4,
          top_p: 0.9,
          num_predict: 250,
        },
      }),
    });

    if (!ollamaRes.ok) {
      const text = await ollamaRes.text();
      throw new Error(`Ollama error ${ollamaRes.status}: ${text}`);
    }

    const data = await ollamaRes.json();
    let reply = (data.response || "").trim();

    if (!reply) throw new Error("No response from Ollama");

    reply = reply.replace(/^(AI|Assistant|Bot):\s*/i, "");

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { reply: "Chat server error. Check console logs." },
      { status: 500 }
    );
  }
}
