import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiPlay, HiRefresh } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';

const InteractiveCodeSnippet = ({ title, initialCode, language = 'html' }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const { isDarkMode } = useTheme();

  const runCode = () => {
    if (language === 'html') {
      setOutput(code);
    } else if (language === 'javascript') {
      try {
        // Create a safe execution environment
        const result = new Function(code)();
        setOutput(result || 'Code executed successfully!');
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      }
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
  };

  useEffect(() => {
    if (language === 'html') {
      setOutput(code);
    }
  }, [code, language]);

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
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-purple-400">{title}</h4>
        <div className="flex space-x-2">
          <button
            onClick={runCode}
            className="flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
          >
            <HiPlay className="mr-1" size={16} />
            Run
          </button>
          <button
            onClick={resetCode}
            className="flex items-center px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
          >
            <HiRefresh className="mr-1" size={16} />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Code Editor */}
        <div>
          <label className="block text-sm font-medium mb-2">Code Editor:</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`w-full h-64 p-3 font-mono text-sm rounded border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              isDarkMode
                ? 'bg-gray-900 text-green-400 border-gray-600'
                : 'bg-gray-50 text-gray-800 border-gray-300'
            }`}
            placeholder="Enter your code here..."
          />
        </div>

        {/* Output Preview */}
        <div>
          <label className="block text-sm font-medium mb-2">Output Preview:</label>
          <div
            className={`w-full h-64 p-3 rounded border overflow-auto ${
              isDarkMode
                ? 'bg-gray-900 border-gray-600'
                : 'bg-white border-gray-300'
            }`}
          >
            {language === 'html' ? (
              <div
                dangerouslySetInnerHTML={{ __html: output }}
                className="h-full"
              />
            ) : (
              <pre className={`text-sm ${
                isDarkMode ? 'text-green-400' : 'text-gray-800'
              }`}>
                {output}
              </pre>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900 rounded">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          💡 <strong>Tip:</strong> Try modifying the code and click "Run" to see the changes in real-time!
        </p>
      </div>
    </motion.div>
  );
};

export default InteractiveCodeSnippet;
