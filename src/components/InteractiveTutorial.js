import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft, HiArrowRight, HiLightBulb } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';

const InteractiveTutorial = ({ tutorial }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const { isDarkMode } = useTheme();

  const step = tutorial.steps[currentStep];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setFeedback({ type: '', message: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step.expectedInput && inputValue.trim() === step.expectedInput) {
      setFeedback({ type: 'success', message: step.successMessage });
    } else {
      setFeedback({ type: 'error', message: step.failureMessage });
    }
  };

  const handleNext = () => {
    if (currentStep < tutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setInputValue('');
      setFeedback({ type: '', message: '' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setInputValue('');
      setFeedback({ type: '', message: '' });
    }
  };

  return (
    <div className={`p-6 rounded-lg glass-effect transition-all duration-300 ${
      isDarkMode ? 'border border-white/10' : 'border border-gray-200/50'
    }`}>
      <h2 className="text-2xl font-bold mb-4 text-purple-400">{tutorial.title}</h2>
      
      {/* Step Content */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{step.id}. {step.title}</h3>
        <div className="prose prose-invert max-w-none">{step.content}</div>
      </div>

      {/* Code Example */}
      {step.code && (
        <div className="mb-6">
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <code>{step.code}</code>
          </pre>
        </div>
      )}

      {/* Interactive Task */}
      {step.task && (
        <div className="mb-6">
          <p className="font-semibold mb-2">{step.task}</p>
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? 'bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:ring-purple-400'
                  : 'bg-white/50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
              }`}
            />
            <button type="submit" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold">Submit</button>
          </form>
        </div>
      )}

      {/* Feedback */}
      <AnimatePresence>
        {feedback.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`p-4 rounded-lg mb-6 flex items-center space-x-2 ${
              feedback.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
            }`}
          >
            <HiLightBulb className="h-5 w-5" />
            <span>{feedback.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button 
          onClick={handlePrev} 
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HiArrowLeft className="inline-block mr-2" />
          Prev
        </button>
        <span className="text-sm text-gray-400">Step {currentStep + 1} of {tutorial.steps.length}</span>
        <button 
          onClick={handleNext} 
          disabled={currentStep === tutorial.steps.length - 1 || (step.expectedInput && feedback.type !== 'success')}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <HiArrowRight className="inline-block ml-2" />
        </button>
      </div>
    </div>
  );
};

export default InteractiveTutorial;

