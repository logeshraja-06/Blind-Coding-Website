import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TechForceLogo } from '../../assets/logo/TechForceLogo';

export const QuizHeader = ({
  currentIndex,
  totalQuestions,
  remainingSeconds,
  answeredCount,
  onOpenSubmitModal,
}) => {
  // Format MM:SS
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  const isWarning = remainingSeconds < 300 && remainingSeconds >= 60; // < 5 mins
  const isCritical = remainingSeconds < 60; // < 1 min

  return (
    <header className="sticky top-0 z-30 bg-ivory/95 backdrop-blur-md border-b border-teaGreen-300 shadow-sm py-3 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Brand: TECH FORCE Logo + BLIND CODING */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group focus-ring rounded-lg">
            <TechForceLogo className="w-8 h-8" showText={false} />
            <div>
              <h1 className="text-sm font-bold font-comfortaa tracking-tight text-drabDark group-hover:text-celticBlue transition-colors">
                TECH FORCE • BLIND <span className="text-celticBlue">CODING</span>
              </h1>
              <span className="text-[10px] font-semibold tracking-wider text-drabDark/60 block -mt-0.5">
                CSE DEPT • 25 QUESTIONS
              </span>
            </div>
          </Link>
        </div>

        {/* Center Progress Pill */}
        <div className="flex flex-col items-center">
          <div className="px-3.5 py-1 rounded-full bg-white border border-teaGreen-300/80 shadow-inner-soft flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-drabDark">
              QUESTION <span className="text-celticBlue font-bold font-comfortaa">{String(currentIndex + 1).padStart(2, '0')}</span> OF <span className="font-comfortaa">{totalQuestions}</span>
            </span>
          </div>
          <span className="text-[10px] text-drabDark/60 mt-0.5 font-medium hidden sm:block">
            {answeredCount} of {totalQuestions} answered
          </span>
        </div>

        {/* Right Timer & Quick Submit */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={
              isCritical
                ? {
                    scale: [1, 1.05, 1],
                    borderColor: ['#EF4444', '#DC2626', '#EF4444'],
                  }
                : {}
            }
            transition={
              isCritical
                ? {
                    repeat: Infinity,
                    duration: 1,
                    ease: 'easeInOut',
                  }
                : {}
            }
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-base transition-colors shadow-sm ${
              isCritical
                ? 'bg-red-50 text-red-700 border-red-400'
                : isWarning
                ? 'bg-vanilla-100 text-drabDark border-vanilla-400 shadow-vanilla-100'
                : 'bg-white text-celticBlue border-celticBlue-300'
            }`}
          >
            {isCritical ? (
              <AlertTriangle className="w-4 h-4 text-red-600 animate-bounce" />
            ) : (
              <Clock className="w-4 h-4 text-current" />
            )}
            <span className="tracking-wider">{formattedTime}</span>
          </motion.div>

          <button
            onClick={onOpenSubmitModal}
            className="hidden sm:inline-flex items-center px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-drabDark text-ivory hover:bg-drabDark-700 transition-colors shadow-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </header>
  );
};
