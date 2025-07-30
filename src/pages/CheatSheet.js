import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome, HiArrowLeft, HiArrowRight, HiClipboardCopy, HiCode, HiOutlineShieldCheck, HiOutlineLightBulb } from 'react-icons/hi';
import { useState } from 'react';

const CheatSheet = () => {
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

  const CodeBlock = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative">
        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          <code>{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
        >
          {copied ? <HiOutlineShieldCheck /> : <HiClipboardCopy />}
        </button>
      </div>
    );
  };

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
          <Link to="/week4" className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors">
            <HiArrowLeft className="mr-2" /> Week 4
          </Link>
        </div>

        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Bug Bounty <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">Cheat Sheet</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-gray-300 max-w-3xl"
        >
          A quick reference for essential commands, payloads, and methodologies.
        </motion.p>
      </motion.div>

      {/* Cheat Sheet Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Reconnaissance */}
          <motion.div variants={itemVariants} className="glass-effect rounded-2xl p-6 card-hover">
            <h3 className="flex items-center text-xl font-bold text-green-400 mb-4"><HiCode className="mr-2" />Reconnaissance Commands</h3>
            <CodeBlock code={`# Subdomain enumeration
sublist3r -d target.com
assetfinder target.com
amass enum -d target.com

# Port scanning
nmap -sS -sV -sC target.com
nmap -p- target.com

# Directory discovery
gobuster dir -u http://target.com -w /path/to/wordlist
ffuf -w wordlist.txt -u http://target.com/FUZZ`} />
          </motion.div>

          {/* XSS Payloads */}
          <motion.div variants={itemVariants} className="glass-effect rounded-2xl p-6 card-hover">
            <h3 className="flex items-center text-xl font-bold text-green-400 mb-4"><HiCode className="mr-2" />XSS Payloads</h3>
            <CodeBlock code={`<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>
<body onload=alert('XSS')>
<input onfocus=alert('XSS') autofocus>`} />
          </motion.div>

          {/* SQLi Payloads */}
          <motion.div variants={itemVariants} className="glass-effect rounded-2xl p-6 card-hover">
            <h3 className="flex items-center text-xl font-bold text-green-400 mb-4"><HiCode className="mr-2" />SQL Injection Payloads</h3>
            <CodeBlock code={`' OR '1'='1
' OR 1=1--
' UNION SELECT 1,2,3--
' AND 1=1--
'; WAITFOR DELAY '00:00:05'--`} />
          </motion.div>

          {/* Methodology */}
          <motion.div variants={itemVariants} className="glass-effect rounded-2xl p-6 card-hover">
            <h3 className="flex items-center text-xl font-bold text-green-400 mb-4"><HiOutlineShieldCheck className="mr-2" />Bug Bounty Methodology</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center"><HiArrowRight className="text-green-400 mr-2"/>Reconnaissance</li>
              <li className="flex items-center"><HiArrowRight className="text-green-400 mr-2"/>Analysis</li>
              <li className="flex items-center"><HiArrowRight className="text-green-400 mr-2"/>Testing</li>
              <li className="flex items-center"><HiArrowRight className="text-green-400 mr-2"/>Documentation</li>
              <li className="flex items-center"><HiArrowRight className="text-green-400 mr-2"/>Reporting</li>
            </ul>
          </motion.div>

          {/* Pro Tip */}
          <motion.div variants={itemVariants} className="md:col-span-2 glass-effect rounded-2xl p-6 card-hover">
            <h3 className="flex items-center text-xl font-bold text-green-400 mb-4"><HiOutlineLightBulb className="mr-2" />Pro Tip</h3>
            <p className="text-gray-300">Always customize your wordlists and payloads based on the target's technology stack. Generic payloads are often filtered. Combine reconnaissance findings to discover unique attack vectors.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheatSheet;

