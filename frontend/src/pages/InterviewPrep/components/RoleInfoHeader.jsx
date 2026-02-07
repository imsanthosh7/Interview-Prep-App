import React from 'react';
import { Clock, HelpCircle, Calendar } from 'lucide-react';
import { getInitials } from '../../../utils/helper';

const RoleInfoHeader = ({
    role,
    topicsToFocus,
    experience,
    questions,
    description,
    lastUpdated,
}) => {
    return (
        <div className="relative bg-background border-b border-white/10 py-10">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black font-bold text-sm">
                                {getInitials(role)}
                            </div>
                            <span className="text-sm font-mono text-primary/80 uppercase tracking-widest border border-primary/20 px-2 py-0.5 rounded-full bg-primary/5">
                                Interview Session
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight leading-none mb-2">
                            {role}
                        </h1>
                        <p className="text-lg text-muted-foreground font-light max-w-2xl">
                            {topicsToFocus}
                        </p>
                    </div>

                    <div className="flex gap-4 md:gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground/50 uppercase tracking-wider mb-1 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> Experience
                            </span>
                            <span className="font-mono text-xl text-white">{experience} Yrs</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground/50 uppercase tracking-wider mb-1 flex items-center gap-1">
                                <HelpCircle className="w-3 h-3" /> Questions
                            </span>
                            <span className="font-mono text-xl text-white">{questions}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground/50 uppercase tracking-wider mb-1 flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> Updated
                            </span>
                            <span className="font-mono text-xl text-white">{lastUpdated}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -mt-32 -mr-32" />
        </div>
    );
};

export default RoleInfoHeader;
