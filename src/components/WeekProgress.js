import React from 'react';
import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';
import { useProgress } from '../contexts/ProgressContext';

const WeekProgress = ({ weekId, className = "" }) => {
  const { getWeekProgress } = useProgress();
  const weekProgress = getWeekProgress(weekId);

  return (
    <div className={`bg-white/10 rounded-xl p-4 mb-6 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-white">Week Progress</h3>
        <span className="text-sm text-gray-300">
          {weekProgress.completed}/{weekProgress.total} tasks completed
        </span>
      </div>
      
      <div className="w-full bg-white/20 rounded-full h-3 mb-2">
        <motion.div 
          className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${weekProgress.percentage}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </div>
      
      <div className="text-center">
        <span className="text-2xl font-bold text-green-400">{weekProgress.percentage}%</span>
        <span className="text-sm text-gray-300 ml-2">Complete</span>
      </div>
      
      {weekProgress.percentage === 100 && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex items-center justify-center mt-3 text-yellow-400"
        >
          <HiCheck className="w-6 h-6 mr-2" />
          <span className="font-bold">Week Complete! 🎉</span>
        </motion.div>
      )}
    </div>
  );
};

export default WeekProgress;
