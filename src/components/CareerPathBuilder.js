import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { FiBriefcase, FiZap, FiShield, FiTrendingUp, FiStar, FiAward } from 'react-icons/fi';

const careerPaths = {
  penetrationTester: {
    title: 'Penetration Tester',
    icon: FiZap,
    color: 'text-red-500',
    description: 'Specializes in finding and exploiting vulnerabilities in systems to assess their security.',
    keySkills: ['Network Protocols', 'Scripting (Python/Bash)', 'Kali Linux', 'Metasploit', 'Burp Suite'],
    certifications: ['OSCP', 'eJPT', 'PNPT', 'CEH'],
    progression: ['Junior Pentester', 'Senior Pentester', 'Red Team Lead', 'Security Consultant']
  },
  securityAnalyst: {
    title: 'Security Analyst',
    icon: FiShield,
    color: 'text-blue-500',
    description: 'Monitors and protects an organization\'s systems from threats by analyzing security data.',
    keySkills: ['SIEM Tools (Splunk)', 'Incident Response', 'Threat Intelligence', 'Firewall Configuration', 'Log Analysis'],
    certifications: ['Security+', 'CySA+', 'GCIH', 'CISSP'],
    progression: ['SOC Analyst', 'Senior Security Analyst', 'Incident Response Manager', 'CISO']
  },
  bugBountyHunter: {
    title: 'Bug Bounty Hunter',
    icon: FiAward,
    color: 'text-green-500',
    description: 'A freelance security researcher who finds and reports bugs in exchange for bounties.',
    keySkills: ['Web App Security', 'Mobile App Security', 'Reconnaissance', 'Report Writing', 'Persistence'],
    certifications: ['eWPT', 'Burp Suite Certified Practitioner', 'OSWE'],
    progression: ['Part-time Hunter', 'Full-time Pro', 'Top Ranked Researcher', 'Security Consultant']
  }
};

const CareerPathBuilder = () => {
  const [activePath, setActivePath] = useState('penetrationTester');
  const { isDarkMode } = useTheme();
  const path = careerPaths[activePath];

  const renderSection = (title, items, icon) => (
    <div>
      <h5 className="font-medium text-sm mb-2 flex items-center">
        {React.createElement(icon, { className: 'mr-2' })}{title}
      </h5>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span key={index} className={`px-3 py-1 text-xs rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-6 p-6 rounded-lg shadow-lg ${
        isDarkMode 
          ? 'bg-gray-800 bg-opacity-50 border border-gray-700' 
          : 'bg-white bg-opacity-80 border border-gray-200'
      }`}
    >
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <FiBriefcase className="mr-2 text-yellow-400" />
        Career Path Builder
      </h3>
      <p className="text-sm text-gray-400 mb-4">
        Select a career path to explore the required skills, certifications, and potential progression.
      </p>

      {/* Path Selector */}
      <div className="flex space-x-2 mb-6 border-b border-gray-700 overflow-x-auto">
        {Object.entries(careerPaths).map(([key, p]) => (
          <button 
            key={key} 
            onClick={() => setActivePath(key)}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap flex items-center ${
              activePath === key
                ? `border-b-2 ${p.color.replace('text', 'border')} text-white`
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <p.icon className={`mr-2 ${p.color}`} />
            {p.title}
          </button>
        ))}
      </div>

      {/* Path Details */}
      <div className="space-y-4">
        <p className="text-sm text-gray-300">{path.description}</p>
        {renderSection('Key Skills', path.keySkills, FiStar)}
        {renderSection('Certifications', path.certifications, FiAward)}
        {renderSection('Career Progression', path.progression, FiTrendingUp)}
      </div>

    </motion.div>
  );
};

export default CareerPathBuilder;

