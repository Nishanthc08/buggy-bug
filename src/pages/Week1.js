import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome, HiArrowLeft, HiArrowRight, HiCheck } from 'react-icons/hi';
import { useProgress } from '../contexts/ProgressContext';
import WeekProgress from '../components/WeekProgress';
import withLoading from '../components/withLoading';
import WeekPageSkeleton from '../components/WeekPageSkeleton';
import InteractiveCodeSnippet from '../components/InteractiveCodeSnippet';
import ResourceHub from '../components/ResourceHub';
import SetupWizard from '../components/SetupWizard';

const Week1 = () => {
  const { progress, toggleDayComplete } = useProgress();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const days = [
    {
      day: 1,
      title: "Introduction to Web Technologies",
      topics: [
        "HTTP/HTTPS basics and protocol understanding",
        "Common HTTP request methods (GET, POST, PUT, DELETE)",
        "HTTP status codes (200, 301, 404, 500)",
        "HTML & JavaScript fundamentals",
        "Basic DOM manipulation concepts"
      ],
      interactiveComponent: (
        <InteractiveCodeSnippet
          title="HTML & DOM Manipulation Example"
          initialCode={`'''<h1 id="welcome">Hello, World!</h1>\n<button onclick="changeText()">Click Me</button>\n<script>\n  function changeText() {\n    document.getElementById('welcome').innerText = 'You clicked the button!';\n  }\n</script>'''`}
        />
      ),
      resources: {
        articles: [
          { 
            title: "MDN Web Docs: HTTP", 
            description: "A comprehensive guide to the Hypertext Transfer Protocol.",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP",
            source: "Mozilla Developer Network",
            type: "documentation"
          },
          { 
            title: "A Beginner’s Guide to HTML & CSS", 
            description: "A friendly and visual introduction to the basics of web development.",
            url: "https://learn.shayhowe.com/html-css/",
            source: "Shay Howe",
            type: "article"
          }
        ],
        videos: [
          { 
            title: "HTTP Crash Course & Exploration", 
            description: "A 25-minute video covering the essentials of the HTTP protocol.",
            url: "https://www.youtube.com/watch?v=iG2BvXLobA",
            source: "Traversy Media",
            type: "video"
          }
        ]
      }
    },
    {
      day: 2,
      title: "Understanding Databases and SQL",
      topics: [
        "SQL fundamentals and relational databases",
        "Basic queries: SELECT, INSERT, UPDATE, DELETE",
        "Database structure: tables, rows, columns, keys",
        "Web architecture: frontend, backend, database interactions"
      ],
      interactiveComponent: (
        <InteractiveCodeSnippet
          title="SQL Sandbox"
          initialCode={`'''-- Try running a query, for example:\nSELECT * FROM users;'''`}
          language="sql"
        />
      ),
      resources: {
        articles: [
          {
            title: "SQLBolt - Learn SQL with simple, interactive exercises.",
            description: "The best way to learn SQL is to practice. SQLBolt provides interactive lessons to get you started.",
            url: "https://sqlbolt.com/",
            source: "SQLBolt",
            type: "documentation"
          }
        ],
        videos: [
          {
            title: "SQL Tutorial - Full Database Course for Beginners",
            description: "A comprehensive 4-hour SQL course that covers everything from the basics to advanced topics.",
            url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            source: "freeCodeCamp.org",
            type: "video"
          }
        ]
      }
    },
    {
      day: 3,
      title: "Introduction to OWASP Top 10",
      topics: [
        "OWASP Top 10 2021 overview",
        "A01: Broken Access Control",
        "A02: Cryptographic Failures",
        "A03: Injection vulnerabilities",
        "Authorization vs authentication concepts"
      ]
    },
    {
      day: 4,
      title: "Continuing OWASP Top 10",
      topics: [
        "A04: Insecure Design",
        "A05: Security Misconfiguration",
        "A06: Vulnerable and Outdated Components",
        "A07: Identification and Authentication Failures",
        "Start reading bug bounty reports on HackerOne"
      ]
    },
    {
      day: 5,
      title: "Completing OWASP Top 10 & Lab Setup",
      topics: [
        "A08: Software and Data Integrity Failures",
        "A09: Security Logging and Monitoring Failures",
        "A10: Server-Side Request Forgery (SSRF)",
        "Get ready to practice! Follow the wizard to set up your lab environment."
      ],
      interactiveComponent: (
        <SetupWizard
          steps={[
            { 
              title: 'Install Burp Suite', 
              description: 'Download and install the latest version of Burp Suite Community Edition. This is an essential tool for web application testing.',
              link: 'https://portswigger.net/burp/communitydownload'
            },
            { 
              title: 'Install OWASP Juice Shop', 
              description: 'We will use Docker to run OWASP Juice Shop, a deliberately insecure web application for practice.',
              link: 'https://hub.docker.com/r/bkimminich/juice-shop'
            },
            { 
              title: 'Run Juice Shop', 
              description: 'Open your terminal and run the command: docker run --rm -p 3001:3000 bkimminich/juice-shop'
            },
            { 
              title: 'Access the Lab', 
              description: 'Open your browser and navigate to http://localhost:3001 to start hacking!'
            }
          ]}
        />
      )
    },
    {
      day: "6-7",
      title: "Weekend Practice & Review",
      topics: [
        "Complete 5-10 OWASP Juice Shop challenges",
        "Practice with Burp Suite Proxy and Repeater",
        "Review week's notes and create summary",
        "Join bug bounty communities and Discord servers",
        "Prepare for Week 2 - read about XSS types"
      ]
    }
  ];

  return (
    <div className="pt-24 text-white min-h-screen">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center text-gray-300 hover:text-white transition-colors">
            <HiHome className="mr-2" />
            Home
          </Link>
          <div className="flex space-x-4">
            <Link to="/quiz/week1" className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
              Take Quiz
            </Link>
            <Link to="/week2" className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
              Week 2 <HiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>

        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Week 1: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Foundations & OWASP Top 10</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-gray-300 max-w-3xl"
        >
          Build your foundation in web security by understanding core technologies and the most critical vulnerabilities.
        </motion.p>
      </motion.div>

      {/* Week Progress */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <WeekProgress weekId="week1" />
      </motion.div>

      {/* Days Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
      >
        <div className="grid gap-8">
          {days.map((dayData, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="glass-effect rounded-2xl p-6 card-hover"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {dayData.day}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-purple-400">
                      Day {dayData.day}: {dayData.title}
                    </h3>
                    <button
                      onClick={() => toggleDayComplete('week1', `day${dayData.day}`)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                        progress.week1[`day${dayData.day}`]
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-400 hover:border-purple-400'
                      }`}
                    >
                      {progress.week1[`day${dayData.day}`] && <HiCheck className="w-4 h-4" />}
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {dayData.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-300">{topic}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Interactive Component */}
                  {dayData.interactiveComponent && dayData.interactiveComponent}

                  {/* Resource Hub */}
                  {dayData.resources && <ResourceHub resources={dayData.resources} />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex justify-between items-center mt-16 pt-8 border-t border-white/10"
        >
          <Link 
            to="/" 
            className="flex items-center px-6 py-3 text-gray-300 hover:text-white transition-colors"
          >
            <HiArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <Link 
            to="/week2" 
            className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Next: Week 2 <HiArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Export the Week1 component with loading functionality
export default withLoading(Week1, WeekPageSkeleton, 800);
