import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const DiscussionForum = ({ week }) => {
  const { isDarkMode } = useTheme();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      setPosts([...posts, { text: newPost, author: 'Anonymous' }]);
      setNewPost('');
    }
  };

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
      <h3 className="text-2xl font-bold mb-4">Discussion Forum - Week {week}</h3>
      <div className="mb-6">
        <form onSubmit={handlePostSubmit}>
          <textarea
            className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
            }`}
            rows="3"
            placeholder="Share your thoughts or ask a question..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          ></textarea>
          <button 
            type="submit"
            className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all"
          >
            Post
          </button>
        </form>
      </div>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 bg-gray-700 bg-opacity-50 rounded-lg"
          >
            <p className="font-semibold">{post.author}</p>
            <p>{post.text}</p>
          </motion.div>
        ))}
        {posts.length === 0 && <p>No posts yet. Be the first to start a discussion!</p>}
      </div>
    </motion.div>
  );
};

export default DiscussionForum;

