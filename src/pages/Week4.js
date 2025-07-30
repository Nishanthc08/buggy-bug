import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome, HiArrowLeft, HiArrowRight } from 'react-icons/hi';

const Week4 = () => {
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
      title: "Bug Bounty Platforms & Program Selection",
      topics: [
        "Major platforms: HackerOne, Bugcrowd, Synack, Intigriti",
        "Evaluating bug bounty programs: scope, payouts, reputation",
        "Identifying beginner-friendly programs",
        "Legal and ethical considerations",
        "Analyzing 5-10 different programs"
      ]
    },
    {
      day: 2,
      title: "Writing Effective Bug Reports",
      topics: [
        "Bug report structure: title, summary, steps to reproduce, impact",
        "Proof of Concept (PoC): screenshots, videos, code",
        "CVSS scoring basics and severity classification",
        "Common mistakes to avoid in reports",
        "Writing practice reports for previous findings"
      ]
    },
    {
      day: 3,
      title: "First Bug Bounty Attempts",
      topics: [
        "Choosing 2-3 beginner-friendly programs",
        "Applying reconnaissance techniques from Week 3",
        "Testing for low-hanging fruit: misconfigurations, IDORs, XSS",
        "Following a systematic testing methodology",
        "Keeping detailed notes of testing process"
      ]
    },
    {
      day: 4,
      title: "Advanced Techniques & Persistence",
      topics: [
        "Business logic flaws and race conditions",
        "API security: parameter pollution, rate limiting",
        "JavaScript analysis for hardcoded secrets",
        "Automated vulnerability detection with Nuclei",
        "Joining bug bounty communities for knowledge sharing"
      ]
    },
    {
      day: 5,
      title: "Report Submission & Follow-up",
      topics: [
        "Final report preparation and review",
        "Submitting reports through platform guidelines",
        "Monitoring report status and triager communications",
        "Handling rejections and learning from feedback",
        "Building a positive reputation with security teams"
      ]
    },
    {
      day: "6-7",
      title: "Final Weekend & Future Planning",
      topics: [
        "4-week skills assessment and identifying weak areas",
        "Creating a personal methodology document",
        "Writing a blog post about your journey",
        "Creating a 6-month learning plan for advanced topics",
        "Networking and finding mentors in the community"
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
            <Link to="/week3" className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors">
              <HiArrowLeft className="mr-2" /> Week 3
            </Link>
            <Link to="/cheat-sheet" className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
              Cheat Sheet <HiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>

        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Week 4: <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Real-World Application</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-gray-300 max-w-3xl"
        >
          Apply your knowledge to real-world scenarios. Learn to select programs, write effective reports, and plan your future.
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
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    {dayData.day}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">
                    Day {dayData.day}: {dayData.title}
                  </h3>
                  <ul className="space-y-2">
                    {dayData.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-300">{topic}</span>
                      </li>
                    ))}
                  </ul>
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
            to="/week3" 
            className="flex items-center px-6 py-3 text-gray-300 hover:text-white transition-colors"
          >
            <HiArrowLeft className="mr-2" />
            Previous: Week 3
          </Link>
          <Link 
            to="/cheat-sheet" 
            className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Next: Cheat Sheet <HiArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Week4;
