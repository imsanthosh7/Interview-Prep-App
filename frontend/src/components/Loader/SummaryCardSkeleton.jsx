import React from 'react';

const SummaryCardSkeleton = () => {
    return (
        <div className="bg-card w-auto border border-white/10 rounded-2xl p-3 animate-pulse">
            {/* Top section */}
            <div className="rounded-xl p-4 bg-white/5 relative">
                <div className="flex items-start">
                    <div className="w-12 h-12 bg-white/10 rounded-lg mr-4" />
                    <div className="flex-grow space-y-2">
                        <div className="w-32 h-4 bg-white/10 rounded" />
                        <div className="w-20 h-3 bg-white/10 rounded" />
                    </div>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/10 border border-white/10 rounded-full" />
            </div>

            {/* Bottom section */}
            <div className="mt-4 px-2 space-y-3">
                <div className="flex flex-wrap gap-2">
                    <div className="h-5 w-20 bg-white/10 rounded-full" />
                    <div className="h-5 w-16 bg-white/10 rounded-full" />
                    <div className="h-5 w-28 bg-white/10 rounded-full" />
                </div>
                <div className="space-y-2">
                    <div className="h-3 bg-white/10 rounded w-full" />
                    <div className="h-3 bg-white/10 rounded w-3/4" />
                </div>
            </div>
        </div>
    );
};

export default SummaryCardSkeleton;
