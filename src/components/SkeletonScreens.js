import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Skeleton from './Skeleton';

// Card Skeleton - for day cards in week pages
export const CardSkeleton = ({ showDescription = true }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`p-6 rounded-lg glass-effect transition-all duration-300 ${
      isDarkMode ? 'border border-white/10' : 'border border-gray-200/50'
    }`}>
      <div className="flex items-center space-x-3 mb-4">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="h-6 w-32" />
      </div>
      <Skeleton className="h-8 w-3/4 mb-3" />
      {showDescription && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      )}
    </div>
  );
};

// Week Progress Skeleton
export const WeekProgressSkeleton = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`p-6 rounded-lg glass-effect mb-8 ${
      isDarkMode ? 'border border-white/10' : 'border border-gray-200/50'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-16" />
      </div>
      <Skeleton className="h-2 w-full rounded-full mb-2" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
};

// Home Page Hero Skeleton
export const HeroSkeleton = () => {
  return (
    <div className="text-center space-y-6 mb-12">
      <Skeleton className="h-12 w-3/5 mx-auto" />
      <Skeleton className="h-16 w-4/5 mx-auto" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6 mx-auto" />
        <Skeleton className="h-4 w-4/5 mx-auto" />
      </div>
      <Skeleton className="h-12 w-40 mx-auto rounded-lg" />
    </div>
  );
};

// Week Cards Grid Skeleton - for home page
export const WeekCardsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <CardSkeleton key={index} showDescription={false} />
      ))}
    </div>
  );
};

// Cheat Sheet Skeleton
export const CheatSheetSkeleton = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="space-y-6">
      {/* Search Bar Skeleton */}
      <div className={`p-4 rounded-lg glass-effect ${
        isDarkMode ? 'border border-white/10' : 'border border-gray-200/50'
      }`}>
        <Skeleton className="h-10 w-full" />
      </div>
      
      {/* Filter Buttons Skeleton */}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-20 rounded-full" />
        ))}
      </div>
      
      {/* Cheat Sheet Items Skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={`p-6 rounded-lg glass-effect ${
            isDarkMode ? 'border border-white/10' : 'border border-gray-200/50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-8 w-20" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="mt-4">
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Daily Lessons Skeleton - for week pages
export const DailyLessonsSkeleton = () => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 7 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

// Page Layout Skeleton - Generic page wrapper
export const PageLayoutSkeleton = ({ children }) => {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96" />
        </div>
        {children}
      </div>
    </div>
  );
};
