import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="space-y-4 p-4">
            {/* Large Blocks */}
            <div className="h-6 bg-gray-200 rounded-md animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-5/6" />

            {/* Another Large Block */}
            <div className="h-6 bg-gray-200 rounded-md animate-pulse w-3/4 mt-6" />
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-5/6" />

            {/* Third Block */}
            <div className="h-6 bg-gray-200 rounded-md animate-pulse w-3/4 mt-6" />
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-5/6" />

            {/* Bottom Section */}
            <div className="flex flex-col justify-center h-[30vh] mt-6">
                <div className="h-60 bg-gray-200 rounded-md animate-pulse w-full" />
            </div>
        </div>
    );
};

export default SkeletonLoader;
