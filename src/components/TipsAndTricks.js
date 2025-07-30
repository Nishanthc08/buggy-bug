import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const TipsAndTricks = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [tips, setTips] = useState([
    {
      id: 1,
      title: "Always URL Encode Your Payloads",
      content: "When testing for XSS, make sure to URL encode your payloads to bypass basic filters.",
      author: "BugHunter123",
      category: "XSS",
      likes: 15
    },
    {
      id: 2,
      title: "Use Burp Suite Intruder",
      content: "Burp Suite's Intruder is great for automating payload testing across multiple parameters.",
      author: "SecurityPro",
      category: "Tools",
      likes: 23
    }
  ]);
  
  const [newTip, setNewTip] = useState({
    title: '',
    content: '',
    category: 'XSS'
  });
  
  const [showForm, setShowForm] = useState(false);

  const handleTipSubmit = (e) => {
    e.preventDefault();
    if (newTip.title.trim() && newTip.content.trim()) {
      const tip = {
        id: tips.length + 1,
        ...newTip,
        author: user?.username || 'Anonymous',
        likes: 0
      };
      setTips([tip, ...tips]);
      setNewTip({ title: '', content: '', category: 'XSS' });
      setShowForm(false);
    }
  };

  const handleLike = (id) => {
    setTips(tips.map(tip => 
      tip.id === id ? { ...tip, likes: tip.likes + 1 } : tip
    ));
  };

  const categories = ['XSS', 'SQL Injection', 'CSRF', 'Authentication', 'Tools', 'General'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mt-8 p-6 rounded-lg shadow-lg ${
        isDarkMode 
          ? 'bg-gray-800 bg-opacity-50' 
          : 'bg-white bg-opacity-80 border border-gray-200'
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Community Tips & Tricks</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-all"
        >
          {showForm ? 'Cancel' : '+ Add Tip'}
        </button>
      </div>

      {showForm && (
        <motion.form 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          onSubmit={handleTipSubmit}
          className="mb-6 p-4 bg-gray-700 bg-opacity-50 rounded-lg"
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Tip title"
              value={newTip.title}
              onChange={(e) => setNewTip({ ...newTip, title: e.target.value })}
              className="w-full p-3 bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <select
              value={newTip.category}
              onChange={(e) => setNewTip({ ...newTip, category: e.target.value })}
              className="w-full p-3 bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Share your tip or trick..."
              value={newTip.content}
              onChange={(e) => setNewTip({ ...newTip, content: e.target.value })}
              className="w-full p-3 bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
              required
            />
          </div>
          <button 
            type="submit"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-all"
          >
            Submit Tip
          </button>
        </motion.form>
      )}

      <div className="space-y-4">
        {tips.map((tip, index) => (
          <motion.div 
            key={tip.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 bg-gray-700 bg-opacity-50 rounded-lg border-l-4 border-purple-500"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-lg">{tip.title}</h4>
                <span className="inline-block px-2 py-1 bg-purple-600 text-xs rounded-full mr-2">
                  {tip.category}
                </span>
                <span className="text-sm text-gray-400">by {tip.author}</span>
              </div>
              <button
                onClick={() => handleLike(tip.id)}
                className="flex items-center space-x-1 text-pink-400 hover:text-pink-300 transition-colors"
              >
                <span>❤️</span>
                <span>{tip.likes}</span>
              </button>
            </div>
            <p className="text-gray-200">{tip.content}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TipsAndTricks;
