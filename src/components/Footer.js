import React from 'react';
import { motion } from 'framer-motion';
import { HiHeart, HiShieldExclamation } from 'react-icons/hi';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="relative mt-20 glass-effect border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div 
            className="flex items-center space-x-2 text-white"
            whileHover={{ scale: 1.05 }}
          >
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-red-400"
            >
              <HiHeart />
            </motion.div>
            <span>for bug bounty hunters</span>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-purple-400"
            >
              <HiShieldExclamation />
            </motion.div>
          </motion.div>
          
          <div className="text-center text-gray-400">
            <p className="text-sm">
              © 2024 BuggyBug. Created to help you on your bug bounty journey.
            </p>
            <p className="text-xs mt-2">
              Remember: Only test on systems you own or have explicit permission to test.
            </p>
          </div>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500/20 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
          className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500/20 rounded-full blur-sm"
        />
      </div>
    </motion.footer>
  );
};

export default Footer;
