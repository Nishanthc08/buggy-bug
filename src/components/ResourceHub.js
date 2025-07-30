import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiBookOpen, HiPlay, HiDocumentText, HiExternalLink } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';

const ResourceHub = ({ resources }) => {
  const [activeTab, setActiveTab] = useState('articles');
  const { isDarkMode } = useTheme();

  const tabs = [
    { id: 'articles', label: 'Articles', icon: HiDocumentText },
    { id: 'videos', label: 'Videos', icon: HiPlay },
    { id: 'documentation', label: 'Docs', icon: HiBookOpen }
  ];

  const getIconForType = (type) => {
    switch (type) {
      case 'video': return HiPlay;
      case 'documentation': return HiBookOpen;
      default: return HiDocumentText;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-6 p-6 rounded-lg shadow-lg ${
        isDarkMode 
          ? 'bg-gray-800 bg-opacity-50 border border-gray-700' 
          : 'bg-white bg-opacity-80 border border-gray-200'
      }`}
    >
      <h4 className="text-lg font-bold text-purple-400 mb-4">📚 Learning Resources</h4>
      
      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Icon className="mr-2" size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Resource Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid gap-4">
            {resources[activeTab]?.map((resource, index) => {
              const Icon = getIconForType(resource.type);
              return (
                <motion.a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border transition-colors hover:scale-105 transform ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className="text-purple-400 mt-1" size={20} />
                    <div className="flex-1">
                      <h5 className="font-semibold mb-1">{resource.title}</h5>
                      <p className={`text-sm mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {resource.description}
                      </p>
                      <div className="flex items-center text-xs text-purple-400">
                        <HiExternalLink className="mr-1" size={12} />
                        {resource.source}
                      </div>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {!resources[activeTab] || resources[activeTab].length === 0 && (
        <div className={`text-center py-8 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <p>No {activeTab} available for this topic yet.</p>
        </div>
      )}
    </motion.div>
  );
};

export default ResourceHub;
