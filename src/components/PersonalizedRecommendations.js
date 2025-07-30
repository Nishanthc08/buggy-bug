import React from 'react';
import { motion } from 'framer-motion';
import { HiLightBulb } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';

const recommendations = [
  {
    title: 'Master XSS Fundamentals',
    description: 'You have completed the Week 1 quiz. Try the interactive XSS tutorial to sharpen your skills.',
    path: '/tutorial/xss'
  },
  {
    title: 'Explore SQL Injection',
    description: 'You seem to have a good grasp of XSS. Why not dive into SQL Injection in Week 2?',
    path: '/week2'
  },
  {
    title: 'Test Your Knowledge',
    description: 'You have been active in the community. Take the Week 2 quiz to test your knowledge.',
    path: '/quiz/week2'
  }
];

const PersonalizedRecommendations = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`p-6 rounded-lg shadow-lg ${
        isDarkMode 
          ? 'bg-gray-800 bg-opacity-50' 
          : 'bg-white bg-opacity-80 border border-gray-200'
      }`}
    >
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <HiLightBulb className="mr-2 text-yellow-400" />
        Personalized Recommendations
      </h3>
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            className="p-4 bg-gray-700 bg-opacity-50 rounded-lg hover:bg-gray-700 transition-all"
          >
            <h4 className="font-bold">{rec.title}</h4>
            <p className="text-sm text-gray-300">{rec.description}</p>
            <a href={rec.path} className="text-sm text-purple-400 hover:underline mt-2 inline-block">Let's go!</a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PersonalizedRecommendations;

