import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome, HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import LiveXssPlayground from '../components/LiveXssPlayground';
import XssPayloadLibrary from '../components/XssPayloadLibrary';
import InteractiveBypassingChallenges from '../components/InteractiveBypassingChallenges';
import VideoWalkthroughs from '../components/VideoWalkthroughs';

const Week2 = () => {
  const [activeXss, setActiveXss] = useState('reflected');

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
      title: "Cross-Site Scripting (XSS) Deep Dive",
      topics: [
        "XSS fundamentals and why it's dangerous",
        "Three main types: Reflected, Stored/Persistent, DOM-based",
        "Basic XSS payloads: <script>alert('XSS')</script>",
        "XSS contexts: HTML, attribute, JavaScript, CSS",
        "Practice on PortSwigger Web Security Academy and OWASP Juice Shop"
      ]
    },
    {
      day: 2,
      title: "Advanced XSS & Filter Bypass",
      topics: [
        "Stored XSS: More dangerous, permanent storage",
        "DOM-based XSS: JavaScript sinks and sources",
        "Filter bypass techniques and encoding methods",
        "Advanced payloads: <img src=x onerror=alert('XSS')>",
        "SVG XSS: <svg onload=alert('XSS')>"
      ]
    },
    {
      day: 3,
      title: "SQL Injection Fundamentals",
      topics: [
        "SQL injection types: error-based, union-based, boolean-based, time-based",
        "Classic payload: ' OR '1'='1",
        "Error-based SQLi: Extract info through error messages",
        "Union-based SQLi: UNION SELECT statements",
        "Database enumeration: names, tables, columns"
      ]
    },
    {
      day: 4,
      title: "Advanced SQL Injection & Blind SQLi",
      topics: [
        "Boolean-based blind SQLi techniques",
        "Time-based blind SQLi with SLEEP() and WAITFOR DELAY",
        "Character-by-character data extraction",
        "SQLMap installation and basic commands",
        "Automated SQLi detection and exploitation"
      ]
    },
    {
      day: 5,
      title: "CSRF & IDOR Vulnerabilities",
      topics: [
        "Cross-Site Request Forgery (CSRF) mechanics",
        "CSRF tokens and SameSite cookies",
        "GET-based, POST-based, and JSON CSRF",
        "Insecure Direct Object References (IDOR)",
        "Horizontal and vertical privilege escalation"
      ]
    },
    {
      day: "6-7",
      title: "Weekend Practice & Vulnerability Integration",
      topics: [
        "Vulnerability chaining: CSRF + XSS, IDOR + SQLi",
        "Complex challenges in OWASP Juice Shop",
        "Read 10-15 disclosed bug reports",
        "Create XSS and SQLi payload cheat sheets",
        "Master Burp Suite Intruder and Comparer"
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
            <Link to="/week1" className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors">
              <HiArrowLeft className="mr-2" /> Week 1
            </Link>
            <Link to="/quiz/week2" className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
              Take Quiz
            </Link>
            <Link to="/week3" className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
              Week 3 <HiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>

        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Week 2: <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">Common Vulnerabilities Deep Dive</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-gray-300 max-w-3xl"
        >
          Master the most common web vulnerabilities: XSS, SQL Injection, CSRF, and IDOR. Learn to exploit and defend against them.
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
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    {dayData.day}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    Day {dayData.day}: {dayData.title}
                  </h3>
                  <ul className="space-y-2">
                    {dayData.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-300">{topic}</span>
                      </li>
                    ))}
                  </ul>
                  {dayData.day === 2 && (
                     <div className="mt-6 space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="flex space-x-2 mb-4 border-b border-gray-700">
                                    <button onClick={() => setActiveXss('reflected')} className={`px-4 py-2 text-sm font-medium transition-colors ${activeXss === 'reflected' ? 'border-b-2 border-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}>Reflected</button>
                                    <button onClick={() => setActiveXss('stored')} className={`px-4 py-2 text-sm font-medium transition-colors ${activeXss === 'stored' ? 'border-b-2 border-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}>Stored</button>
                                    <button onClick={() => setActiveXss('dom')} className={`px-4 py-2 text-sm font-medium transition-colors ${activeXss === 'dom' ? 'border-b-2 border-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}>DOM-based</button>
                                </div>
                                <LiveXssPlayground xssType={activeXss} />
                            </div>
                            <XssPayloadLibrary />
                        </div>
                        <InteractiveBypassingChallenges />
                        <VideoWalkthroughs />
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
            to="/week1" 
            className="flex items-center px-6 py-3 text-gray-300 hover:text-white transition-colors"
          >
            <HiArrowLeft className="mr-2" />
            Previous: Week 1
          </Link>
          <Link 
            to="/week3" 
            className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Next: Week 3 <HiArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Week2;
