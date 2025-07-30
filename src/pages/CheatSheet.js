import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiHome, HiArrowLeft, HiClipboardCopy, HiOutlineShieldCheck, HiChevronDown, HiChevronUp, HiSearch } from 'react-icons/hi';
import { cheatSheetData } from '../data/cheatSheetData';
import { useTheme } from '../contexts/ThemeContext';
import withLoading from '../components/withLoading';
import CheatSheetPageSkeleton from '../components/CheatSheetPageSkeleton';

const CheatSheet = () => {
  const [activeSections, setActiveSections] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkMode } = useTheme();

  const toggleSection = (title) => {
    setActiveSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const filteredData = cheatSheetData.filter((section) =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className={`pt-24 min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'text-white' : 'text-gray-900'
    }`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className={`flex items-center transition-colors duration-300 ${
            isDarkMode 
              ? 'text-gray-300 hover:text-white' 
              : 'text-gray-600 hover:text-gray-900'
          }`}>
            <HiHome className="mr-2" />
            Home
          </Link>
          <Link to="/week4" className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-600 hover:bg-gray-700 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}>
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
          className={`text-lg max-w-3xl transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          A quick reference for essential commands, payloads, and methodologies.
        </motion.p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
      >
        <div className="relative">
          <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search cheat sheet sections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 ${
              isDarkMode
                ? 'bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400'
                : 'bg-white/50 border border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>
      </motion.div>

      {/* Cheat Sheet Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
      >
        <div className="space-y-6">
          {filteredData.map((section, index) => (
            <motion.div
              key={section.title}
              variants={itemVariants}
              className="glass-effect rounded-2xl overflow-hidden card-hover"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.title)}
                className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors duration-300 ${
                  isDarkMode ? 'hover:bg-gray-700/20' : 'hover:bg-gray-200/50'
                }`}
              >
                <h3 className="flex items-center text-xl font-bold text-green-400">
                  <span className="mr-3">{section.icon}</span>
                  {section.title}
                </h3>
                {activeSections[section.title] ? (
                  <HiChevronUp className="text-gray-400" />
                ) : (
                  <HiChevronDown className="text-gray-400" />
                )}
              </button>

              {/* Section Content */}
              <AnimatePresence>
                {activeSections[section.title] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          <h4 className="text-lg font-semibold text-gray-200 mb-2">
                            {item.subtitle}
                          </h4>
                          <CodeBlock code={item.code} />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// Export the CheatSheet component with loading functionality
export default withLoading(CheatSheet, CheatSheetPageSkeleton, 1200);

