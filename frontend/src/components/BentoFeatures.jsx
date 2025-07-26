import React from 'react';
import { APP_FEATURES } from '@/utils/data.js';
import {
    Settings2,
    Clock,
    StickyNote,
    HelpCircle,
    FolderKanban,
    Sparkles
} from 'lucide-react';

const icons = [
    Settings2,     // Tailored Just for You
    Clock,         // Learn at Your Own Pace
    StickyNote,    // Capture Your Insights
    HelpCircle,    // Understand the "Why" Behind Answers
    FolderKanban,  // Save, Organize, and Revisit
    Sparkles,      // Instant AI Doubt Solver
];

const BentoFeatures = () => {
    return (
        <section className="py-16 px-4 md:px-10 lg:px-20 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                    App Features
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-evenly auto-rows-[minmax(180px,_1fr)]">
                    {APP_FEATURES.map((feature, idx) => {
                        const Icon = icons[idx];
                        return (
                            <div
                                key={feature.title}
                                className={`p-6 rounded-2xl shadow-sm border border-neutral-200 bg-gradient-to-br
                  from-white to-neutral-50 hover:shadow-md transition-all duration-300
                  ${idx === 0 ? 'lg:col-span-2' : ''}
    
                  ${idx === 4 ? 'lg:col-span-2' : ''}`}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-neutral-800 text-white rounded-xl">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {feature.title}
                                    </h3>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BentoFeatures;
