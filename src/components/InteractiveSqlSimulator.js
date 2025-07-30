import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { FiTerminal, FiAlertTriangle, FiCheckCircle, FiClock } from 'react-icons/fi';

const mockDatabase = {
  users: [
    { id: 1, name: 'admin', pass: 'secret_pass' },
    { id: 2, name: 'john', pass: 'password123' },
  ],
  products: [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Mouse', price: 25 },
  ],
};

const InteractiveSqlSimulator = ({ simulationType }) => {
  const [payload, setPayload] = useState("' OR 1=1 --");
  const [queryResult, setQueryResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Reset state when simulation type changes
    setQueryResult(null);
    switch(simulationType) {
      case 'error':
        setPayload("' OR 1=1 --");
        break;
      case 'union':
        setPayload("' UNION SELECT null, name, pass FROM users --");
        break;
      case 'blind':
        setPayload("' AND 1=1 --");
        break;
      default:
        setPayload('');
    }
  }, [simulationType]);

  const handleInject = () => {
    let baseQuery;
    
    if (simulationType === 'union') {
      baseQuery = `SELECT id, name FROM products WHERE id = '${payload}'`;
    } else {
      baseQuery = `SELECT * FROM users WHERE name = 'admin' AND pass = '${payload}'`;
    }

    // Simulate Error-Based SQLi
    if (simulationType === 'error') {
      if (payload.includes("'")) { 
        const errorMsg = `SQLSTATE[42000]: Syntax error or access violation: 1064 You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near '${payload.substring(0, 10)}...' at line 1`;
        setQueryResult({ type: 'error', message: errorMsg, query: baseQuery });
      } else {
        setQueryResult({ type: 'success', data: [], query: baseQuery });
      }
    } else if (simulationType === 'union') {
      if (payload.toLowerCase().includes('union') && payload.toLowerCase().includes('select')) {
        const unionData = mockDatabase.products.concat(mockDatabase.users.map(u => ({id: u.name, name: u.pass})));
        setQueryResult({ type: 'union_success', data: unionData, query: baseQuery });
      } else if (payload.includes("'")) {
        const errorMsg = `SQLSTATE[21000]: The used SELECT statements have a different number of columns`;
        setQueryResult({ type: 'error', message: errorMsg, query: baseQuery });
      } else {
        setQueryResult({ type: 'success', data: mockDatabase.products.slice(0,1), query: baseQuery });
      }
    } else if (simulationType === 'blind') {
        const sleepMatch = payload.match(/sleep\((\d+)\)/i);
        if(sleepMatch && sleepMatch[1]){
            setLoading(true);
            const delay = parseInt(sleepMatch[1], 10) * 1000;
            setTimeout(() => {
                setLoading(false);
                setQueryResult({ type: 'blind_time_success', message: `Response delayed by ${sleepMatch[1]} seconds.`, query: baseQuery });
            }, delay);
        } else {
            const isTruthy = !payload.includes("1=2");
            setQueryResult({ type: 'blind_boolean_success', message: isTruthy ? 'Condition is TRUE. User exists.' : 'Condition is FALSE. User does not exist.', query: baseQuery });
        }
    }
  };

  const renderResult = () => {
    if (!queryResult) return null;

    return (
      <div className="mt-4">
        <h4 className="font-semibold">Executed Query:</h4>
        <code className={`block p-2 mt-1 rounded text-sm ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
          {queryResult.query}
        </code>
        <div className="mt-4">
          <h4 className="font-semibold">Database Response:</h4>
          {queryResult.type === 'error' ? (
            <div className={`mt-2 p-3 rounded-lg flex items-start ${isDarkMode ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-700'}`}>
              <FiAlertTriangle className="mr-3 mt-1 flex-shrink-0" />
              <pre className="whitespace-pre-wrap text-xs">{queryResult.message}</pre>
            </div>
          ) : queryResult.type === 'union_success' ? (
            <div className={`mt-2 p-3 rounded-lg ${isDarkMode ? 'bg-green-900/50' : 'bg-green-100'}`}>
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Password</th>
                  </tr>
                </thead>
                <tbody>
                  {queryResult.data.slice(2).map((row, index) => (
                    <tr key={index} className={'text-yellow-400'}>
                      <td className="p-2">{row.id}</td>
                      <td className="p-2">{row.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-yellow-400 mt-2">⚠️ UNION injection successful! Sensitive data leaked (highlighted rows).</p>
            </div>
          ) : queryResult.type === 'blind_boolean_success' ? (
            <div className={`mt-2 p-3 rounded-lg flex items-center ${isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                <FiCheckCircle className="mr-2"/>
                {queryResult.message}
            </div>
          ) : queryResult.type === 'blind_time_success' ? (
             <div className={`mt-2 p-3 rounded-lg flex items-center ${isDarkMode ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-700'}`}>
                <FiClock className="mr-2"/>
                {queryResult.message}
            </div>
          ) : queryResult.data && queryResult.data.length > 0 ? (
            <div className={`mt-2 p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    <th className="text-left p-2">ID</th>
                    <th className="text-left p-2">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {queryResult.data.map((row, index) => (
                    <tr key={index}>
                      <td className="p-2">{row.id}</td>
                      <td className="p-2">{row.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-6 p-6 rounded-lg shadow-lg relative ${
        isDarkMode 
          ? 'bg-gray-800 bg-opacity-50 border border-gray-700' 
          : 'bg-white bg-opacity-80 border border-gray-200'
      }`}
    >
        {loading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-10">
                <FiClock className="animate-spin text-4xl text-white" />
            </div>
        )}
      <h3 className="text-xl font-bold mb-4">
        SQLi Simulator - {simulationType.charAt(0).toUpperCase() + simulationType.slice(1)}-Based
      </h3>
      <p className="text-sm text-gray-400 mb-4">
        {simulationType === 'union' 
          ? 'Use UNION SELECT to extract data from other tables. Try finding the correct number of columns first.' 
          : simulationType === 'blind'
          ? 'No direct output is returned. Infer data based on boolean responses or time delays.'
          : 'Inject a payload into the password field to trigger a revealing SQL error.'}
      </p>
      <div className="flex items-center space-x-2">
        <span className="text-gray-400">
          {simulationType === 'union' ? 'Product ID:' : simulationType === 'blind' ? 'Username:' :'Password:'}
        </span>
        <input
          type="text"
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          className={`flex-grow p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
          placeholder={simulationType === 'union' ? 'Enter UNION payload...' : simulationType === 'blind' ? 'Enter boolean or time-based payload...' : 'Enter SQLi payload...'}
        />
      </div>
      <button
        onClick={handleInject}
        className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center"
      >
        <FiTerminal className="mr-2" />
        Inject
      </button>
      {renderResult()}
    </motion.div>
  );
};

export default InteractiveSqlSimulator;

