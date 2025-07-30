import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { FiCopy, FiTrendingUp, FiTool, FiCheckCircle } from 'react-icons/fi';

const keywordData = {
  penetrationTester: {
    title: 'Penetration Tester',
    technical: ['Vulnerability Assessment', 'Exploit Development', 'Network Security', 'Web Application Security', 'OWASP Top 10', 'Active Directory', 'Metasploit Framework', 'Nmap', 'Wireshark'],
    soft: ['Ethical Hacking', 'Problem Solving', 'Technical Reporting', 'Client Communication', 'Attention to Detail'],
    tools: ['Burp Suite', 'Kali Linux', 'Nessus', 'Cobalt Strike', 'John the Ripper']
  },
  securityAnalyst: {
    title: 'Security Analyst',
    technical: ['Threat Detection', 'Incident Response', 'Security Information and Event Management (SIEM)', 'Log Analysis', 'Firewall Management', 'Intrusion Detection Systems (IDS)', 'Malware Analysis', 'Digital Forensics'],
    soft: ['Analytical Thinking', 'Risk Assessment', 'Communication', 'Team Collaboration', 'Problem Solving'],
    tools: ['Splunk', 'QRadar', 'LogRhythm', 'Wireshark', 'Snort']
  },
  bugBountyHunter: {
    title: 'Bug Bounty Hunter',
    technical: ['Reconnaissance', 'Web Application Exploitation', 'Mobile Security (iOS/Android)', 'API Testing', 'Source Code Review', 'Fuzzing', 'Reverse Engineering', 'Cryptographic Weaknesses'],
    soft: ['Persistence', 'Creativity', 'Report Writing', 'Self-motivated', 'Ethical Disclosure'],
    tools: ['Burp Suite Pro', 'ffuf', 'Subfinder', 'Nuclei', 'Ghidra']
  }
};

const ResumeCvKeywords = () => {
  const [selectedRole, setSelectedRole] = useState('penetrationTester');
  const [copied, setCopied] = useState(false);
  const { isDarkMode } = useTheme();

  const roleData = keywordData[selectedRole];
  const allKeywords = [...roleData.technical, ...roleData.soft, ...roleData.tools].join(', ');

  const handleCopy = () => {
    navigator.clipboard.writeText(allKeywords);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderKeywordSection = (title, keywords, icon) => (
    <div>
      <h5 className="font-medium text-sm mb-2 flex items-center">
        {React.createElement(icon, { className: "mr-2" })} {title}
      </h5>
      <div className="flex flex-wrap gap-2">
        {keywords.map(kw => (
          <span key={kw} className={`px-3 py-1 text-xs rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            {kw}
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
        <FiTrendingUp className="mr-2 text-yellow-400" />
        Resume/CV Keywords Generator
      </h3>

      {/* Role Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select a career path:</label>
        <select 
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
        >
          {Object.entries(keywordData).map(([key, data]) => (
            <option key={key} value={key}>{data.title}</option>
          ))}
        </select>
      </div>

      {/* Keywords Display */}
      <div className="space-y-4 mb-4">
        {renderKeywordSection('Technical Skills', roleData.technical, FiCheckCircle)}
        {renderKeywordSection('Soft Skills', roleData.soft, FiCheckCircle)}
        {renderKeywordSection('Tools & Technologies', roleData.tools, FiTool)}
      </div>

      {/* Copy Button */}
      <button 
        onClick={handleCopy}
        className="mt-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg w-full flex items-center justify-center"
      >
        <FiCopy className="mr-2" />
        {copied ? 'Keywords Copied!' : 'Copy All Keywords'}
      </button>

    </motion.div>
  );
};

export default ResumeCvKeywords;

