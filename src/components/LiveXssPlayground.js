import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const LiveXssPlayground = ({ xssType }) => {
  // State for all playgrounds
  const [reflectedInput, setReflectedInput] = useState('<script>alert("Reflected XSS!")</script>');
  const [storedInput, setStoredInput] = useState('<img src=x onerror=alert("Stored XSS!")>');
  const [domInput, setDomInput] = useState('#<img src=x onerror=alert("DOM XSS")>');

  // State for outputs
  const [reflectedOutput, setReflectedOutput] = useState('');
  const [comments, setComments] = useState(['Welcome! This is a safe space.']);
  const { isDarkMode } = useTheme();

  // Effect for DOM-based XSS simulation
  useEffect(() => {
    if (xssType === 'dom') {
      const target = document.getElementById('dom-output');
      if (target) {
        // In a real scenario, this would come from window.location.hash
        const simulatedHash = domInput.startsWith('#') ? domInput.substring(1) : domInput;
        try {
            // Use decodeURIComponent to mimic browser behavior
            target.innerHTML = decodeURIComponent(simulatedHash);
        } catch (e) {
            target.innerHTML = simulatedHash; // Fallback if decoding fails
        }
      }
    }
  }, [xssType, domInput]);

  const handleReflectedInject = () => {
    setReflectedOutput(reflectedInput);
  };

  const handlePostComment = () => {
    if (storedInput.trim()) {
      setComments([...comments, storedInput]);
      setStoredInput('');
    }
  };

  const renderPlayground = () => {
    switch (xssType) {
      case 'reflected':
        return (
          <div>
            <h4 className="font-bold mb-2">Simulated Search Page (Reflected XSS)</h4>
            <p className="text-sm text-gray-400 mb-2">Input is reflected directly into the page.</p>
            <input
              type="text"
              value={reflectedInput}
              onChange={(e) => setReflectedInput(e.target.value)}
              className={`w-full p-2 mb-4 rounded ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            />
            <button
              onClick={handleReflectedInject}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
            >
              Search
            </button>
            <div className="mt-4 p-4 border rounded">
              <h5 className="font-semibold">Search Results:</h5>
              <p>You searched for: <span dangerouslySetInnerHTML={{ __html: reflectedOutput }}></span></p>
            </div>
          </div>
        );
      case 'stored':
        return (
            <div>
              <h4 className="font-bold mb-2">Simulated Comment Section (Stored XSS)</h4>
              <p className="text-sm text-gray-400 mb-2">Comments are stored and displayed to all users.</p>
              <textarea
                value={storedInput}
                onChange={(e) => setStoredInput(e.target.value)}
                className={`w-full p-2 mb-4 rounded ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}
                placeholder="Leave a comment..."
                rows="3"
              />
              <button
                onClick={handlePostComment}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
              >
                Post Comment
              </button>
              <div className="mt-4 p-4 border rounded">
                <h5 className="font-semibold">Comments Section:</h5>
                {comments.map((comment, index) => (
                  <div key={index} className="mt-2 p-2 border-t border-gray-600/50">
                    <p dangerouslySetInnerHTML={{ __html: comment }}></p>
                  </div>
                ))}
              </div>
            </div>
          );
      case 'dom':
        return (
            <div>
              <h4 className="font-bold mb-2">Simulated Dynamic Page (DOM-based XSS)</h4>
              <p className="mb-2 text-sm text-gray-400">
                Content is rendered client-side from the "URL hash" input.
              </p>
              <input
                type="text"
                value={domInput}
                onChange={(e) => setDomInput(e.target.value)}
                className={`w-full p-2 mb-4 rounded ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}
              />
               <div className="mt-4 p-4 border rounded">
                <h5 className="font-semibold">Welcome, <span id="dom-output">guest</span>!</h5>
              </div>
            </div>
          );
      default:
        return <p>Select an XSS type to begin.</p>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-6 p-6 rounded-lg shadow-lg ${
        isDarkMode 
          ? 'bg-gray-800 bg-opacity-50 border border-gray-700' 
          : 'bg-white bg-opacity-80 border border-gray-200'
      }`}
    >
      <h3 className="text-xl font-bold mb-4">Live XSS Playground</h3>
      {renderPlayground()}
    </motion.div>
  );
};

export default LiveXssPlayground;
