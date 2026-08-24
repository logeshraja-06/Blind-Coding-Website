import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OptionItem } from './OptionItem';
import { Badge } from '../ui/Badge';
import { Terminal, Code, Sparkles, HelpCircle } from 'lucide-react';

export const QuestionCard = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  onSelectOption,
}) => {
  if (!question) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-teaGreen-300 shadow-premium"
      >
        {/* Question Header & Category */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-teaGreen-200/60">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold font-comfortaa uppercase tracking-wider text-celticBlue bg-celticBlue-50 px-3 py-1 rounded-full border border-celticBlue-200">
              Question {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-xs text-drabDark/60 font-medium">
              Single Choice MCQ
            </span>
          </div>

          <div className="flex items-center gap-2">
            {question.category && (
              <Badge variant="info" size="sm">
                {question.category}
              </Badge>
            )}
            {question.difficulty && (
              <Badge
                variant={
                  question.difficulty === 'Easy'
                    ? 'success'
                    : question.difficulty === 'Medium'
                    ? 'warning'
                    : 'dark'
                }
                size="sm"
              >
                {question.difficulty}
              </Badge>
            )}
          </div>
        </div>

        {/* Question Text */}
        <div className="py-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-comfortaa text-drabDark leading-snug">
            {question.question}
          </h2>
        </div>

        {/* Code Snippet Block (if applicable) */}
        {question.codeSnippet && (
          <div className="mb-6 rounded-2xl overflow-hidden bg-drabDark border border-drabDark-700 shadow-inner">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-drabDark-700 border-b border-drabDark-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-vanilla/80" />
                <div className="w-3 h-3 rounded-full bg-teaGreen/80" />
                <span className="ml-2 text-xs font-mono text-ivory/60 font-medium">
                  {question.category?.toLowerCase() || 'code'}.snippet
                </span>
              </div>
              <Terminal className="w-3.5 h-3.5 text-ivory/50" />
            </div>

            {/* Code Content */}
            <pre className="p-4 sm:p-5 text-sm font-mono text-teaGreen-100 overflow-x-auto leading-relaxed">
              <code>{question.codeSnippet}</code>
            </pre>
          </div>
        )}

        {/* MCQ Options List */}
        <div className="space-y-3 pt-2">
          {question.options.map((option, idx) => (
            <OptionItem
              key={option.id || idx}
              option={option}
              index={idx}
              isSelected={selectedOption === (option.id || ['A', 'B', 'C', 'D'][idx])}
              onSelect={onSelectOption}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
