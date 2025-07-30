import React from 'react';
import { HeroSkeleton, WeekCardsGridSkeleton, WeekProgressSkeleton } from './SkeletonScreens';

const HomePageSkeleton = () => {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section Skeleton */}
        <HeroSkeleton />
        
        {/* Progress Overview Skeleton */}
        <WeekProgressSkeleton />
        
        {/* Week Cards Grid Skeleton */}
        <div className="mb-12">
          <WeekCardsGridSkeleton />
        </div>
      </div>
    </div>
  );
};

export default HomePageSkeleton;
