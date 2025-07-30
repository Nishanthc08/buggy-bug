import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { FiHelpCircle, FiCheck, FiX, FiGift } from 'react-icons/fi';

const challenges = [
  {
    title: 'Bypass Login Authentication',
    scenario: 'A login form checks for a username and password. Your goal is to log in as `admin` without knowing the password.',
    queryTemplate: (input) => `SELECT * FROM users WHERE username = 'admin' AND password = '${input}'`,
    correctAnswer: `' OR 1=1 -- `,
    hint: 'You need to make the WHERE clause always true. Think about how to comment out the rest of the query.'
  },
  {
    title: 'Find Number of Columns',
    scenario: 'You are injecting into a search field that is vulnerable to UNION-based SQLi. Find the correct number of columns to proceed.',
    queryTemplate: (input) => `SELECT col1, col2, col3 FROM products WHERE name = '${input}'`,
    correctAnswer: `' UNION SELECT NULL,NULL,NULL -- `,
    hint: 'The original query selects three columns. Your UNION statement must match this number.'
  },
  {
    title: 'Extract Database Version',
    scenario: 'You have confirmed a UNION-based SQLi with 2 columns. Now, extract the database version.',
    queryTemplate: (input) => `SELECT name, price FROM products WHERE id = '${input}'`,
    correctAnswer: `' UNION SELECT NULL,@@version -- `,
    hint: 'Replace one of the NULLs in your UNION query with the function that retrieves the database version.'
  }
];

const GuessTheQueryGame = () => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [showHint, setShowHint] = useState(false);
  const { isDarkMode } = useTheme();

  const { title, scenario, queryTemplate, correctAnswer, hint } = challenges[currentChallengeIndex];

  useEffect(() => {
    // Reset state when challenge changes
    setGuess('');
    setFeedback({ type: '', message: '' });
    setShowHint(false);
  }, [currentChallengeIndex]);

  const handleSubmit = () => {
    // Normalize answers for comparison
    const normalizedGuess = guess.replace(/\s+/g, ' ').trim();
    const normalizedAnswer = correctAnswer.replace(/\s+/g, ' ').trim();

    if (normalizedGuess === normalizedAnswer) {
      setFeedback({ type: 'success', message: 'Correct! You crafted the perfect payload.' });
    } else {
      setFeedback({ type: 'error', message: 'Not quite. Check your syntax and logic.' });
    }
  };
  
  const handleNextChallenge = () => {
      setCurrentChallengeIndex((prev) => (prev + 1) % challenges.length);
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
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <FiGift className="mr-2 text-pink-400" />
        "Guess the Query" Challenge
      </h3>
      
      {/* Challenge Description */}
      <div className="mb-4 p-4 rounded-lg bg-gray-900/50">
        <h4 className="font-semibold text-lg text-pink-400">{title}</h4>
        <p className="text-sm text-gray-300 mt-1">{scenario}</p>
      </div>

      {/* Backend Query Display */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Backend Query:</p>
        <div className={`p-4 rounded-lg font-mono text-sm text-gray-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
          <span>{queryTemplate(guess)}</span>
        </div>
      </div>

      {/* User Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Your Payload:</label>
        <input 
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className={`w-full p-2 rounded font-mono ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
          placeholder="Enter your payload here..."
        />
      </div>

      {/* Actions and Feedback */}
      <div className="flex items-center justify-between">
        <div>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg"
          >
            Check Answer
          </button>
          <button 
            onClick={() => setShowHint(!showHint)}
            className="ml-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
          >
            <FiHelpCircle />
          </button>
        </div>
        <button
            onClick={handleNextChallenge}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg"
        >
            Next Challenge
        </button>
      </div>

      {feedback.message && (
        <div className={`mt-4 p-3 rounded-lg flex items-center text-sm font-bold ${feedback.type === 'success' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
          {feedback.type === 'success' ? <FiCheck className="mr-2" /> : <FiX className="mr-2" />}
          {feedback.message}
        </div>
      )}

      {showHint && (
        <div className="mt-4 p-3 rounded-lg bg-blue-900/50 text-blue-300 text-sm">
          <strong>Hint:</strong> {hint}
        </div>
      )}

    </motion.div>
  );
};

export default GuessTheQueryGame;

