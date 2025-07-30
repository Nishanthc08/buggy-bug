import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome } from 'react-icons/hi';
import { week2Quiz } from '../data/quizzesData';
import Quiz from '../components/Quiz';
import withLoading from '../components/withLoading';

const Week2QuizPage = () => {
  return (
    <div className="pt-24 text-white min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center text-gray-300 hover:text-white transition-colors">
            <HiHome className="mr-2" />
            Home
          </Link>
          <Link to="/week2" className="flex items-center text-gray-300 hover:text-white transition-colors">
            Back to Week 2
          </Link>
        </div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Week 2 Quiz: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Common Vulnerabilities Deep Dive</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-gray-300 max-w-3xl"
        >
          {week2Quiz.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 text-sm text-gray-400"
        >
          <p>Questions: {week2Quiz.totalQuestions} | Passing Score: {week2Quiz.passingScore}%</p>
        </motion.div>
      </motion.div>

      {/* Quiz Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
      >
        <Quiz quiz={week2Quiz} />
      </motion.div>
    </div>
  );
};

export default withLoading(Week2QuizPage, null, 800);
