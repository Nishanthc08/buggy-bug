import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { HiUser, HiOutlineNewspaper, HiOutlineBookmark, HiOutlineCog } from 'react-icons/hi';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';

const DashboardPage = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="pt-24 text-center">Loading...</div>;
  }

  const dashboardSections = [
    {
      name: 'My Profile',
      path: '/profile',
      icon: <HiUser className="w-10 h-10 mx-auto mb-4" />,
      description: 'View and edit your public profile.'
    },
    {
      name: 'My Notes',
      path: '/notes',
      icon: <HiOutlineNewspaper className="w-10 h-10 mx-auto mb-4" />,
      description: 'Manage your personal notes and findings.'
    },
    {
      name: 'My Bookmarks',
      path: '/bookmarks',
      icon: <HiOutlineBookmark className="w-10 h-10 mx-auto mb-4" />,
      description: 'Access your saved resources and links.'
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <HiOutlineCog className="w-10 h-10 mx-auto mb-4" />,
      description: 'Adjust your account and notification settings.'
    }
  ];

  return (
    <div className="pt-24 text-white min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <h1 className="text-4xl font-bold mb-2">Welcome, {user.name}!</h1>
        <p className="text-lg text-gray-400">This is your personal dashboard. Manage your profile, notes, and settings here.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {dashboardSections.map((section) => (
          <Link to={section.path} key={section.name}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl glass-effect text-center card-hover"
            >
              {section.icon}
              <h3 className="text-xl font-bold text-purple-400">{section.name}</h3>
              <p className="mt-2 text-sm text-gray-300">{section.description}</p>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PersonalizedRecommendations />
      </div>
    </div>
  );
};

export default DashboardPage;
