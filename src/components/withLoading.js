import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { motion } from 'framer-motion';

// Higher-order component to add loading states to pages
const withLoading = (WrappedComponent, LoadingSkeleton = null, delay = 800) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate loading time for better UX demonstration
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, delay);

      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen pt-20 pb-12 px-4"
        >
          <div className="max-w-6xl mx-auto">
            {LoadingSkeleton ? (
              <LoadingSkeleton />
            ) : (
              <div className="flex justify-center items-center min-h-[60vh]">
                <LoadingSpinner size="lg" text="Loading content..." />
              </div>
            )}
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <WrappedComponent {...props} />
      </motion.div>
    );
  };
};

export default withLoading;
