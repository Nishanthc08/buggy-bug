import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    week1: {
      day1: false,
      day2: false,
      day3: false,
      day4: false,
      day5: false,
      'day6-7': false,
    },
    week2: {
      day1: false,
      day2: false,
      day3: false,
      day4: false,
      day5: false,
      'day6-7': false,
    },
    week3: {
      day1: false,
      day2: false,
      day3: false,
      day4: false,
      day5: false,
      'day6-7': false,
    },
    week4: {
      day1: false,
      day2: false,
      day3: false,
      day4: false,
      day5: false,
      'day6-7': false,
    },
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('buggybug-progress');
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error('Error loading progress from localStorage:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('buggybug-progress', JSON.stringify(progress));
  }, [progress]);

  const toggleDayComplete = (week, day) => {
    setProgress(prev => ({
      ...prev,
      [week]: {
        ...prev[week],
        [day]: !prev[week][day],
      },
    }));
  };

  const getWeekProgress = (week) => {
    const weekData = progress[week];
    const totalDays = Object.keys(weekData).length;
    const completedDays = Object.values(weekData).filter(Boolean).length;
    return {
      completed: completedDays,
      total: totalDays,
      percentage: Math.round((completedDays / totalDays) * 100),
    };
  };

  const getTotalProgress = () => {
    const allWeeks = Object.keys(progress);
    let totalCompleted = 0;
    let totalDays = 0;

    allWeeks.forEach(week => {
      const weekProgress = getWeekProgress(week);
      totalCompleted += weekProgress.completed;
      totalDays += weekProgress.total;
    });

    return {
      completed: totalCompleted,
      total: totalDays,
      percentage: Math.round((totalCompleted / totalDays) * 100),
    };
  };

  const isWeekComplete = (week) => {
    const weekProgress = getWeekProgress(week);
    return weekProgress.percentage === 100;
  };

  const getCompletedWeeks = () => {
    return Object.keys(progress).filter(week => isWeekComplete(week)).length;
  };

  const value = {
    progress,
    toggleDayComplete,
    getWeekProgress,
    getTotalProgress,
    isWeekComplete,
    getCompletedWeeks,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
