import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { FiFileText, FiCheckSquare } from 'react-icons/fi';

const sampleReport = `# Title: Stored XSS in Profile Page via Nickname

## Summary:
A stored Cross-Site Scripting (XSS) vulnerability exists on the user profile page. An attacker can set a malicious nickname containing a JavaScript payload. When any user views the attacker's profile, the script executes in their browser, potentially leading to session hijacking.

## Steps to Reproduce:
1. Log in to your account.
2. Navigate to the profile settings page.
3. Change your nickname to: <script>alert('XSS')</script>
4. Save the changes.
5. Navigate to your profile page from another account.
6. Observe that the alert box appears.

## Impact:
This vulnerability allows for session hijacking, credential theft, and page defacement. An attacker could take over any user's account who views their profile.`;

const annotations = {
  title: {
    text: 'A good title is clear, concise, and includes the vulnerability type and location.',
    suggestion: 'Excellent. The title is descriptive and follows best practices.',
    type: 'success'
  },
  summary: {
    text: 'The summary should briefly explain the vulnerability, its cause, and its potential impact.',
    suggestion: 'Clear and effective summary. It quickly communicates the core issue.',
    type: 'success'
  },
  reproduce: {
    text: 'Steps to reproduce must be easy to follow, allowing the security team to validate the finding quickly.',
    suggestion: 'Numbered steps are great. Ensure they are precise and repeatable.',
    type: 'info'
  },
  impact: {
    text: 'Clearly articulate the business impact. How does this vulnerability affect the company or its users?',
    suggestion: 'Good explanation of the technical impact. Consider adding specific business risks.',
    type: 'info'
  },
};

const BugBountyReportAnalyzer = () => {
  const [reportText, setReportText] = useState(sampleReport);
  const [analysis, setAnalysis] = useState(null);
  const { isDarkMode } = useTheme();

  const analyzeReport = () => {
    const sections = {
      title: reportText.match(/#\s?Title:(.*)/i)?.[1].trim() || '',
      summary: reportText.match(/##\s?Summary:(.*)/is)?.[1].trim() || '',
      reproduce: reportText.match(/##\s?Steps to Reproduce:(.*)/is)?.[1].trim() || '',
      impact: reportText.match(/##\s?Impact:(.*)/is)?.[1].trim() || '',
    };
    setAnalysis(sections);
  };

  const renderAnnotatedSection = (key, content) => {
    if (!content) return null;
    const annotation = annotations[key];
    return (
      <div className="mb-4 relative group">
        <div className={`absolute -left-8 top-2 w-6 h-6 rounded-full flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100 ${annotation.type === 'success' ? 'bg-green-500/80' : 'bg-blue-500/80'}`}>
          <FiCheckSquare size={14} />
        </div>
        <h4 className="font-semibold text-lg text-yellow-400 capitalize">{key}</h4>
        <pre className={`p-3 mt-1 rounded-lg whitespace-pre-wrap text-sm ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>{content}</pre>
        <div className={`mt-2 p-2 rounded-lg text-xs ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
          <p><strong>Analysis:</strong> {annotation.text}</p>
          <p className="mt-1"><strong>Suggestion:</strong> {annotation.suggestion}</p>
        </div>
      </div>
    );
  };

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
        <FiFileText className="mr-2 text-yellow-400" />
        Bug Bounty Report Analyzer
      </h3>
      <p className="text-sm text-gray-400 mb-4">
        Paste your bug bounty report below to get an annotated analysis and suggestions for improvement.
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Area */}
        <div>
          <textarea
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            className={`w-full h-96 p-3 rounded-lg font-mono text-sm resize-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
            placeholder="Paste your report here..."
          />
          <button 
            onClick={analyzeReport} 
            className="mt-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg w-full"
          >
            Analyze Report
          </button>
        </div>

        {/* Analysis Area */}
        <div className="h-96 overflow-y-auto pr-2">
          {analysis ? (
            <div>
              {renderAnnotatedSection('title', analysis.title)}
              {renderAnnotatedSection('summary', analysis.summary)}
              {renderAnnotatedSection('reproduce', analysis.reproduce)}
              {renderAnnotatedSection('impact', analysis.impact)}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
                <p>Click "Analyze Report" to see annotations.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BugBountyReportAnalyzer;

