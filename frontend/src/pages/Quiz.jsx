import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Send,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { QuizHeader } from '../components/quiz/QuizHeader';
import { QuestionCard } from '../components/quiz/QuestionCard';
import { QuestionNavigator } from '../components/quiz/QuestionNavigator';
import { SubmitModal } from '../components/quiz/SubmitModal';
import { ActivityWarningModal } from '../components/quiz/ActivityWarningModal';
import { Button } from '../components/ui/Button';
import { FloatingCodeBg } from '../components/common/FloatingCodeBg';
import { PageTransition } from '../components/layout/PageTransition';

export const Quiz = () => {
  const navigate = useNavigate();
  const {
    participant,
    questions,
    answers,
    saveStatusMap,
    currentIndex,
    currentQuestion,
    remainingSeconds,
    quizStatus,
    activityWarnings,
    answeredCount,
    unansweredCount,
    totalQuestions,
    eventConfig,
    selectAnswer,
    clearAnswer,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    submitQuiz,
    recordActivity,
  } = useQuiz();

  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Activity Warning Modal state
  const [warningModal, setWarningModal] = useState({
    isOpen: false,
    type: 'TAB_SWITCH', // 'TAB_SWITCH' | 'FULLSCREEN_EXIT' | 'LIMIT_REACHED'
    currentWarning: 1,
    countdown: 3,
  });

  const [isLocked, setIsLocked] = useState(false);

  // State guards for debounced / single-fire event listeners
  const wasHiddenRef = useRef(false);
  const lastFullscreenCheckRef = useRef(Date.now());
  const autoSubmitTimerRef = useRef(null);

  const maxWarnings = activityWarnings?.maxWarnings || eventConfig?.maxActivityWarnings || 2;

  // If no participant or quiz is already submitted, redirect
  useEffect(() => {
    if (!participant) {
      navigate('/register');
    } else if (quizStatus === 'submitted') {
      navigate('/result');
    }
  }, [participant, quizStatus, navigate]);

  // Check if warning limit reached from backend state
  const handleWarningLimitReached = useCallback(() => {
    setIsLocked(true);
    setWarningModal({
      isOpen: true,
      type: 'LIMIT_REACHED',
      currentWarning: maxWarnings,
      countdown: 3,
    });

    let count = 3;
    const interval = setInterval(() => {
      count -= 1;
      setWarningModal((prev) => ({ ...prev, countdown: Math.max(0, count) }));
      if (count <= 0) {
        clearInterval(interval);
        submitQuiz(true).then(() => {
          navigate('/result');
        });
      }
    }, 1000);

    autoSubmitTimerRef.current = interval;
  }, [maxWarnings, submitQuiz, navigate]);

  // 1. FULLSCREEN EXIT DETECTION
  useEffect(() => {
    if (quizStatus !== 'in_progress' || eventConfig?.fullscreenRequired === false) return;

    const handleFullscreenChange = async () => {
      const isFullscreen = Boolean(
        document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
      );

      // Debounce rapid window changes
      const now = Date.now();
      if (now - lastFullscreenCheckRef.current < 1200) return;
      lastFullscreenCheckRef.current = now;

      if (!isFullscreen && quizStatus === 'in_progress' && !isLocked) {
        const res = await recordActivity('FULLSCREEN_EXIT');
        const warnCount = res?.totalWarnings || (activityWarnings?.totalWarnings || 0) + 1;

        if (res?.shouldAutoSubmit || warnCount >= maxWarnings) {
          handleWarningLimitReached();
        } else {
          setWarningModal({
            isOpen: true,
            type: 'FULLSCREEN_EXIT',
            currentWarning: warnCount,
            countdown: 3,
          });
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [quizStatus, isLocked, eventConfig?.fullscreenRequired, recordActivity, activityWarnings, maxWarnings, handleWarningLimitReached]);

  // 2. TAB SWITCH & VISIBILITY CHANGE DETECTION (Single hide→show cycle guard)
  useEffect(() => {
    if (quizStatus !== 'in_progress' || eventConfig?.tabSwitchMonitoring === false) return;

    const handleVisibilityChange = async () => {
      if (document.hidden) {
        wasHiddenRef.current = true;
      } else {
        // Transition from hidden -> visible
        if (wasHiddenRef.current && !isLocked && quizStatus === 'in_progress') {
          wasHiddenRef.current = false;
          const res = await recordActivity('TAB_SWITCH');
          const warnCount = res?.totalWarnings || (activityWarnings?.totalWarnings || 0) + 1;

          if (res?.shouldAutoSubmit || warnCount >= maxWarnings) {
            handleWarningLimitReached();
          } else {
            setWarningModal({
              isOpen: true,
              type: 'TAB_SWITCH',
              currentWarning: warnCount,
              countdown: 3,
            });
          }
        }
      }
    };

    const handleWindowBlur = () => {
      wasHiddenRef.current = true;
    };

    const handleWindowFocus = async () => {
      if (wasHiddenRef.current && !isLocked && quizStatus === 'in_progress') {
        wasHiddenRef.current = false;
        const res = await recordActivity('TAB_SWITCH');
        const warnCount = res?.totalWarnings || (activityWarnings?.totalWarnings || 0) + 1;

        if (res?.shouldAutoSubmit || warnCount >= maxWarnings) {
          handleWarningLimitReached();
        } else {
          setWarningModal({
            isOpen: true,
            type: 'TAB_SWITCH',
            currentWarning: warnCount,
            countdown: 3,
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      if (autoSubmitTimerRef.current) clearInterval(autoSubmitTimerRef.current);
    };
  }, [quizStatus, isLocked, eventConfig?.tabSwitchMonitoring, recordActivity, activityWarnings, maxWarnings, handleWarningLimitReached]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLocked) return;
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
  }, [currentIndex, totalQuestions, currentQuestion, nextQuestion, prevQuestion, selectAnswer, isLocked]);

  const handleSelectOption = (optionId) => {
    if (!isLocked) {
      selectAnswer(currentQuestion.id, optionId);
    }
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

  // Re-request fullscreen on modal action
  const handleReturnToFullscreen = async () => {
    setWarningModal((prev) => ({ ...prev, isOpen: false }));
    try {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        await docEl.requestFullscreen().catch(() => {});
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen();
      }
    } catch (e) {
      console.warn('Re-request fullscreen failed:', e);
    }
  };

  const isLastQuestion = currentIndex === totalQuestions - 1;
  const currentSelectedOption = answers[currentQuestion?.id] || null;
  const currentSaveStatus = saveStatusMap[currentQuestion?.id] || 'idle';

  return (
    <PageTransition className="bg-ivory pb-20 lg:pb-8">
      {/* Quiz Top Header */}
      <QuizHeader
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        remainingSeconds={remainingSeconds}
        answeredCount={answeredCount}
        onOpenSubmitModal={() => !isLocked && setSubmitModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative font-poppins">
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
              saveStatus={currentSaveStatus}
              disabled={isLocked}
            />

            {/* Quiz Navigation Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentIndex === 0 || isLocked}
                  icon={ArrowLeft}
                  iconPosition="left"
                  className="font-semibold text-xs sm:text-sm"
                >
                  PREVIOUS
                </Button>

                {currentSelectedOption && !isLocked && (
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
                    disabled={isLocked}
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
                    disabled={isLocked}
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
            <div className="hidden sm:flex items-center justify-center gap-4 text-[11px] text-drabDark/50 pt-4 font-poppins">
              <span>Shortcuts:</span>
              <kbd className="px-2 py-0.5 rounded bg-white border border-teaGreen-300 font-mono text-[10px]">A-D / 1-4</kbd> Select Option
              <span>•</span>
              <kbd className="px-2 py-0.5 rounded bg-white border border-teaGreen-300 font-mono text-[10px]">← / →</kbd> Next/Prev
            </div>
          </div>

          {/* Question Navigator */}
          <QuestionNavigator
            totalQuestions={totalQuestions}
            currentIndex={currentIndex}
            answers={answers}
            onSelectQuestion={isLocked ? () => {} : goToQuestion}
            onOpenSubmitModal={() => !isLocked && setSubmitModalOpen(true)}
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

      {/* Activity Warning Alert Modal */}
      <ActivityWarningModal
        isOpen={warningModal.isOpen}
        type={warningModal.type}
        currentWarning={warningModal.currentWarning}
        maxWarnings={maxWarnings}
        countdown={warningModal.countdown}
        onAcknowledge={() => setWarningModal((prev) => ({ ...prev, isOpen: false }))}
        onReturnFullscreen={handleReturnToFullscreen}
      />
    </PageTransition>
  );
};
