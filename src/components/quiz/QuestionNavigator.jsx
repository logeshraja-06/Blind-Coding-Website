import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ChevronUp, ChevronDown, HelpCircle, Grid } from 'lucide-react';

export const QuestionNavigator = ({
  totalQuestions,
  currentIndex,
  answers,
  onSelectQuestion,
  onOpenSubmitModal,
}) => {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;

  const getButtonState = (index) => {
    const questionId = index + 1;
    const isCurrent = index === currentIndex;
    const isAnswered = answers[questionId] !== undefined;

    if (isCurrent) {
      return 'bg-celticBlue text-white border-celticBlue-600 ring-2 ring-celticBlue/30 shadow-md font-bold';
    }
    if (isAnswered) {
      return 'bg-teaGreen text-drabDark border-teaGreen-500 font-semibold hover:bg-teaGreen-400 shadow-sm';
    }
    return 'bg-white text-drabDark/80 border-teaGreen-300/80 hover:border-celticBlue-300 hover:bg-ivory font-medium';
  };

  const gridContent = (
    <div className="space-y-5">
      {/* Navigator Header */}
      <div className="flex items-center justify-between pb-3 border-b border-teaGreen-200">
        <div>
          <h3 className="font-comfortaa font-bold text-base text-drabDark flex items-center gap-2">
            <Grid className="w-4 h-4 text-celticBlue" />
            Questions Overview
          </h3>
          <p className="text-xs text-drabDark/60 mt-0.5">Click any number to jump</p>
        </div>
      </div>

      {/* 5x5 Matrix Grid (1 to 25) */}
      <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const qNumber = i + 1;
          return (
            <button
              key={qNumber}
              type="button"
              onClick={() => {
                onSelectQuestion(i);
                setMobileExpanded(false);
              }}
              className={`aspect-square flex items-center justify-center rounded-xl text-xs sm:text-sm font-comfortaa border transition-all duration-150 cursor-pointer focus-ring ${getButtonState(
                i
              )}`}
              title={`Jump to Question ${qNumber}`}
            >
              {String(qNumber).padStart(2, '0')}
            </button>
          );
        })}
      </div>

      {/* Legend Indicator */}
      <div className="pt-4 border-t border-teaGreen-200 space-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-drabDark/70 block">
          Legend
        </span>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-celticBlue border border-celticBlue flex-shrink-0" />
            <span className="text-drabDark/80 text-[11px]">Current</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-teaGreen border border-teaGreen-500 flex-shrink-0" />
            <span className="text-drabDark/80 text-[11px]">Answered</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-white border border-teaGreen-300 flex-shrink-0" />
            <span className="text-drabDark/80 text-[11px]">Unattempted</span>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="bg-ivory rounded-xl p-3.5 border border-teaGreen-300/80 space-y-2">
        <div className="flex justify-between items-center text-xs font-semibold text-drabDark">
          <span>Answered</span>
          <span className="text-celticBlue font-bold">{answeredCount} / {totalQuestions}</span>
        </div>
        <div className="flex justify-between items-center text-xs text-drabDark/70">
          <span>Remaining</span>
          <span>{unansweredCount}</span>
        </div>
      </div>

      {/* Submit Action */}
      <button
        type="button"
        onClick={onOpenSubmitModal}
        className="w-full py-2.5 px-4 rounded-xl bg-drabDark text-ivory hover:bg-drabDark-700 font-semibold text-xs transition-colors shadow-sm text-center"
      >
        Submit Assessment →
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Right column) */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-24 bg-white rounded-3xl p-6 border border-teaGreen-300 shadow-premium">
          {gridContent}
        </div>
      </div>

      {/* Mobile Drawer (Bottom Fixed Tab) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-ivory border-t-2 border-teaGreen-400 shadow-2xl">
        <button
          type="button"
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="w-full py-3 px-4 flex items-center justify-between font-semibold text-xs text-drabDark bg-white/80 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2">
            <Grid className="w-4 h-4 text-celticBlue" />
            <span>Question Navigator ({answeredCount}/{totalQuestions} Answered)</span>
          </div>
          <div className="flex items-center gap-1 text-celticBlue">
            <span>{mobileExpanded ? 'Collapse' : 'Expand'}</span>
            {mobileExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>
        </button>

        <AnimatePresence>
          {mobileExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="p-4 bg-white max-h-[60vh] overflow-y-auto"
            >
              {gridContent}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
