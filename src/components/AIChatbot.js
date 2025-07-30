import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChat, HiX, HiPaperAirplane } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! How can I help you with your bug bounty learning today?' }
  ]);
  const [input, setInput] = useState('');
  const { isDarkMode } = useTheme();

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { from: 'user', text: input }]);
      // Simple bot response for demonstration
      setTimeout(() => {
setMessages(prev => [...prev, { from: 'bot', text: `I\'ve received your message: "${input}". I\'m still learning, but I\'ll do my best to help!` }]);
      }, 1000);
      setInput('');
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <> 
      <div className="fixed bottom-4 right-4 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleOpen}
          className="p-4 bg-purple-600 text-white rounded-full shadow-lg focus:outline-none"
          aria-label="Toggle AI Chatbot"
        >
          {isOpen ? <HiX size={24} /> : <HiChat size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.5 }}
            className={`fixed bottom-20 right-4 w-80 h-96 shadow-xl rounded-lg flex flex-col z-50 ${
              isDarkMode
                ? 'bg-gray-800 border border-white/10'
                : 'bg-white border border-gray-200/50'
            }`}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold">AI Assistant</h3>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className={`flex mb-3 ${
                  msg.from === 'bot' ? 'justify-start' : 'justify-end'
                }`}>
                  <div className={`p-2 rounded-lg max-w-xs ${
                    msg.from === 'bot'
                      ? (isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100')
                      : (isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100')
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className={`flex-1 p-2 rounded-l-lg focus:outline-none ${
                  isDarkMode 
                    ? 'bg-gray-700 focus:ring-2 focus:ring-purple-500'
                    : 'bg-gray-100 focus:ring-2 focus:ring-purple-500'
                }`}
              />
              <button
                onClick={handleSend}
                className={`p-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 transition-all`}
                aria-label="Send message"
              >
                <HiPaperAirplane size={20} className="transform rotate-90" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;

