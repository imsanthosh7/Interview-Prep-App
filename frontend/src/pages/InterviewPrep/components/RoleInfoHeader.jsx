import React from 'react';

const RoleInfoHeader = ({
    role,
    topicsToFocus,
    experience,
    questions,
    description,
    lastUpdated,
}) => {
    return (
        <div className="relative bg-white border-b border-gray-100  overflow-hidden">
            <div className="w-9/10 container mx-auto px-5 md:px-0 relative z-10">
                {/* Text content */}
                <div className="min-h-[220px] flex flex-col justify-center py-6">
                    <div className="space-y-2">
                        <h1 className="text-[26px] md:text-[30px] font-semibold text-gray-900 tracking-tight leading-snug">
                            {role}
                        </h1>
                        <p className="text-sm text-gray-600">{topicsToFocus}</p>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-5">
                        <span className="text-[12px] font-medium text-gray-700 bg-gray-100 px-4 py-1.5 rounded-full shadow-sm">
                            Experience: {experience} {experience === 1 ? 'Year' : 'Years'}
                        </span>
                        <span className="text-[12px] font-medium text-gray-700 bg-gray-100 px-4 py-1.5 rounded-full shadow-sm">
                            {questions} Q&A
                        </span>
                        <span className="text-[12px] font-medium text-gray-700 bg-gray-100 px-4 py-1.5 rounded-full shadow-sm">
                            Updated: {lastUpdated}
                        </span>
                    </div>
                </div>
            </div>

            {/* Background gradient blobs */}
            <div className="absolute inset-0 overflow-hidden z-0">
                <div className="absolute top-[-40px] right-[-60px] w-[180px] h-[180px] bg-gradient-to-tr from-blue-300 via-purple-300 to-pink-300 opacity-80 rounded-full blur-[60px] animate-blob1" />
                <div className="absolute top-[60px] right-[100px] w-[120px] h-[120px] bg-gradient-to-tr from-teal-300 to-lime-300 opacity-80 rounded-full blur-[50px] animate-blob2" />
            </div>
        </div>
    );
};

export default RoleInfoHeader;
