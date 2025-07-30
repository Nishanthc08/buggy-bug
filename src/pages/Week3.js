import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome, HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import InteractiveSqlSimulator from '../components/InteractiveSqlSimulator';
import PayloadBuilder from '../components/PayloadBuilder';
import VisualDatabaseExplorer from '../components/VisualDatabaseExplorer';
import GuessTheQueryGame from '../components/GuessTheQueryGame';

const Week3 = () => {
  const [activeSqlType, setActiveSqlType] = useState('error');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const days = [
    {
      day: 1,
      title: "SQL Injection Fundamentals",
      topics: [
        "Understanding SQL and database structures",
        "How SQL injection vulnerabilities occur",
        "Basic SQL injection payloads and techniques",
        "Identifying injectable parameters",
        "Manual testing vs automated tools"
      ]
    },
    {
      day: 2,
      title: "Error-Based SQL Injection",
      topics: [
        "Triggering database errors to extract information",
        "Common error messages and what they reveal",
        "MySQL, PostgreSQL, and MSSQL error differences",
        "Extracting database version and structure",
        "Bypassing basic error handling"
      ]
    },
    {
      day: 3,
      title: "Union-Based SQL Injection",
      topics: [
        "Understanding UNION SELECT statements",
        "Finding the correct number of columns",
        "Data type matching and NULL values",
        "Extracting data from multiple tables",
        "Advanced UNION techniques"
      ]
    },
    {
      day: 4,
      title: "Blind SQL Injection Techniques",
      topics: [
        "Boolean-based blind SQL injection",
        "Time-based blind SQL injection",
        "Character-by-character data extraction",
        "Automated blind SQLi with custom scripts",
        "Advanced timing attack techniques"
      ]
    },
    {
      day: 5,
      title: "Advanced SQL Injection & Tools",
      topics: [
        "SQLMap installation and configuration",
        "Automated vulnerability scanning",
        "Custom payload creation",
        "WAF bypass techniques",
        "Database-specific injection methods"
      ]
    },
    {
      day: "6-7",
      title: "SQL Injection Practice & Defense",
      topics: [
        "Hands-on practice with vulnerable applications",
        "Real-world SQL injection case studies",
        "Parameterized queries and prepared statements",
        "Input validation and sanitization",
        "Creating comprehensive SQLi test cases"
      ]
    }
  ];

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
          <div className="flex space-x-4">
            <Link to="/week2" className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors">
              <HiArrowLeft className="mr-2" /> Week 2
            </Link>
            <Link to="/week4" className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
              Week 4 <HiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>

        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Week 3: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">SQL Injection Mastery</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-gray-300 max-w-3xl"
        >
          Master SQL injection techniques from basic error-based attacks to advanced blind injection methods and automated tools.
        </motion.p>
      </motion.div>

      {/* Days Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
      >
        <div className="grid gap-8">
          {days.map((dayData, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="glass-effect rounded-2xl p-6 card-hover"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {dayData.day}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-teal-400 mb-4">
                    Day {dayData.day}: {dayData.title}
                  </h3>
                  <ul className="space-y-2">
                    {dayData.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-300">{topic}</span>
                      </li>
                    ))}
                  </ul>
                  {dayData.day === 2 && (
                     <div className="mt-6 space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="flex space-x-2 mb-4 border-b border-gray-700">
                                    <button onClick={() => setActiveSqlType('error')} className={`px-4 py-2 text-sm font-medium transition-colors ${activeSqlType === 'error' ? 'border-b-2 border-teal-500 text-white' : 'text-gray-400 hover:text-white'}`}>Error-Based</button>
                                    <button onClick={() => setActiveSqlType('union')} className={`px-4 py-2 text-sm font-medium transition-colors ${activeSqlType === 'union' ? 'border-b-2 border-teal-500 text-white' : 'text-gray-400 hover:text-white'}`}>Union-Based</button>
                                    <button onClick={() => setActiveSqlType('blind')} className={`px-4 py-2 text-sm font-medium transition-colors ${activeSqlType === 'blind' ? 'border-b-2 border-teal-500 text-white' : 'text-gray-400 hover:text-white'}`}>Blind SQLi</button>
                                </div>
                                <InteractiveSqlSimulator simulationType={activeSqlType} />
                            </div>
                            <VisualDatabaseExplorer />
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <PayloadBuilder />
                            <GuessTheQueryGame />
                        </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex justify-between items-center mt-16 pt-8 border-t border-white/10"
        >
          <Link 
            to="/week2" 
            className="flex items-center px-6 py-3 text-gray-300 hover:text-white transition-colors"
          >
            <HiArrowLeft className="mr-2" />
            Previous: Week 2
          </Link>
          <Link 
            to="/week4" 
            className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Next: Week 4 <HiArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Week3;
