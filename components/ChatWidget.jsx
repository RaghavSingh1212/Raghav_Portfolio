"use client";
import { useState } from "react";
import { FaComments } from "react-icons/fa";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { role: "ai", content: data.reply }]);
    } catch (e) {
      setMessages((msgs) => [...msgs, { role: "ai", content: "Sorry, there was an error." }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "What are your main skills?",
    "Tell me about your experience",
    "What projects have you worked on?",
    "What's your background in AI?",
    "What are your career goals?"
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
    // Auto-send the question
    setTimeout(() => {
      setMessages((msgs) => [...msgs, { role: "user", content: question }]);
      setInput("");
      setLoading(true);
      
      fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question })
      })
      .then(res => res.json())
      .then(data => {
        setMessages((msgs) => [...msgs, { role: "ai", content: data.reply }]);
        setLoading(false);
      })
      .catch(e => {
        setMessages((msgs) => [...msgs, { role: "ai", content: "Sorry, there was an error." }]);
        setLoading(false);
      });
    }, 100);
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <button
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-3 sm:p-5 rounded-full shadow-lg border-2 border-transparent bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-500 hover:to-cyan-400 transition"
        onClick={() => setOpen(true)}
        aria-label="Open chat"
      >
        <FaComments size={24} className="sm:w-10 sm:h-10" color="#fff" />
      </button>

      {/* Chat Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/30">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-t-2xl shadow-xl w-full max-w-sm p-3 sm:p-4 m-2 sm:m-6 relative flex flex-col max-h-[80vh] border border-gray-700">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-2 text-white">Ask me anything about Raghav!</h2>
            <div className="flex-1 overflow-y-auto mb-2 bg-gray-800/80 rounded p-2">
              {messages.length === 0 && (
                <div className="text-gray-400 text-sm space-y-3">
                  <div>💡 Quick questions:</div>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="text-xs bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 px-2 py-1 rounded transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={msg.role === "user" ? "text-right mb-2" : "text-left mb-2"}>
                  <span className={msg.role === "user"
                    ? "inline-block bg-cyan-700/80 text-white px-3 py-1 rounded-lg"
                    : "inline-block bg-gray-700/80 text-white px-3 py-1 rounded-lg"}>
                    {msg.content}
                  </span>
                </div>
              ))}
              {loading && <div className="text-gray-400 text-xs">Thinking...</div>}
            </div>
            <div className="flex gap-2 mt-2">
              <textarea
                className="flex-1 border border-gray-600 bg-gray-900 text-white rounded p-2 text-sm resize-none focus:outline-none focus:ring focus:ring-cyan-500/40"
                rows={1}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                disabled={loading}
              />
              <button
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded font-bold disabled:opacity-50"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 