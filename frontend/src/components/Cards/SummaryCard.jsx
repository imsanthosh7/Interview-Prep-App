import React from 'react';
import { Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const SummaryCard = ({
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
        <Card
            className="group relative border border-white/5 bg-gradient-to-br from-card to-card/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_var(--color-primary)]/10 cursor-pointer overflow-hidden"
            onClick={onSelect}
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors pointer-events-none" />

            <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="inline-flex items-center rounded-full border border-white/10 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground mb-3 bg-white/5">
                            {role}
                        </div>
                        <CardTitle className="text-lg font-normal text-muted-foreground group-hover:text-white transition-colors">
                            {topicsToFocus || "General Prep"}
                        </CardTitle>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {description || "No description provided."}
                </p>

                <div className="flex gap-4 mt-6">
                    <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground/50 uppercase tracking-wider">Experience</span>
                        <span className="font-mono text-sm">{experience} Yrs</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground/50 uppercase tracking-wider">Questions</span>
                        <span className="font-mono text-sm">{questions}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-2 flex justify-between items-center text-xs text-muted-foreground/40 font-mono border-t border-white/5 bg-black/20">
                <span>Updated: {lastUpdated}</span>
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 -mr-2"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default SummaryCard;
