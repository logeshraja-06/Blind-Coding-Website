import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ChevronUp, ChevronDown, HelpCircle, Grid, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const QuestionNavigator = ({
  questions = [],
  totalQuestions = 25,
  currentIndex = 0,
  answers = {},
  onSelectQuestion,
  onOpenSubmitModal,
}) => {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  // Helper to check if a specific question has an answer in the answers map
  const isQuestionAnswered = (question) => {
    if (!question) return false;
    const qId = question.questionId !== undefined ? question.questionId : question.id;
    if (qId === undefined || qId === null) return false;

    const val = answers[qId] !== undefined ? answers[qId] : answers[String(qId)];
    return val !== undefined && val !== null && val !== '';
  };

  // Compute accurate answered and unanswered counts
  const answeredCount = questions.length > 0
    ? questions.filter(isQuestionAnswered).length
    : Object.keys(answers).filter((k) => answers[k] !== undefined && answers[k] !== null && answers[k] !== '').length;

  const unansweredCount = Math.max(0, totalQuestions - answeredCount);
  const progressPct = Math.round((answeredCount / totalQuestions) * 100);

  // Determine cell state based on the question's stable identity
  const getCellState = (index) => {
    const question = questions[index];
    const isCurrent = index === currentIndex;
    const answered = isQuestionAnswered(question);

    if (isCurrent) {
      return {
        type: 'current',
        // Distinct, elevated Celtic Blue for the active question
        className:
          'bg-celticBlue text-white border-celticBlue shadow-[0_4px_14px_rgba(57,113,184,0.4)] font-bold ring-2 ring-celticBlue/40 scale-105',
      };
    }

    if (answered) {
      return {
        type: 'answered',
        // Vibrant, high-contrast emerald green (#39D98A) with deep dark text (#064E3B) for high contrast and readability
        className:
          'bg-[#39D98A] text-[#064E3B] border-[#20c077] font-bold shadow-[0_2px_10px_rgba(57,217,138,0.4)] hover:bg-[#2ecc71] transition-all',
      };
    }

    return {
      type: 'pending',
      // Clean, crisp neutral ivory/white
      className:
        'bg-white text-drabDark/80 border-teaGreen-300 hover:border-celticBlue-300 hover:bg-ivory font-medium shadow-sm transition-all',
    };
  };

  const gridContent = (
    <div className="space-y-5 font-poppins">
      {/* Navigator Header */}
      <div className="flex items-center justify-between pb-3 border-b border-teaGreen-200">
        <div>
          <h3 className="font-comfortaa font-bold text-base text-drabDark flex items-center gap-2">
            <Grid className="w-4 h-4 text-celticBlue" />
            Question Navigator
          </h3>
          <p className="text-[11px] text-drabDark/60 mt-0.5">Click any cell to jump</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold font-comfortaa text-celticBlue">{progressPct}%</span>
        </div>
      </div>

      {/* 5x5 Matrix Grid (Display Order: Question 01 to 25) */}
      <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const displayOrderNumber = i + 1;
          const { className, type } = getCellState(i);

          return (
            <button
              key={displayOrderNumber}
              type="button"
              data-question-order={displayOrderNumber}
              data-question-state={type}
              onClick={() => {
                onSelectQuestion(i);
                setMobileExpanded(false);
              }}
              className={`aspect-square flex items-center justify-center rounded-xl text-xs sm:text-sm font-comfortaa border transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-celticBlue ${className}`}
              title={`Question ${displayOrderNumber} (${type})`}
            >
              {String(displayOrderNumber).padStart(2, '0')}
            </button>
          );
        })}
      </div>

      {/* Legend Indicator */}
      <div className="pt-3 border-t border-teaGreen-200 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-drabDark/60 block">
          State Legend
        </span>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-celticBlue flex-shrink-0 shadow-sm" />
            <span className="text-drabDark/80 text-[11px] font-medium">Current</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-[#39D98A] border border-[#20c077] flex-shrink-0 shadow-sm" />
            <span className="text-[#064E3B] text-[11px] font-bold">Answered</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-white border border-teaGreen-300 flex-shrink-0 shadow-sm" />
            <span className="text-drabDark/80 text-[11px] font-medium">Pending</span>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="bg-ivory rounded-2xl p-4 border border-teaGreen-300 space-y-2">
        <div className="flex justify-between items-center text-xs font-semibold text-drabDark">
          <span>Answered</span>
          <span className="text-[#064E3B] font-bold font-comfortaa px-2 py-0.5 rounded-md bg-[#39D98A]/30 border border-[#39D98A]/50">
            {answeredCount} / {totalQuestions}
          </span>
        </div>
        <div className="flex justify-between items-center text-xs text-drabDark/70">
          <span>Unattempted</span>
          <span className="font-semibold text-drabDark">{unansweredCount}</span>
        </div>
      </div>

      {/* Submit Action */}
      <Button
        variant="primary"
        size="md"
        onClick={onOpenSubmitModal}
        className="w-full font-bold shadow-md"
        icon={ArrowRight}
        iconPosition="right"
      >
        FINISH & SUBMIT
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Right column) */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-24 bg-white rounded-3xl p-6 border border-teaGreen-300 shadow-premium premium-card">
          {gridContent}
        </div>
      </div>

      {/* Mobile Drawer (Bottom Fixed Tab) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-ivory border-t-2 border-teaGreen-400 shadow-2xl">
        <button
          type="button"
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="w-full py-3 px-4 flex items-center justify-between font-semibold text-xs text-drabDark bg-white/90 backdrop-blur-sm"
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
              className="p-4 bg-white max-h-[60vh] overflow-y-auto border-t border-teaGreen-200"
            >
              {gridContent}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
