import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome } from 'react-icons/hi';
import { week1Quiz } from '../data/quizzesData';
import Quiz from '../components/Quiz';
import withLoading from '../components/withLoading';

const Week1QuizPage = () => {
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
          <Link to="/week1" className="flex items-center text-gray-300 hover:text-white transition-colors">
            Back to Week 1
          </Link>
        </div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Week 1 Quiz: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Foundations & OWASP Top 10</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-gray-300 max-w-3xl"
        >
          {week1Quiz.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 text-sm text-gray-400"
        >
          <p>Questions: {week1Quiz.totalQuestions} | Passing Score: {week1Quiz.passingScore}%</p>
        </motion.div>
      </motion.div>

      {/* Quiz Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
      >
        <Quiz quiz={week1Quiz} />
      </motion.div>
    </div>
  );
};

export default withLoading(Week1QuizPage, null, 800);
