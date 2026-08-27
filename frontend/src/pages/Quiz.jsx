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
    status: 'idle', // 'idle' | 'submitting' | 'success' | 'error'
    error: null,
  });

  const [isLocked, setIsLocked] = useState(false);

  // Single-submission lock ref and deduplication timestamp refs
  const submissionLockRef = useRef(false);
  const lastActivityTimestampRef = useRef(0);
  const wasHiddenRef = useRef(false);
  const pendingSaveRef = useRef(null);

  const maxWarnings = activityWarnings?.maxWarnings || eventConfig?.maxActivityWarnings || 2;

  // Cleanup on unmount for hygiene
  useEffect(() => {
    return () => {
      submissionLockRef.current = false;
    };
  }, []);

  // If no participant or quiz is already submitted, redirect
  useEffect(() => {
    if (!participant) {
      navigate('/register');
    } else if (quizStatus === 'submitted') {
      navigate('/result');
    }
  }, [participant, quizStatus, navigate]);

  const handleSelectOption = useCallback((optionId) => {
    if (!isLocked && !submissionLockRef.current && currentQuestion) {
      const qId = currentQuestion.questionId !== undefined ? currentQuestion.questionId : currentQuestion.id;
      if (qId !== undefined && qId !== null) {
        pendingSaveRef.current = selectAnswer(qId, optionId);
      }
    }
  }, [isLocked, selectAnswer, currentQuestion]);

  // Robust Auto-Submission Handler (with brief pending save wait and safe 3-attempt retry)
  const performAutoSubmission = useCallback(async () => {
    setWarningModal((prev) => ({
      ...prev,
      isOpen: true,
      type: 'LIMIT_REACHED',
      status: 'submitting',
      error: null,
    }));

    // 1. Wait briefly (max 800ms) for any in-flight answer save to complete
    if (pendingSaveRef.current) {
      try {
        await Promise.race([
          pendingSaveRef.current,
          new Promise((r) => setTimeout(r, 800)),
        ]);
      } catch (e) {
        console.warn('In-flight save wait completed:', e);
      }
    }

    // 2. Submit with robust retry mechanism (up to 3 attempts with backoff)
    let finalResult = null;
    let submitError = null;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        finalResult = await submitQuiz(true);
        if (finalResult && typeof finalResult.score === 'number') {
          break;
        }
      } catch (err) {
        console.error(`Auto-submission attempt ${attempt} failed:`, err);
        submitError = err?.message || 'Failed to submit assessment to server.';
        if (attempt < 3) {
          await new Promise((r) => setTimeout(r, 800 * attempt));
        }
      }
    }

    if (finalResult && typeof finalResult.score === 'number') {
      setWarningModal((prev) => ({ ...prev, status: 'success' }));
      setTimeout(() => {
        navigate('/result');
      }, 400);
    } else {
      // Display clear recovery error state with retry button — NEVER leave stuck on infinite loading
      setWarningModal((prev) => ({
        ...prev,
        status: 'error',
        error: submitError || 'Connection issue submitting assessment. Your answers are preserved locally.',
      }));
    }
  }, [submitQuiz, navigate]);

  // Immediately lock quiz and initiate auto-submit when limit is reached
  const triggerAutoSubmitLock = useCallback(() => {
    if (submissionLockRef.current) return; // run once
    submissionLockRef.current = true;
    setIsLocked(true);

    setWarningModal({
      isOpen: true,
      type: 'LIMIT_REACHED',
      currentWarning: maxWarnings,
      status: 'submitting',
      error: null,
    });

    performAutoSubmission();
  }, [maxWarnings, performAutoSubmission]);

  // Unified activity event processing with robust client-side deduplication
  const processActivityEvent = useCallback(async (activityType) => {
    if (quizStatus !== 'in_progress' || isLocked || submissionLockRef.current) return;

    // Client-side debouncing: ignore duplicate events within 2000ms
    const now = Date.now();
    if (now - lastActivityTimestampRef.current < 2000) return;
    lastActivityTimestampRef.current = now;

    try {
      const res = await recordActivity(activityType);
      if (!res) return;

      const warnCount = res.totalWarnings || 1;
      const limitReached = Boolean(
        res.shouldAutoSubmit || res.autoSubmitRequired || warnCount >= maxWarnings
      );

      if (limitReached) {
        triggerAutoSubmitLock();
      } else {
        setWarningModal({
          isOpen: true,
          type: activityType,
          currentWarning: warnCount,
          status: 'idle',
          error: null,
        });
      }
    } catch (err) {
      console.warn('Error recording activity event:', err);
    }
  }, [quizStatus, isLocked, maxWarnings, recordActivity, triggerAutoSubmitLock]);

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

      // Only trigger warning when exiting fullscreen
      if (!isFullscreen && quizStatus === 'in_progress' && !isLocked && !submissionLockRef.current) {
        await processActivityEvent('FULLSCREEN_EXIT');
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
  }, [quizStatus, isLocked, eventConfig?.fullscreenRequired, processActivityEvent]);

  // 2. TAB SWITCH & VISIBILITY CHANGE DETECTION (Deduplicated single leave-and-return cycle)
  useEffect(() => {
    if (quizStatus !== 'in_progress' || eventConfig?.tabSwitchMonitoring === false) return;

    const handleVisibilityChange = async () => {
      if (document.hidden) {
        wasHiddenRef.current = true;
      } else {
        // User returned to the tab
        if (wasHiddenRef.current && quizStatus === 'in_progress' && !isLocked && !submissionLockRef.current) {
          wasHiddenRef.current = false;
          await processActivityEvent('TAB_SWITCH');
        }
      }
    };

    const handleWindowBlur = () => {
      wasHiddenRef.current = true;
    };

    const handleWindowFocus = async () => {
      if (wasHiddenRef.current && quizStatus === 'in_progress' && !isLocked && !submissionLockRef.current) {
        wasHiddenRef.current = false;
        await processActivityEvent('TAB_SWITCH');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [quizStatus, isLocked, eventConfig?.tabSwitchMonitoring, processActivityEvent]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLocked || submissionLockRef.current) return;
      if (['input', 'textarea', 'select'].includes(e.target.tagName.toLowerCase())) {
        return;
      }

      if (e.key === 'ArrowRight' && currentIndex < totalQuestions - 1) {
        nextQuestion();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        prevQuestion();
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const optionMap = { '1': 'A', '2': 'B', '3': 'C', '4': 'D' };
        handleSelectOption(optionMap[e.key]);
      } else if (['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'].includes(e.key)) {
        handleSelectOption(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalQuestions, nextQuestion, prevQuestion, handleSelectOption, isLocked]);

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitQuiz(false);
      setSubmitModalOpen(false);
      navigate('/result');
    } catch (err) {
      console.error('Manual submission error:', err);
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
      console.warn('Re-request fullscreen notice:', e);
    }
  };

  const isLastQuestion = currentIndex === totalQuestions - 1;
  const currentQId = currentQuestion ? (currentQuestion.questionId !== undefined ? currentQuestion.questionId : currentQuestion.id) : null;
  const currentSelectedOption = currentQId !== null ? (answers[currentQId] || answers[String(currentQId)] || null) : null;
  const currentSaveStatus = currentQId !== null ? (saveStatusMap[currentQId] || saveStatusMap[String(currentQId)] || 'idle') : 'idle';

  return (
    <PageTransition className="bg-ivory pb-20 lg:pb-8">
      {/* Quiz Top Header */}
      <QuizHeader
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        remainingSeconds={remainingSeconds}
        answeredCount={answeredCount}
        onOpenSubmitModal={() => !isLocked && !submissionLockRef.current && setSubmitModalOpen(true)}
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
              disabled={isLocked || submissionLockRef.current}
            />

            {/* Quiz Navigation Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentIndex === 0 || isLocked || submissionLockRef.current}
                  icon={ArrowLeft}
                  iconPosition="left"
                  className="font-semibold text-xs sm:text-sm"
                >
                  PREVIOUS
                </Button>

                {currentSelectedOption && !isLocked && !submissionLockRef.current && (
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
                    disabled={isLocked || submissionLockRef.current}
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
                    disabled={isLocked || submissionLockRef.current}
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
            questions={questions}
            totalQuestions={totalQuestions}
            currentIndex={currentIndex}
            answers={answers}
            onSelectQuestion={isLocked || submissionLockRef.current ? () => {} : goToQuestion}
            onOpenSubmitModal={() => !isLocked && !submissionLockRef.current && setSubmitModalOpen(true)}
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
        status={warningModal.status || 'idle'}
        error={warningModal.error}
        onAcknowledge={() => setWarningModal((prev) => ({ ...prev, isOpen: false }))}
        onReturnFullscreen={handleReturnToFullscreen}
        onRetrySubmit={performAutoSubmission}
      />
    </PageTransition>
  );
};
