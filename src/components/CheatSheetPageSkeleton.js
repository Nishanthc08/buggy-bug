import React from 'react';
import { CheatSheetSkeleton as CheatSheetContentSkeleton } from './SkeletonScreens';
import Skeleton from './Skeleton';

const CheatSheetPageSkeleton = () => {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header Skeleton */}
        <div className="text-center mb-8">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        
        {/* Cheat Sheet Content Skeleton */}
        <CheatSheetContentSkeleton />
      </div>
    </div>
  );
};

export default CheatSheetPageSkeleton;
