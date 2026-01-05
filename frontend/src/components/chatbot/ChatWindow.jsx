import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiSend } from 'react-icons/fi';
import ChatMessage from './ChatMessage';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';
import Loading from '../common/Loading';

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // loadHistory(); // Start fresh every time
    setMessages([{
      role: 'assistant',
      content: "Hello! I'm your AI fitness trainer. How can I help you today? I can assist with workouts, diet plans, motivation, and answer any fitness questions!",
      timestamp: new Date(),
    }]);
    setLoadingHistory(false);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadHistory = async () => {
    try {
      const response = await api.get('/chatbot/history');
      if (response.data.messages && response.data.messages.length > 0) {
        setMessages(response.data.messages);
      } else {
        // Add welcome message
        setMessages([{
          role: 'assistant',
          content: "Hello! I'm your AI fitness trainer. How can I help you today? I can assist with workouts, diet plans, motivation, and answer any fitness questions!",
          timestamp: new Date(),
        }]);
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
      setMessages([{
        role: 'assistant',
        content: "Hello! I'm your AI fitness trainer. How can I help you today?",
        timestamp: new Date(),
      }]);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await api.post('/chatbot/chat', { message: userMessage.content });
      const assistantMessage = {
        role: 'assistant',
        content: response.data.message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast.error('Failed to get response. Please try again.');
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingHistory) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed bottom-24 right-6 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-50 flex items-center justify-center"
      >
        <Loading />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="fixed bottom-24 right-6 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-50 flex flex-col border border-gray-200 dark:border-gray-700"
    >
      {/* Header */}
      <div className="bg-primary-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <h3 className="font-semibold">AI Fitness Trainer</h3>
          <p className="text-xs text-primary-100">Always here to help</p>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-primary-700 rounded-full p-1 transition-colors"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {loading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about fitness..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiSend size={20} />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ChatWindow;






