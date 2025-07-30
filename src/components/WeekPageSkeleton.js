import React from 'react';
import { WeekProgressSkeleton, DailyLessonsSkeleton } from './SkeletonScreens';
import Skeleton from './Skeleton';

const WeekPageSkeleton = () => {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header Skeleton */}
        <div className="text-center mb-8">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        
        {/* Week Progress Skeleton */}
        <WeekProgressSkeleton />
        
        {/* Daily Lessons Skeleton */}
        <DailyLessonsSkeleton />
      </div>
    </div>
  );
};

export default WeekPageSkeleton;
