import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Week1 from './pages/Week1';
import Week2 from './pages/Week2';
import Week3 from './pages/Week3';
import Week4 from './pages/Week4';
import CheatSheet from './pages/CheatSheet';
import InteractiveTutorialPage from './pages/InteractiveTutorialPage';
import PlaygroundPage from './pages/PlaygroundPage';
import Week1QuizPage from './pages/Week1QuizPage';
import Week2QuizPage from './pages/Week2QuizPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CommunityPage from './pages/CommunityPage';
import AIChatbot from './components/AIChatbot';

function App() {
  const { isDarkMode } = useTheme();

  return (
    <Router>
      <div className={`min-h-screen transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white' 
          : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 text-gray-900'
      }`}>
        <Navbar />
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/week1" element={<Week1 />} />
            <Route path="/week2" element={<Week2 />} />
            <Route path="/week3" element={<Week3 />} />
            <Route path="/week4" element={<Week4 />} />
            <Route path="/cheat-sheet" element={<CheatSheet />} />
            <Route path="/tutorial/xss" element={<InteractiveTutorialPage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/quiz/week1" element={<Week1QuizPage />} />
            <Route path="/quiz/week2" element={<Week2QuizPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/community" element={<CommunityPage />} />
          </Routes>
        </motion.main>
        <Footer />
        <AIChatbot />
      </div>
    </Router>
  );
}

export default App;
