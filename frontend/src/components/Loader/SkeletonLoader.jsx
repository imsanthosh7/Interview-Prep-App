import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="space-y-4 p-4 animate-pulse">
            {/* Large Blocks */}
            <div className="h-6 bg-white/10 rounded-md w-3/4" />
            <div className="h-4 bg-white/5 rounded-md w-full" />
            <div className="h-4 bg-white/5 rounded-md w-full" />
            <div className="h-4 bg-white/5 rounded-md w-5/6" />

            {/* Another Large Block */}
            <div className="h-6 bg-white/10 rounded-md w-3/4 mt-6" />
            <div className="h-4 bg-white/5 rounded-md w-full" />
            <div className="h-4 bg-white/5 rounded-md w-full" />
            <div className="h-4 bg-white/5 rounded-md w-5/6" />

            {/* Third Block */}
            <div className="h-6 bg-white/10 rounded-md w-3/4 mt-6" />
            <div className="h-4 bg-white/5 rounded-md w-full" />
            <div className="h-4 bg-white/5 rounded-md w-full" />
            <div className="h-4 bg-white/5 rounded-md w-5/6" />

            {/* Bottom Section */}
            <div className="flex flex-col justify-center h-[30vh] mt-6">
                <div className="h-60 bg-white/5 rounded-md w-full" />
            </div>
        </div>
    );
};

export default SkeletonLoader;
