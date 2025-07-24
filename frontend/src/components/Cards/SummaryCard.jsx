import React from 'react';
import { getInitials } from '../../utils/helper.js';
import { Trash2 } from 'lucide-react';

const SummaryCard = ({
    colors,
    role,
    topicsToFocus,
    experience,
    questions,
    description,
    lastUpdated,
    onSelect,
    onDelete,
}) => {
    return (
        <div
            className="bg-white w-auto border cursor-pointer border-gray-200 rounded-2xl p-3 hover:shadow-md transition-shadow duration-300 group relative"
            onClick={onSelect}
        >
            {/* Top Section */}
            <div
                className="rounded-xl p-4 relative"
                style={{ background: colors.bgcolor }}
            >
                <div className="flex items-start">
                    {/* Initials Badge */}
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 shadow-sm">
                        <span className="text-lg font-semibold text-gray-800">
                            {getInitials(role)}
                        </span>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-[17px] font-semibold text-white">
                                    {role}
                                </h2>
                                <p className="text-xs text-white/80 mt-1">
                                    {topicsToFocus}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delete Button */}
                <button
                    className="absolute top-3 right-3 md:hidden cursor-pointer group-hover:flex items-center justify-center bg-white text-rose-500 hover:bg-rose-100 border border-gray-200 rounded-full p-2 transition duration-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            {/* Bottom Section */}
            <div className="mt-4 px-2">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 text-[11px] font-medium text-gray-700">
                    <span className="px-3 py-1 bg-gray-100 rounded-full">
                        {experience} {experience === 1 ? 'Year' : 'Years'} Exp
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full">
                        {questions} Q&A
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full">
                        Updated: {lastUpdated}
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-3 line-clamp-2 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default SummaryCard;
