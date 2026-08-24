import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Send,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { QuizHeader } from '../components/quiz/QuizHeader';
import { QuestionCard } from '../components/quiz/QuestionCard';
import { QuestionNavigator } from '../components/quiz/QuestionNavigator';
import { SubmitModal } from '../components/quiz/SubmitModal';
import { Button } from '../components/ui/Button';
import { FloatingCodeBg } from '../components/common/FloatingCodeBg';
import { PageTransition } from '../components/layout/PageTransition';

export const Quiz = () => {
  const navigate = useNavigate();
  const {
    participant,
    questions,
    answers,
    currentIndex,
    currentQuestion,
    remainingSeconds,
    quizStatus,
    answeredCount,
    unansweredCount,
    totalQuestions,
    selectAnswer,
    clearAnswer,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    submitQuiz,
  } = useQuiz();

  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If no participant or quiz is already submitted, redirect
  useEffect(() => {
    if (!participant) {
      navigate('/register');
    } else if (quizStatus === 'submitted') {
      navigate('/result');
    }
  }, [participant, quizStatus, navigate]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if typing in an input
      if (['input', 'textarea', 'select'].includes(e.target.tagName.toLowerCase())) {
        return;
      }

      if (e.key === 'ArrowRight' && currentIndex < totalQuestions - 1) {
        nextQuestion();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        prevQuestion();
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const optionMap = { '1': 'A', '2': 'B', '3': 'C', '4': 'D' };
        selectAnswer(currentQuestion.id, optionMap[e.key]);
      } else if (['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'].includes(e.key)) {
        selectAnswer(currentQuestion.id, e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalQuestions, currentQuestion, nextQuestion, prevQuestion, selectAnswer]);

  const handleSelectOption = (optionId) => {
    selectAnswer(currentQuestion.id, optionId);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitQuiz(false);
      setSubmitModalOpen(false);
      navigate('/result');
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const isLastQuestion = currentIndex === totalQuestions - 1;
  const currentSelectedOption = answers[currentQuestion?.id] || null;

  return (
    <PageTransition className="bg-ivory pb-20 lg:pb-8">
      {/* Quiz Top Header */}
      <QuizHeader
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        remainingSeconds={remainingSeconds}
        answeredCount={answeredCount}
        onOpenSubmitModal={() => setSubmitModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative">
        <FloatingCodeBg opacity={0.25} />

        <div className="flex flex-col lg:flex-row gap-8 items-start relative z-10">
          {/* Main Question Column */}
          <div className="flex-1 w-full space-y-6">
            {/* Active Question Card */}
            <QuestionCard
              question={currentQuestion}
              currentIndex={currentIndex}
              totalQuestions={totalQuestions}
              selectedOption={currentSelectedOption}
              onSelectOption={handleSelectOption}
            />

            {/* Quiz Navigation Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentIndex === 0}
                  icon={ArrowLeft}
                  iconPosition="left"
                  className="font-semibold text-xs sm:text-sm"
                >
                  PREVIOUS
                </Button>

                {currentSelectedOption && (
                  <button
                    type="button"
                    onClick={() => clearAnswer(currentQuestion.id)}
                    className="text-xs text-drabDark/60 hover:text-drabDark px-2.5 py-1.5 rounded-lg hover:bg-teaGreen-200/40 transition-colors"
                  >
                    Clear Choice
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                {isLastQuestion ? (
                  <Button
                    variant="primary"
                    onClick={() => setSubmitModalOpen(true)}
                    icon={Send}
                    iconPosition="right"
                    className="font-bold text-xs sm:text-sm bg-drabDark hover:bg-drabDark-700 border-drabDark-800"
                  >
                    SUBMIT QUIZ
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={nextQuestion}
                    icon={ArrowRight}
                    iconPosition="right"
                    className="font-bold text-xs sm:text-sm shadow-md"
                  >
                    NEXT
                  </Button>
                )}
              </div>
            </div>

            {/* Subtle Keyboard Shortcuts Tip */}
            <div className="hidden sm:flex items-center justify-center gap-4 text-[11px] text-drabDark/50 pt-4">
              <span>Shortcuts:</span>
              <kbd className="px-2 py-0.5 rounded bg-white border border-teaGreen-300 font-mono text-[10px]">A-D / 1-4</kbd> Select Option
              <span>•</span>
              <kbd className="px-2 py-0.5 rounded bg-white border border-teaGreen-300 font-mono text-[10px]">← / →</kbd> Next/Prev
            </div>
          </div>

          {/* Question Navigator (Right Sidebar Desktop / Bottom Drawer Mobile) */}
          <QuestionNavigator
            totalQuestions={totalQuestions}
            currentIndex={currentIndex}
            answers={answers}
            onSelectQuestion={goToQuestion}
            onOpenSubmitModal={() => setSubmitModalOpen(true)}
          />
        </div>
      </main>

      {/* Submission Confirmation Modal */}
      <SubmitModal
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        onSubmit={handleConfirmSubmit}
        answeredCount={answeredCount}
        unansweredCount={unansweredCount}
        totalQuestions={totalQuestions}
        isSubmitting={isSubmitting}
      />
    </PageTransition>
  );
};
