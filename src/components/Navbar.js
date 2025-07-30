import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMenu, HiX, HiShieldExclamation, HiSun, HiMoon, HiUser, HiLogout, HiLogin } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Week 1', path: '/week1' },
  { name: 'Week 2', path: '/week2' },
  { name: 'Week 3', path: '/week3' },
  { name: 'Week 4', path: '/week4' },
  { name: 'Cheat Sheet', path: '/cheat-sheet' },
  { name: 'Community', path: '/community' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 glass-effect transition-all duration-300 ${
        isDarkMode 
          ? 'border-b border-white/10' 
          : 'border-b border-gray-200/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-3xl text-purple-400"
            >
              <HiShieldExclamation />
            </motion.div>
            <span className={`text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>BuggyBug</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-purple-600 text-white'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-white/10 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-200/50 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Authentication & User Menu */}
            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
                >
                  <HiUser className="h-5 w-5 text-purple-400" />
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>{user.name}</span>
                </motion.button>
                
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg glass-effect border transition-all duration-200 ${
                      isDarkMode ? 'border-white/10' : 'border-gray-200/50'
                    }`}
                  >
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className={`block px-4 py-2 text-sm transition-all duration-200 ${
                          isDarkMode
                            ? 'text-gray-300 hover:bg-white/10 hover:text-white'
                            : 'text-gray-600 hover:bg-gray-200/50 hover:text-gray-900'
                        }`}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 text-sm transition-all duration-200 ${
                          isDarkMode
                            ? 'text-gray-300 hover:bg-white/10 hover:text-white'
                            : 'text-gray-600 hover:bg-gray-200/50 hover:text-gray-900'
                        }`}
                      >
                        <HiLogout className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isDarkMode
                      ? 'text-gray-300 hover:bg-white/10 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-200/50 hover:text-gray-900'
                  }`}
                >
                  <HiLogin className="h-4 w-4 mr-1" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
            
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-yellow-400 transition-all duration-200"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-all duration-200 focus:outline-none ${
                isDarkMode
                  ? 'text-gray-400 hover:text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
              }`}
            >
              {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={`md:hidden glass-effect transition-all duration-300 ${
            isDarkMode ? 'border-t border-white/10' : 'border-t border-gray-200/50'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-purple-600 text-white'
                    : isDarkMode
                      ? 'text-gray-300 hover:bg-white/10 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-200/50 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Authentication */}
            <div className="border-t border-gray-200/20 pt-2 mt-2">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                      isDarkMode
                        ? 'text-gray-300 hover:bg-white/10 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-200/50 hover:text-gray-900'
                    }`}
                  >
                    <HiUser className="h-5 w-5 mr-2" />
                    {user.name} - Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                      isDarkMode
                        ? 'text-gray-300 hover:bg-white/10 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-200/50 hover:text-gray-900'
                    }`}
                  >
                    <HiLogout className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                      isDarkMode
                        ? 'text-gray-300 hover:bg-white/10 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-200/50 hover:text-gray-900'
                    }`}
                  >
                    <HiLogin className="h-5 w-5 mr-2" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
            
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                isDarkMode
                  ? 'text-gray-300 hover:bg-white/10 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-200/50 hover:text-gray-900'
              }`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <HiSun className="h-5 w-5 mr-2" /> : <HiMoon className="h-5 w-5 mr-2" />}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
