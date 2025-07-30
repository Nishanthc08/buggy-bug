import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const challenges = [
  {
    id: 1,
    title: 'Challenge 1: Simple Filter',
    description: 'The filter blocks `<script>` tags. Find another way to execute an alert.',
    filter: (payload) => !payload.includes('<script>'),
    solutionHint: 'Try using a different HTML tag that can execute JavaScript, like `<img>` or `<svg>`.',
  },
  {
    id: 2,
    title: 'Challenge 2: Attribute Blacklist',
    description: 'The filter blocks the `onerror` attribute. Can you find another event handler?',
    filter: (payload) => !payload.includes('onerror'),
    solutionHint: 'Consider other events like `onload`, `onmouseover`, or `onfocus`.',
  },
  {
    id: 3,
    title: 'Challenge 3: Keyword Blacklist',
    description: 'The word `alert` is forbidden. How can you call the function without using the word itself?',
    filter: (payload) => !payload.includes('alert'),
    solutionHint: 'Think about character encoding or using `eval()` with encoded strings (e.g., Base64).'
  },
];

const InteractiveBypassingChallenges = () => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [payload, setPayload] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const { isDarkMode } = useTheme();

  const handleSubmit = () => {
    const currentChallenge = challenges[currentChallengeIndex];
    // A basic check to see if it looks like a valid XSS payload
    const isPotentiallyMalicious = /[<>]/.test(payload) && /\w+\(/.test(payload);

    if (isPotentiallyMalicious && currentChallenge.filter(payload)) {
      setFeedback({ message: 'Success! Payload bypassed the filter.', type: 'success' });
    } else {
      setFeedback({ message: 'Failed. The filter blocked your payload.', type: 'error' });
    }
  };

  const handleNextChallenge = () => {
    setPayload('');
    setFeedback({ message: '', type: '' });
    setCurrentChallengeIndex((prevIndex) => (prevIndex + 1) % challenges.length);
  };

  const { title, description, solutionHint } = challenges[currentChallengeIndex];

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
      <h3 className="text-xl font-bold mb-4">Interactive Bypassing Challenges</h3>
      <div className="mb-4">
        <h4 className="font-semibold text-lg text-yellow-400">{title}</h4>
        <p className="text-sm text-gray-400 mt-1">{description}</p>
      </div>
      <textarea
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
        className={`w-full p-2 mb-4 rounded resize-none ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}
        placeholder="Enter your payload here..."
        rows="3"
      />
      <div className="flex items-center justify-between">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Test Payload
        </button>
        <button
          onClick={handleNextChallenge}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
        >
          Next Challenge
        </button>
      </div>
      {feedback.message && (
        <div className={`mt-4 p-3 rounded-lg flex items-center ${
            feedback.type === 'success' 
                ? 'bg-green-900/50 text-green-300' 
                : 'bg-red-900/50 text-red-300'
        }`}>
            {feedback.type === 'success' ? <FiCheckCircle className="mr-2"/> : <FiXCircle className="mr-2"/>}
            {feedback.message}
        </div>
      )}
        <div className="mt-4 text-xs text-gray-500">
            <p><span className="font-bold">Hint:</span> {solutionHint}</p>
        </div>
    </motion.div>
  );
};

export default InteractiveBypassingChallenges;

