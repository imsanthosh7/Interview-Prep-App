import React from 'react';
import SummaryCardSkeleton from './SummaryCardSkeleton';

const SkeletonGrid = () => {
  return (
    <div className="w-9/10 container mx-auto pt-4 pb-4">
      <div className='my-5 ml-5 md:ml-0'>
        <div className="h-5 bg-gray-200 rounded-md animate-pulse w-[200px] md:w-[230px]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
        {[...Array(6)].map((_, i) => (
          <SummaryCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default SkeletonGrid;
