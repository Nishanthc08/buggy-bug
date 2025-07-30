import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome, HiArrowLeft, HiArrowRight } from 'react-icons/hi';

const Week3 = () => {
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
      title: "Burp Suite Mastery",
      topics: [
        "Burp Suite Intruder attack types: Sniper, Battering Ram, etc.",
        "Fuzzing parameters and finding vulnerabilities",
        "Rate limit testing and brute force attacks",
        "Comparer for analyzing differences in responses",
        "Decoder for encoding/decoding data (Base64, URL, HTML)"
      ]
    },
    {
      day: 2,
      title: "Network Reconnaissance with Nmap",
      topics: [
        "Nmap scan types: TCP SYN (-sS), TCP connect (-sT), UDP (-sU)",
        "Version detection (-sV) and default scripts (-sC)",
        "Nmap Scripting Engine (NSE) for vulnerability detection",
        "HTTP enumeration with scripts (http-enum, http-methods)",
        "Scanning vulnerable VMs or Docker containers"
      ]
    },
    {
      day: 3,
      title: "Web Directory & File Discovery",
      topics: [
        "Directory brute forcing with Gobuster, Dirb, ffuf",
        "Wordlist management with SecLists",
        "Discovery of backup files (.bak, .old, .backup)",
        "Finding sensitive files (.env, .git, .svn)",
        "Practice with common commands"
      ]
    },
    {
      day: 4,
      title: "Subdomain Enumeration & DNS Reconnaissance",
      topics: [
        "Subdomain discovery with Sublist3r, Assetfinder, Amass",
        "DNS enumeration with dig, nslookup, DNSrecon",
        "Certificate transparency logs (crt.sh)",
        "Advanced Google dorking for sensitive information",
        "Combining tools for comprehensive enumeration"
      ]
    },
    {
      day: 5,
      title: "Information Gathering & OSINT",
      topics: [
        "Email harvesting with theHarvester",
        "Technology stack identification with Wappalyzer, Whatweb",
        "GitHub reconnaissance for API keys and secrets",
        "Shodan for finding exposed services and devices",
        "Organizing reconnaissance data effectively"
      ]
    },
    {
      day: "6-7",
      title: "Weekend Automation & Integration",
      topics: [
        "Bash scripting for bug bounty automation",
        "Piping outputs between tools and filtering results",
        "Automated scanning with Nuclei",
        "End-to-end reconnaissance practice on a target",
        "Creating a personal reconnaissance checklist"
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
          Week 3: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Tools & Reconnaissance</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-gray-300 max-w-3xl"
        >
          Learn the tools of the trade and master the art of reconnaissance to find hidden attack surfaces and vulnerabilities.
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
