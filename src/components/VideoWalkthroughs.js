import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { FiPlay, FiClock } from 'react-icons/fi';

const videoData = {
  basics: [
    {
      id: 1,
      title: 'What is XSS? - Complete Introduction',
      description: 'Learn the fundamentals of Cross-Site Scripting vulnerabilities',
      duration: '8:32',
      difficulty: 'Beginner',
      embedId: 'EoaDgUgS6QA', // Sample YouTube video ID
      topics: ['XSS Basics', 'Attack Vectors', 'Impact Assessment']
    },
    {
      id: 2,
      title: 'XSS Types Explained: Reflected vs Stored vs DOM',
      description: 'Deep dive into the three main types of XSS vulnerabilities',
      duration: '12:15',
      difficulty: 'Beginner',
      embedId: '4Jk_I-cw4WE', // Sample YouTube video ID
      topics: ['Reflected XSS', 'Stored XSS', 'DOM-based XSS']
    }
  ],
  advanced: [
    {
      id: 3,
      title: 'Advanced XSS Filter Bypass Techniques',
      description: 'Learn sophisticated methods to bypass XSS filters and WAFs',
      duration: '15:42',
      difficulty: 'Advanced',
      embedId: 'ns1LDBxkJcI', // Sample YouTube video ID
      topics: ['Filter Evasion', 'Encoding Techniques', 'WAF Bypass']
    },
    {
      id: 4,
      title: 'DOM XSS Exploitation Walkthrough',
      description: 'Step-by-step guide to finding and exploiting DOM-based XSS',
      duration: '18:30',
      difficulty: 'Intermediate',
      embedId: 'v0_1dh-P9Cc', // Sample YouTube video ID
      topics: ['DOM Analysis', 'Source & Sink', 'Exploitation']
    }
  ],
  practical: [
    {
      id: 5,
      title: 'Real-World XSS Bug Bounty Case Study',
      description: 'Analysis of actual XSS vulnerabilities found in bug bounty programs',
      duration: '22:18',
      difficulty: 'Advanced',
      embedId: 'HGaFCcWM7iI', // Sample YouTube video ID
      topics: ['Bug Bounty', 'Real Examples', 'Methodology']
    },
    {
      id: 6,
      title: 'XSS to Account Takeover Demo',
      description: 'Complete demonstration of escalating XSS to full account compromise',
      duration: '16:45',
      difficulty: 'Advanced',
      embedId: 'lG7U3fuNw3A', // Sample YouTube video ID
      topics: ['Account Takeover', 'Session Hijacking', 'Privilege Escalation']
    }
  ]
};

const VideoWalkthroughs = () => {
  const [activeCategory, setActiveCategory] = useState('basics');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { isDarkMode } = useTheme();

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400';
      case 'Intermediate': return 'text-yellow-400';
      case 'Advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const renderVideoPlayer = () => {
    if (!selectedVideo) {
      return (
        <div className={`aspect-video rounded-lg border-2 border-dashed ${
          isDarkMode ? 'border-gray-600' : 'border-gray-400'
        } flex items-center justify-center`}>
          <div className="text-center">
            <FiPlay className="mx-auto text-4xl text-gray-500 mb-2" />
            <p className="text-gray-500">Select a video to start learning</p>
          </div>
        </div>
      );
    }

    return (
      <div className="aspect-video rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${selectedVideo.embedId}`}
          title={selectedVideo.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
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
      <h3 className="text-xl font-bold mb-4">Video Walkthroughs</h3>
      
      {/* Category Tabs */}
      <div className="flex space-x-2 mb-4 border-b border-gray-700 overflow-x-auto">
        <button 
          onClick={() => setActiveCategory('basics')} 
          className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
            activeCategory === 'basics' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Basics
        </button>
        <button 
          onClick={() => setActiveCategory('advanced')} 
          className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
            activeCategory === 'advanced' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Advanced
        </button>
        <button 
          onClick={() => setActiveCategory('practical')} 
          className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
            activeCategory === 'practical' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Practical
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Video Player */}
        <div>
          {renderVideoPlayer()}
          {selectedVideo && (
            <div className="mt-4">
              <h4 className="font-semibold text-lg">{selectedVideo.title}</h4>
              <p className="text-sm text-gray-400 mt-1">{selectedVideo.description}</p>
              <div className="flex items-center space-x-4 mt-2 text-xs">
                <span className="flex items-center">
                  <FiClock className="mr-1" />
                  {selectedVideo.duration}
                </span>
                <span className={`font-medium ${getDifficultyColor(selectedVideo.difficulty)}`}>
                  {selectedVideo.difficulty}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedVideo.topics.map((topic, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 text-xs bg-blue-600/20 text-blue-300 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Video List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {videoData[activeCategory].map((video) => (
            <div 
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedVideo?.id === video.id 
                  ? 'bg-blue-600/20 border border-blue-500/50' 
                  : isDarkMode 
                    ? 'bg-gray-700/50 hover:bg-gray-700' 
                    : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-16 h-12 bg-gray-600 rounded flex items-center justify-center">
                  <FiPlay className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-sm truncate">{video.title}</h5>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{video.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="flex items-center">
                        <FiClock className="mr-1" />
                        {video.duration}
                      </span>
                      <span className={`font-medium ${getDifficultyColor(video.difficulty)}`}>
                        {video.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default VideoWalkthroughs;
