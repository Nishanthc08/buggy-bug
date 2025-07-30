import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiShieldCheck, HiBadgeCheck } from 'react-icons/hi';
import { useProgress } from '../contexts/ProgressContext';
import withLoading from '../components/withLoading';
import HomePageSkeleton from '../components/HomePageSkeleton';

const Home = () => {
  const { getTotalProgress, getCompletedWeeks } = useProgress();
  const totalProgress = getTotalProgress();
  const completedWeeks = getCompletedWeeks();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const weeks = [
    { name: 'Week 1', path: '/week1', description: 'Foundations & OWASP Top 10' },
    { name: 'Week 2', path: '/week2', description: 'Common Vulnerabilities Deep Dive' },
    { name: 'Week 3', path: '/week3', description: 'Tools & Reconnaissance' },
    { name: 'Week 4', path: '/week4', description: 'Real-World Application & Reporting' },
  ];

  return (
    <div className="pt-24 text-white">
      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center py-20 px-4 sm:px-6 lg:px-8"
      >
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">BuggyBug</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
          Your 4-week structured guide to becoming a skilled bug bounty hunter. From basics to your first bug report.
        </motion.p>
        <motion.div variants={itemVariants} className="mt-8">
          <Link
            to="/week1"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-purple-600 border border-transparent rounded-full shadow-lg hover:bg-purple-700 transition-all duration-200"
          >
            Start Your Journey <HiArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </motion.section>

      {/* Progress Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-4">Your Progress</motion.h2>
        <motion.div variants={itemVariants} className="w-full bg-white/10 rounded-full h-4 mb-4">
          <motion.div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full"
            style={{ width: `${totalProgress.percentage}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${totalProgress.percentage}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </motion.div>
        <motion.p variants={itemVariants} className="text-center text-gray-300">Overall Completion: {totalProgress.percentage}%</motion.p>
        {completedWeeks > 0 && (
          <motion.div variants={itemVariants} className="flex justify-center space-x-4 mt-4">
            {[...Array(completedWeeks)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.2 }}
                className="flex items-center space-x-2 text-yellow-400"
              >
                <HiBadgeCheck className="w-8 h-8" />
                <span className="font-bold">Week {i + 1} Complete</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>

      {/* Weeks Overview */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">The 4-Week Plan</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {weeks.map((week, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link to={week.path} className="block p-6 rounded-2xl glass-effect card-hover h-full">
                <h3 className="text-xl font-bold text-purple-400">{week.name}</h3>
                <p className="mt-2 text-gray-300">{week.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Interactive Tutorial Promo */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="relative p-8 rounded-2xl bg-gradient-to-r from-green-500 to-cyan-600 shadow-2xl overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold">Interactive Learning</h3>
            <p className="mt-2 text-gray-200">Try our hands-on tutorial to learn XSS vulnerabilities step-by-step with real examples.</p>
            <Link
              to="/tutorial/xss"
              className="mt-6 inline-flex items-center px-6 py-3 text-base font-medium text-green-600 bg-white border border-transparent rounded-full hover:bg-gray-200 transition-all duration-200"
            >
              Try Interactive Tutorial <HiArrowRight className="ml-2" />
            </Link>
          </div>
          <HiShieldCheck className="absolute -right-8 -bottom-8 w-40 h-40 text-white/10"/>
        </div>
      </motion.section>

      {/* Cheat Sheet Promo */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="relative p-8 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold">Quick Reference</h3>
            <p className="mt-2 text-gray-200">Need a quick reminder? Our Cheat Sheet has essential commands, payloads, and checklists.</p>
            <Link
              to="/cheat-sheet"
              className="mt-6 inline-flex items-center px-6 py-3 text-base font-medium text-purple-600 bg-white border border-transparent rounded-full hover:bg-gray-200 transition-all duration-200"
            >
              Go to Cheat Sheet <HiArrowRight className="ml-2" />
            </Link>
          </div>
          <HiShieldCheck className="absolute -right-8 -bottom-8 w-40 h-40 text-white/10"/>
        </div>
      </motion.section>
    </div>
  );
};

// Export the Home component with loading functionality
export default withLoading(Home, HomePageSkeleton, 1000);
