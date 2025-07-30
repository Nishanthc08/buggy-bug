import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { FiDatabase, FiChevronRight, FiTable, FiType } from 'react-icons/fi';

const databaseSchema = {
  name: 'PrimaryDB',
  tables: [
    {
      name: 'users',
      columns: [
        { name: 'id', type: 'INT', primaryKey: true },
        { name: 'name', type: 'VARCHAR(50)' },
        { name: 'pass', type: 'VARCHAR(50)' },
      ],
    },
    {
      name: 'products',
      columns: [
        { name: 'id', type: 'INT', primaryKey: true },
        { name: 'name', type: 'VARCHAR(100)' },
        { name: 'price', type: 'DECIMAL(10, 2)' },
      ],
    },
    {
        name: 'sessions',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'user_id', type: 'INT' },
          { name: 'token', type: 'VARCHAR(255)' },
        ],
      },
  ],
};

const VisualDatabaseExplorer = () => {
  const [expandedTables, setExpandedTables] = useState(['users']);
  const { isDarkMode } = useTheme();

  const toggleTable = (tableName) => {
    setExpandedTables((prev) =>
      prev.includes(tableName) ? prev.filter((t) => t !== tableName) : [...prev, tableName]
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
        <FiDatabase className="mr-2 text-cyan-400" />
        Visual Database Explorer
      </h3>
      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="flex items-center text-lg font-semibold">
            <FiDatabase className="mr-2 text-cyan-400"/>
            {databaseSchema.name}
        </div>
        <div className="mt-2 space-y-2 pl-4">
            {databaseSchema.tables.map((table) => (
                <div key={table.name}>
                    <div 
                        className="flex items-center cursor-pointer text-base" 
                        onClick={() => toggleTable(table.name)}
                    >
                        <motion.div animate={{ rotate: expandedTables.includes(table.name) ? 90 : 0 }}>
                            <FiChevronRight className="mr-2"/>
                        </motion.div>
                        <FiTable className="mr-2 text-teal-400"/>
                        <span>{table.name}</span>
                    </div>
                    <AnimatePresence>
                    {expandedTables.includes(table.name) && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-6 mt-1 space-y-1 overflow-hidden"
                        >
                            {table.columns.map((column) => (
                                <div key={column.name} className="flex items-center text-sm text-gray-400">
                                    <FiType className="mr-2"/>
                                    <span>{column.name}: <span className="font-mono text-cyan-400">{column.type}</span></span>
                                    {column.primaryKey && <span className="ml-2 text-xs bg-yellow-600/50 px-2 py-0.5 rounded-full">PK</span>}
                                </div>
                            ))}
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default VisualDatabaseExplorer;

