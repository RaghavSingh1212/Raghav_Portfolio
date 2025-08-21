"use client";
import { useState, useEffect, useRef } from "react";
import { FaComments, FaRobot, FaUser, FaLightbulb, FaCode, FaGraduationCap, FaBriefcase, FaHeart, FaThumbsUp, FaTimes, FaPaperPlane, FaMicrophone } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Advanced conversation suggestions based on context
  const conversationSuggestions = [
    {
      icon: <FaCode className="text-blue-400" />,
      text: "Tell me about your AI projects",
      category: "projects"
    },
    {
      icon: <FaBriefcase className="text-green-400" />,
      text: "What's your experience at Scale AI?",
      category: "experience"
    },
    {
      icon: <FaLightbulb className="text-yellow-400" />,
      text: "What are your career goals?",
      category: "goals"
    },
    {
      icon: <FaGraduationCap className="text-purple-400" />,
      text: "What skills are you learning?",
      category: "skills"
    },
    {
      icon: <FaHeart className="text-red-400" />,
      text: "What are your hobbies?",
      category: "personal"
    },
    {
      icon: <FaRobot className="text-cyan-400" />,
      text: "How do you stay updated with AI?",
      category: "ai"
    }
  ];

  // Project cards for interactive responses
  const projectCards = {
    "career matching": {
      title: "Career Matching Platform",
      description: "Built with React and Firebase for UCSC Blueprint",
      tech: ["React", "Firebase", "JavaScript"],
      impact: "Helped 100+ students find career opportunities",
      link: "https://github.com/RaghavSingh1212"
    },
    "ai optimization": {
      title: "AI Inference Optimization",
      description: "Performance improvements at Scale AI and Nutanix",
      tech: ["Python", "LLMs", "SIMD", "Prometheus"],
      impact: "30-40% performance improvements",
      link: "https://github.com/RaghavSingh1212"
    },
    "monitoring": {
      title: "Performance Monitoring System",
      description: "Real-time dashboards with Prometheus/Grafana",
      tech: ["Prometheus", "Grafana", "Docker", "FastAPI"],
      impact: "Real-time system monitoring and alerting",
      link: "https://github.com/RaghavSingh1212"
    }
  };

  const sendMessage = async (messageText = input) => {
    if (!messageText.trim()) return;
    
    const userMsg = { 
      role: "user", 
      content: messageText,
      timestamp: new Date(),
      id: Date.now()
    };
    
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: messageText,
          chatHistory: chatHistory.slice(-5) // Send last 5 messages for context
        })
      });
      
      const data = await res.json();
      
      // Check if response contains project keywords
      const projectKeywords = Object.keys(projectCards);
      const hasProject = projectKeywords.some(keyword => 
        data.reply.toLowerCase().includes(keyword)
      );

      const aiMsg = { 
        role: "ai", 
        content: data.reply,
        timestamp: new Date(),
        id: Date.now() + 1,
        hasProject,
        projectType: hasProject ? projectKeywords.find(keyword => 
          data.reply.toLowerCase().includes(keyword)
        ) : null
      };
      
      setMessages((msgs) => [...msgs, aiMsg]);
      setChatHistory(prev => [...prev, userMsg, aiMsg]);
      
      // Generate new suggestions based on the conversation
      generateSuggestions(data.reply);
      
    } catch (e) {
      const errorMsg = { 
        role: "ai", 
        content: "Sorry, I'm having trouble connecting right now. But I'd be happy to tell you about Raghav! He's a software engineer and AI enthusiast with experience at companies like Scale AI and Nutanix.",
        timestamp: new Date(),
        id: Date.now() + 1
      };
      setMessages((msgs) => [...msgs, errorMsg]);
    }
    
    setLoading(false);
    setIsTyping(false);
  };

  const generateSuggestions = (lastResponse) => {
    const responseLower = lastResponse.toLowerCase();
    let newSuggestions = [];

    if (responseLower.includes("project") || responseLower.includes("work")) {
      newSuggestions = [
        "Can you show me the code?",
        "What technologies did you use?",
        "What challenges did you face?"
      ];
    } else if (responseLower.includes("skill") || responseLower.includes("technology")) {
      newSuggestions = [
        "How did you learn that?",
        "What's your favorite technology?",
        "Any tips for beginners?"
      ];
    } else if (responseLower.includes("experience") || responseLower.includes("company")) {
      newSuggestions = [
        "What was your biggest achievement?",
        "What did you learn there?",
        "How was the team culture?"
      ];
    } else {
      newSuggestions = [
        "Tell me more about that",
        "What's next for you?",
        "Any advice for someone starting out?"
      ];
    }

    setSuggestions(newSuggestions);
  };

  const handleQuickQuestion = (question) => {
    sendMessage(question);
  };

  const handleSuggestion = (suggestion) => {
    sendMessage(suggestion);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const addReaction = (messageId, reaction) => {
    setMessages(msgs => 
      msgs.map(msg => 
        msg.id === messageId 
          ? { ...msg, reaction: reaction }
          : msg
      )
    );
  };

  const ProjectCard = ({ projectType }) => {
    const project = projectCards[projectType];
    if (!project) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30 rounded-lg p-4 mt-3"
      >
        <div className="flex items-center gap-2 mb-2">
          <FaCode className="text-blue-400" />
          <h4 className="font-bold text-blue-300">{project.title}</h4>
        </div>
        <p className="text-gray-300 text-sm mb-2">{project.description}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {project.tech.map((tech, index) => (
            <span key={index} className="bg-blue-800/50 text-blue-200 text-xs px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>
        <p className="text-green-300 text-xs mb-2">💡 {project.impact}</p>
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 text-xs hover:text-blue-300 transition-colors"
        >
          View Project →
        </a>
      </motion.div>
    );
  };

  const TypingIndicator = () => (
    <motion.div 
      className="flex items-center gap-2 text-gray-400 text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex gap-1">
        <motion.div
          className="w-2 h-2 bg-cyan-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="w-2 h-2 bg-cyan-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="w-2 h-2 bg-cyan-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
        />
      </div>
      <span>Raghav is typing...</span>
    </motion.div>
  );

  return (
    <>
      {/* Enhanced Floating Chat Icon */}
      <motion.button
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-3 sm:p-5 rounded-full shadow-lg border-2 border-transparent bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 hover:scale-110"
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaComments size={24} className="sm:w-10 sm:h-10" color="#fff" />
        {messages.length > 0 && (
          <motion.div
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {messages.length}
          </motion.div>
        )}
      </motion.button>

      {/* Enhanced Chat Modal */}
      <AnimatePresence>
        {open && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-end justify-end bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-t-2xl shadow-2xl w-full max-w-md p-4 m-2 sm:m-6 relative flex flex-col max-h-[85vh] border border-gray-700"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <FaRobot className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Chat with Raghav</h2>
                    <p className="text-xs text-gray-400">AI Assistant</p>
                  </div>
                </div>
                <button
                  className="text-gray-400 hover:text-white text-2xl transition-colors"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto mb-4 bg-gray-800/50 rounded-lg p-3 space-y-3">
                {messages.length === 0 && (
                  <motion.div 
                    className="text-center space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="text-gray-400 text-sm">
                      <p className="mb-3">👋 Hi! I'm here to tell you about Raghav Singh.</p>
                      <p className="mb-4">Ask me anything about his skills, experience, projects, or career goals!</p>
                    </div>
                    
                    {/* Conversation Starters */}
                    <div className="grid grid-cols-1 gap-2">
                      {conversationSuggestions.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleQuickQuestion(suggestion.text)}
                          className="flex items-center gap-3 p-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 text-left rounded-lg transition-all duration-200 hover:scale-105"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {suggestion.icon}
                          <span className="text-sm">{suggestion.text}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {messages.map((msg, i) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.role === "user" 
                        ? "bg-gradient-to-r from-blue-500 to-purple-500" 
                        : "bg-gradient-to-r from-cyan-400 to-blue-500"
                    }`}>
                      {msg.role === "user" ? <FaUser size={16} /> : <FaRobot size={16} />}
                    </div>
                    
                    <div className={`flex-1 max-w-[80%] ${msg.role === "user" ? "text-right" : "text-left"}`}>
                      <div className={`inline-block p-3 rounded-lg ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-gray-700/80 text-white"
                      }`}>
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                        
                        {/* Project Card for AI responses */}
                        {msg.role === "ai" && msg.hasProject && msg.projectType && (
                          <ProjectCard projectType={msg.projectType} />
                        )}
                      </div>
                      
                      {/* Message Reactions */}
                      {msg.role === "ai" && (
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => addReaction(msg.id, "👍")}
                            className={`text-xs p-1 rounded transition-colors ${
                              msg.reaction === "👍" ? "text-green-400" : "text-gray-400 hover:text-green-400"
                            }`}
                          >
                            👍
                          </button>
                          <button
                            onClick={() => addReaction(msg.id, "❤️")}
                            className={`text-xs p-1 rounded transition-colors ${
                              msg.reaction === "❤️" ? "text-red-400" : "text-gray-400 hover:text-red-400"
                            }`}
                          >
                            ❤️
                          </button>
                        </div>
                      )}
                      
                      <div className="text-xs text-gray-500 mt-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && <TypingIndicator />}

                {/* Dynamic Suggestions */}
                {suggestions.length > 0 && messages.length > 0 && (
                  <motion.div 
                    className="flex flex-wrap gap-2 mt-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestion(suggestion)}
                        className="text-xs bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 px-3 py-1 rounded-full transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <textarea
                    className="w-full border border-gray-600 bg-gray-900 text-white rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-transparent"
                    rows={1}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me about Raghav..."
                    disabled={loading}
                    style={{ minHeight: '44px', maxHeight: '120px' }}
                  />
                  <button
                    className="absolute right-2 top-2 text-gray-400 hover:text-cyan-400 transition-colors"
                    onClick={() => {/* Voice input placeholder */}}
                  >
                    <FaMicrophone size={14} />
                  </button>
                </div>
                <motion.button
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white p-3 rounded-lg font-bold disabled:opacity-50 hover:from-blue-500 hover:to-cyan-400 transition-all duration-300"
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPaperPlane size={16} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 