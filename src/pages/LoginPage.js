import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiMail, HiLockClosed } from 'react-icons/hi';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md p-8 space-y-8 rounded-2xl glass-effect ${
          isDarkMode ? 'border border-white/10' : 'border border-gray-200/50'
        }`}
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Or{" "}
            <Link to="/register" className="font-medium text-purple-400 hover:text-purple-500">
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-center p-3 bg-red-500/20 text-red-300 rounded-lg">{error}</p>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`w-full pl-10 pr-4 py-3 rounded-t-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 border ${
                  isDarkMode
                    ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`w-full pl-10 pr-4 py-3 rounded-b-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 border ${
                  isDarkMode
                    ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
              <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                <HiArrowRight className="h-5 w-5 text-purple-500 group-hover:text-purple-400" />
              </span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;

