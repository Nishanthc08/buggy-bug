import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Skeleton = ({ className }) => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`animate-pulse rounded-md ${
        isDarkMode ? 'bg-slate-700' : 'bg-gray-300'
      } ${className}`}
    />
  );
};

export default Skeleton;
