import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OptionItem } from './OptionItem';
import { Badge } from '../ui/Badge';
import { DataTable } from '../ui/DataTable';
import { CodeBlock } from '../ui/CodeBlock';
import { OutputBlock } from '../ui/OutputBlock';
import { Check, Loader2, AlertCircle } from 'lucide-react';

export const QuestionCard = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  onSelectOption,
  saveStatus = 'idle', // 'idle' | 'saving' | 'retrying' | 'saved' | 'error'
  disabled = false,
}) => {
  if (!question) return null;

  const title = question.questionText || question.question || '';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id || question.questionId}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={`w-full bg-white rounded-xl p-6 sm:p-8 border border-[#D0DBD5] shadow-xs transition-opacity ${
          disabled ? 'opacity-60 pointer-events-none' : ''
        }`}
      >
        {/* Question Header & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#D0DBD5]">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold font-comfortaa uppercase tracking-wider text-[#39716B] bg-[#EEF2ED] px-3 py-1 rounded-md border border-[#C8D6CD]">
              Question {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-xs text-[#52605A] font-medium font-poppins">
              Single Choice MCQ
            </span>

            {/* Inline Save Status */}
            {saveStatus === 'saving' && (
              <span className="inline-flex items-center gap-1 text-[11px] text-[#52605A] font-poppins animate-pulse">
                <Loader2 className="w-3 h-3 animate-spin text-[#39716B]" /> Saving...
              </span>
            )}
            {saveStatus === 'retrying' && (
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 font-poppins font-medium">
                <Loader2 className="w-3 h-3 animate-spin" /> Retrying save...
              </span>
            )}
            {saveStatus === 'saved' && (
              <span className="inline-flex items-center gap-1 text-[11px] text-[#39D98A] font-poppins font-semibold">
                <Check className="w-3.5 h-3.5 text-[#39D98A] stroke-[3]" /> Saved
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="inline-flex items-center gap-1 text-[11px] text-red-600 font-poppins font-medium">
                <AlertCircle className="w-3 h-3" /> Save failed (will retry)
              </span>
            )}
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

        {/* Question Primary Text */}
        <div className="pt-5 pb-2">
          <h2 className="text-base sm:text-lg md:text-xl font-bold font-comfortaa text-[#18231F] leading-snug">
            {title}
          </h2>
        </div>

        {/* Structured Component 1: Data Table (SQL) */}
        {question.tableData && (
          <DataTable tableData={question.tableData} tableName={question.tableName} />
        )}

        {/* Structured Component 2: Code Block (Python / Java / SQL) */}
        {question.codeSnippet && (
          <CodeBlock code={question.codeSnippet} language={question.category} />
        )}

        {/* Structured Component 3: Output Block (Console / Patterns) */}
        {question.outputBlock && (
          <OutputBlock output={question.outputBlock} />
        )}

        {/* MCQ Options List */}
        <div className="space-y-3 pt-3">
          {question.options &&
            question.options.map((option, idx) => (
              <OptionItem
                key={option.id || idx}
                option={option}
                index={idx}
                isSelected={selectedOption === (option.id || ['A', 'B', 'C', 'D'][idx])}
                onSelect={disabled ? () => {} : onSelectOption}
              />
            ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
