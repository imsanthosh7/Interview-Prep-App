import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Pin, PinOff, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import AIResponsePreview from '../../pages/InterviewPrep/components/AIResponsePreview';
import PinSpinnerLoader from '../Loader/PinSpinnerLoader';

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
  isLoading
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 20); // Add padding
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const [isTogglingPin, setIsTogglingPin] = useState(false);

  const handleTogglePin = async (e) => {
    e.stopPropagation();
    if (!onTogglePin) return;
    try {
      setIsTogglingPin(true);
      await onTogglePin();
    } catch (err) {
      console.error('toggle pin error', err);
    } finally {
      setIsTogglingPin(false);
    }
  };

  const pinLoading = isTogglingPin;

  return (
    <Card
      className={`group mb-4 border transition-all duration-300 ${isExpanded ? 'border-primary/50 bg-card' : 'border-white/5 bg-card/50 hover:border-white/20'}`}
    >
      <div
        className='p-5 flex items-start gap-4 cursor-pointer select-none'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={`mt-0.5 w-6 h-6 rounded flex items-center justify-center text-xs font-bold border transition-colors ${isExpanded || isPinned ? 'bg-primary text-black border-primary' : 'bg-white/5 text-muted-foreground border-white/10 group-hover:border-white/30'}`}>
          Q
        </div>

        <div className='flex-1'>
          <h3 className={`text-base md:text-lg font-medium leading-relaxed transition-colors ${isExpanded ? 'text-white' : 'text-foreground group-hover:text-white'}`}>
            {question}
          </h3>
        </div>

        <div className='flex items-center gap-2'>
          <div className={`flex gap-2 transition-opacity duration-200 ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 md:opacity-0'}`}>
            <Button
              size="icon"
              variant="ghost"
              className={`h-8 w-8 ${isPinned ? 'text-primary' : 'text-muted-foreground hover:text-white'}`}
              onClick={handleTogglePin}
              disabled={pinLoading}
            >
              {pinLoading ? <PinSpinnerLoader /> : isPinned ? <PinOff className='w-4 h-4' /> : <Pin className='w-4 h-4' />}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 text-xs font-bold gap-1.5 hidden md:flex bg-white/5 hover:bg-primary hover:text-black border border-white/10"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
                onLearnMore();
              }}
            >
              <Sparkles className='w-3 h-3' /> AI EXPLAIN
            </Button>
          </div>

          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </div>

      <div
        className='overflow-hidden transition-all duration-300 ease-in-out'
        style={{ maxHeight: `${height}px` }}
      >
        <div
          ref={contentRef}
          className='px-5 pb-5 md:pl-16' // Indent answer to align with question text
        >
          <div className="relative pl-6 border-l-2 border-white/10 pt-2">
            <AIResponsePreview content={answer} />

            {/* Mobile Learn More Button */}
            <Button
              size="sm"
              variant="outline"
              className="w-full mt-4 md:hidden border-white/20 hover:bg-white/10 text-white"
              onClick={(e) => {
                e.stopPropagation();
                onLearnMore();
              }}
            >
              <Sparkles className='w-3 h-3 mr-2' /> ASK AI TO EXPLAIN
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default QuestionCard