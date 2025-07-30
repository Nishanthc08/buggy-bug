import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome } from 'react-icons/hi';
import withLoading from '../components/withLoading';
import CodeEditor from '../components/CodeEditor';

const PlaygroundPage = () => {

  const handleRunCode = async (code) => {
    // This is a simple simulation. In a real scenario, you would run the code in a sandboxed environment.
    return new Promise(resolve => {
      setTimeout(() => {
        try {
          // eslint-disable-next-line no-eval
          const result = eval(code);
          resolve(result !== undefined ? String(result) : 'Code executed successfully, with no return value.');
        } catch (error) {
          resolve(error.toString());
        }
      }, 500);
    });
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
        </div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Code Playground
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-gray-300 max-w-3xl"
        >
          Experiment with code in a safe environment. Note: This is a simplified playground and does not support all browser APIs.
        </motion.p>
      </motion.div>

      {/* Code Editor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
      >
        <CodeEditor 
          onRun={handleRunCode} 
          language="javascript"
          placeholder="// Try your JavaScript payloads here, e.g., alert('Hello from Playground!')"
        />
      </motion.div>
    </div>
  );
};

export default withLoading(PlaygroundPage, null, 800);

