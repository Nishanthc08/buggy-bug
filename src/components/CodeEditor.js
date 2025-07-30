import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlay, HiRefresh, HiClipboardCopy } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';

const CodeEditor = ({ 
  initialCode = '',
  language = 'html',
  onRun = null,
  placeholder = 'Enter your code here...'
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const { isDarkMode } = useTheme();

  const handleRun = async () => {
    if (!onRun) return;
    
    setIsRunning(true);
    try {
      const result = await onRun(code);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
    setIsRunning(false);
  };

  const handleClear = () => {
    setCode('');
    setOutput('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className={`rounded-lg overflow-hidden glass-effect transition-all duration-300 ${
      isDarkMode ? 'border border-white/10' : 'border border-gray-200/50'
    }`}>
      {/* Editor Header */}
      <div className={`px-4 py-2 flex items-center justify-between border-b transition-colors duration-300 ${
        isDarkMode ? 'border-white/10 bg-gray-800/30' : 'border-gray-200/50 bg-gray-100/30'
      }`}>
        <span className="text-sm font-medium">Code Editor - {language.toUpperCase()}</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className={`p-1 rounded hover:bg-gray-700/50 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Copy code"
          >
            <HiClipboardCopy className="w-4 h-4" />
          </button>
          <button
            onClick={handleClear}
            className={`p-1 rounded hover:bg-gray-700/50 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Clear code"
          >
            <HiRefresh className="w-4 h-4" />
          </button>
          {onRun && (
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 rounded text-white text-sm font-medium transition-colors duration-200"
              title="Run code"
            >
              <HiPlay className="w-3 h-3" />
              <span>{isRunning ? 'Running...' : 'Run'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Code Input */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={placeholder}
        className={`w-full h-48 p-4 font-mono text-sm resize-none focus:outline-none transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gray-900/50 text-white placeholder-gray-400'
            : 'bg-white/50 text-gray-900 placeholder-gray-500'
        }`}
        style={{ fontFamily: 'Monaco, Menlo, Consolas, monospace' }}
      />

      {/* Output Section */}
      {output && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className={`border-t transition-colors duration-300 ${
            isDarkMode ? 'border-white/10' : 'border-gray-200/50'
          }`}
        >
          <div className={`px-4 py-2 text-xs font-medium ${
            isDarkMode ? 'bg-gray-800/30' : 'bg-gray-100/30'
          }`}>
            Output:
          </div>
          <div className={`p-4 font-mono text-sm max-h-32 overflow-y-auto ${
            isDarkMode ? 'bg-gray-900/30' : 'bg-gray-50/30'
          }`}>
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CodeEditor;
