import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiMessageSquare, FiX, FiSend, FiMinimize2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { text: "Hello! I'm your GymVerse AI assistant. How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "That's a great question about fitness!",
        "I recommend focusing on progressive overload.",
        "Make sure to stay hydrated.",
        "Consistency is key to seeing results.",
        "For weight loss, a calorie deficit is essential."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      setMessages(prev => [...prev, { text: randomResponse, isBot: true }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-24 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[calc(100vw-3rem)] sm:w-96 bg-white dark:bg-[#111214] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[70vh] sm:h-[500px] max-h-[600px]"
          >
            <div className="bg-slate-900 dark:bg-slate-950 p-4 flex justify-between items-center border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-bold text-white text-sm">Assistant</h3>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                  <FiMinimize2 size={16} />
                </button>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                  <FiX size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-[#0a0a0b]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.isBot
                      ? 'bg-white dark:bg-[#1A1B1E] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-none'
                      : 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/20'
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-[#1A1B1E] border border-slate-200 dark:border-slate-800 rounded-2xl rounded-tl-none p-4 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 bg-white dark:bg-[#111214] border-t border-slate-200 dark:border-slate-800">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full pl-4 pr-12 py-3 bg-slate-100 dark:bg-slate-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50 disabled:bg-slate-400 transition-colors"
                >
                  <FiSend size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 ${isOpen
          ? 'bg-slate-800 text-white rotate-90'
          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
      >
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} className="group-hover:animate-pulse" />}
      </button>
    </div>
  );
};

export default Chatbot;
