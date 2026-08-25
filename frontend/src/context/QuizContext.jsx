import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { QUIZ_QUESTIONS, QUIZ_DURATION_SECONDS, TOTAL_QUESTIONS } from '../data/questions';
import { api } from '../services/api';
import { useToast } from './ToastContext';

const QuizContext = createContext(null);

export const QuizProvider = ({ children }) => {
  const { addToast } = useToast();

  // Dynamic Event Configuration (Default max warnings = 2)
  const [eventConfig, setEventConfig] = useState({
    eventTitle: 'BLIND CODING',
    quizDurationMinutes: 60,
    totalQuestions: TOTAL_QUESTIONS,
    maxActivityWarnings: 2,
    fullscreenRequired: true,
    tabSwitchMonitoring: true,
    quizAvailability: 'ACTIVE',
  });

  // Participant state
  const [participant, setParticipant] = useState(() => {
    const saved = localStorage.getItem('blindcode_student');
    return saved ? JSON.parse(saved) : null;
  });

  // Quiz active questions (Ordered & shuffled per student)
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('blindcode_assigned_questions');
    return saved ? JSON.parse(saved) : QUIZ_QUESTIONS;
  });

  // Selected answers: { [questionId]: 'A' | 'B' | 'C' | 'D' } (stable option IDs)
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem('blindcode_answers');
    return saved ? JSON.parse(saved) : {};
  });

  // Answer saving status map: { [questionId]: 'idle' | 'saving' | 'retrying' | 'saved' | 'error' }
  const [saveStatusMap, setSaveStatusMap] = useState({});

  // Current active question index (0 to 24)
  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = localStorage.getItem('blindcode_current_q');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Start timestamp
  const [startedAt, setStartedAt] = useState(() => {
    const saved = localStorage.getItem('blindcode_started_at');
    return saved ? parseInt(saved, 10) : null;
  });

  // Activity Warning Counts
  const [activityWarnings, setActivityWarnings] = useState(() => {
    const saved = localStorage.getItem('blindcode_activity_warnings');
    return saved
      ? JSON.parse(saved)
      : { tabSwitchCount: 0, fullscreenExitCount: 0, totalWarnings: 0, maxWarnings: 2 };
  });

  // Duration in seconds (dynamic from config)
  const durationSeconds = (eventConfig.quizDurationMinutes || 60) * 60;

  // Remaining time in seconds
  const [remainingSeconds, setRemainingSeconds] = useState(() => {
    const savedStart = localStorage.getItem('blindcode_started_at');
    if (!savedStart) return durationSeconds;
    const elapsed = Math.floor((Date.now() - parseInt(savedStart, 10)) / 1000);
    return Math.max(0, durationSeconds - elapsed);
  });

  // Quiz status: 'idle' | 'in_progress' | 'submitted'
  const [quizStatus, setQuizStatus] = useState(() => {
    const savedResult = localStorage.getItem('blindcode_result');
    if (savedResult) return 'submitted';
    const savedStart = localStorage.getItem('blindcode_started_at');
    if (savedStart) return 'in_progress';
    return 'idle';
  });

  // Completed private result summary (NO answer key leakage)
  const [quizResult, setQuizResult] = useState(() => {
    const saved = localStorage.getItem('blindcode_result');
    return saved ? JSON.parse(saved) : null;
  });

  // Fetch Public Event Config & Questions on Mount
  useEffect(() => {
    const loadConfigAndQuestions = async () => {
      try {
        const [config, list] = await Promise.all([
          api.getQuizConfig(),
          api.getQuestions(participant?.registerNumber),
        ]);
        if (config) {
          setEventConfig((prev) => ({ ...prev, ...config }));
        }
        // Only override questions if local assigned questions not already stored
        const savedAssigned = localStorage.getItem('blindcode_assigned_questions');
        if (!savedAssigned && list && list.length > 0) {
          setQuestions(list);
        }
      } catch (err) {
        console.warn('Using local fallback question bank and configuration');
      }
    };
    loadConfigAndQuestions();
  }, [participant?.registerNumber]);

  // Save student registration
  const registerStudent = useCallback(async (details) => {
    const studentObj = {
      name: details.fullName.trim(),
      registerNumber: details.registerNumber.trim(),
      department: details.department || 'Department of Computer Science and Engineering',
      year: details.year,
      className: details.className.trim(),
      section: details.section.trim(),
    };

    const response = await api.registerStudent(studentObj);
    if (!response.success && response.status === 'COMPLETED') {
      throw new Error(response.message || 'You have already completed the Blind Coding challenge.');
    }

    const finalStudent = response.student || studentObj;
    setParticipant(finalStudent);
    localStorage.setItem('blindcode_student', JSON.stringify(finalStudent));

    if (response.isResume && response.attempt) {
      if (response.attempt.answers) {
        setAnswers(response.attempt.answers);
        localStorage.setItem('blindcode_answers', JSON.stringify(response.attempt.answers));
      }
      if (response.attempt.startedAt) {
        const startMs = new Date(response.attempt.startedAt).getTime();
        setStartedAt(startMs);
        localStorage.setItem('blindcode_started_at', startMs.toString());
      }
      if (response.attempt.totalWarnings !== undefined) {
        const warnings = {
          tabSwitchCount: response.attempt.tabSwitchCount || 0,
          fullscreenExitCount: response.attempt.fullscreenExitCount || 0,
          totalWarnings: response.attempt.totalWarnings || 0,
          maxWarnings: eventConfig.maxActivityWarnings || 2,
        };
        setActivityWarnings(warnings);
        localStorage.setItem('blindcode_activity_warnings', JSON.stringify(warnings));
      }
    }

    return response;
  }, [eventConfig.maxActivityWarnings]);

  // Start Quiz (Server assigns randomized questions & option order once)
  const startQuiz = useCallback(async () => {
    const regNo = participant?.registerNumber;
    let serverRes = null;

    if (regNo) {
      serverRes = await api.startQuiz(regNo);
      if (serverRes && !serverRes.success) {
        throw new Error(serverRes.message || 'Unable to start quiz.');
      }
    }

    const startMs = serverRes?.startedAt ? new Date(serverRes.startedAt).getTime() : Date.now();
    const remaining = serverRes?.remainingSeconds !== undefined ? serverRes.remainingSeconds : durationSeconds;
    const maxWarn = serverRes?.maxWarnings || eventConfig.maxActivityWarnings || 2;

    setStartedAt(startMs);
    setQuizStatus('in_progress');
    setRemainingSeconds(remaining);
    setCurrentIndex(0);

    const initialWarnings = {
      tabSwitchCount: serverRes?.tabSwitchCount || 0,
      fullscreenExitCount: serverRes?.fullscreenExitCount || 0,
      totalWarnings: serverRes?.totalWarnings || 0,
      maxWarnings: maxWarn,
    };
    setActivityWarnings(initialWarnings);

    // Save assigned questions order (Fisher-Yates shuffled by server)
    if (serverRes?.questions && serverRes.questions.length > 0) {
      setQuestions(serverRes.questions);
      localStorage.setItem('blindcode_assigned_questions', JSON.stringify(serverRes.questions));
    }

    localStorage.setItem('blindcode_started_at', startMs.toString());
    localStorage.setItem('blindcode_activity_warnings', JSON.stringify(initialWarnings));
    localStorage.removeItem('blindcode_result');
    localStorage.setItem('blindcode_current_q', '0');

    if (serverRes?.savedAnswers) {
      setAnswers(serverRes.savedAnswers);
      localStorage.setItem('blindcode_answers', JSON.stringify(serverRes.savedAnswers));
    }
  }, [participant, durationSeconds, eventConfig.maxActivityWarnings]);

  // Submit assessment (Unified submission path)
  const submitQuiz = useCallback(async (isAutoSubmit = false) => {
    const regNo = participant?.registerNumber;
    let backendResult = null;

    if (regNo) {
      const response = await api.submitQuiz(regNo, isAutoSubmit);
      if (response.success && response.result) {
        backendResult = response.result;
      }
    }

    // Client fallback if server is offline
    if (!backendResult) {
      const currentStart = startedAt || parseInt(localStorage.getItem('blindcode_started_at') || `${Date.now()}`, 10);
      const elapsedSeconds = Math.min(durationSeconds, Math.floor((Date.now() - currentStart) / 1000));
      const mins = Math.floor(elapsedSeconds / 60);
      const secs = elapsedSeconds % 60;
      const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

      let correct = 0;
      questions.forEach((q) => {
        if (answers[q.id || q.questionId] === q.correctAnswer) correct++;
      });
      const totalQ = eventConfig.totalQuestions || TOTAL_QUESTIONS;
      const percentage = Math.round((correct / totalQ) * 100);
      let performanceTier = 'KEEP LEARNING';
      if (percentage >= 90) performanceTier = 'EXCELLENT PERFORMANCE';
      else if (percentage >= 70) performanceTier = 'GREAT WORK';
      else if (percentage >= 50) performanceTier = 'GOOD ATTEMPT';

      backendResult = {
        studentName: participant?.name || 'Participant',
        registerNumber: participant?.registerNumber || '953710',
        score: correct,
        total: totalQ,
        percentage,
        performanceTier,
        timeFormatted,
        submittedAt: new Date().toISOString(),
      };
    }

    setQuizResult(backendResult);
    setQuizStatus('submitted');
    localStorage.setItem('blindcode_result', JSON.stringify(backendResult));
    localStorage.removeItem('blindcode_started_at');
    localStorage.removeItem('blindcode_assigned_questions');

    if (isAutoSubmit) {
      addToast('Assessment submitted automatically.', 'warning', 5000);
    } else {
      addToast('Challenge submitted successfully!', 'success', 4000);
    }

    return backendResult;
  }, [participant, startedAt, durationSeconds, questions, answers, eventConfig.totalQuestions, addToast]);

  // Record Activity Event (Tab Switch / Fullscreen Exit)
  const recordActivity = useCallback(async (activityType) => {
    const regNo = participant?.registerNumber;
    if (!regNo || quizStatus !== 'in_progress') return null;

    try {
      const res = await api.logActivity(regNo, activityType);
      if (res && res.success) {
        const updated = {
          tabSwitchCount: res.tabSwitchCount,
          fullscreenExitCount: res.fullscreenExitCount,
          totalWarnings: res.totalWarnings,
          maxWarnings: res.maxWarnings || res.maxActivityWarnings || eventConfig.maxActivityWarnings || 2,
        };
        setActivityWarnings(updated);
        localStorage.setItem('blindcode_activity_warnings', JSON.stringify(updated));

        return { ...res, updatedWarnings: updated };
      }
    } catch (err) {
      console.warn('Error recording activity:', err);
    }
    return null;
  }, [participant, quizStatus, eventConfig.maxActivityWarnings]);

  // Select Option with Subtle Inline Save & Single Auto-Retry
  const selectAnswer = useCallback(async (questionId, optionId) => {
    setAnswers((prev) => {
      const updated = { ...prev, [questionId]: optionId };
      localStorage.setItem('blindcode_answers', JSON.stringify(updated));
      return updated;
    });

    setSaveStatusMap((prev) => ({ ...prev, [questionId]: 'saving' }));

    const regNo = participant?.registerNumber;
    if (regNo) {
      let saveRes = await api.saveAnswer(regNo, questionId, optionId);

      // Single automatic retry on failure
      if (!saveRes || !saveRes.success) {
        setSaveStatusMap((prev) => ({ ...prev, [questionId]: 'retrying' }));
        await new Promise((r) => setTimeout(r, 600));
        saveRes = await api.saveAnswer(regNo, questionId, optionId);
      }

      if (saveRes && saveRes.success) {
        setSaveStatusMap((prev) => ({ ...prev, [questionId]: 'saved' }));
        setTimeout(() => {
          setSaveStatusMap((prev) => ({ ...prev, [questionId]: 'idle' }));
        }, 1200);
      } else {
        setSaveStatusMap((prev) => ({ ...prev, [questionId]: 'error' }));
      }
    } else {
      setSaveStatusMap((prev) => ({ ...prev, [questionId]: 'saved' }));
    }
  }, [participant]);

  // Clear answer
  const clearAnswer = useCallback((questionId) => {
    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[questionId];
      localStorage.setItem('blindcode_answers', JSON.stringify(updated));
      return updated;
    });

    if (participant?.registerNumber) {
      api.saveAnswer(participant.registerNumber, questionId, null);
    }
  }, [participant]);

  // Navigation helpers
  const goToQuestion = useCallback((index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index);
      localStorage.setItem('blindcode_current_q', index.toString());
    }
  }, [questions.length]);

  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      goToQuestion(currentIndex + 1);
    }
  }, [currentIndex, questions.length, goToQuestion]);

  const prevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      goToQuestion(currentIndex - 1);
    }
  }, [currentIndex, goToQuestion]);

  // Active Timer Loop
  useEffect(() => {
    if (quizStatus !== 'in_progress' || !startedAt) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      const left = durationSeconds - elapsed;

      if (left <= 0) {
        setRemainingSeconds(0);
        clearInterval(interval);
        submitQuiz(true);
      } else {
        setRemainingSeconds(left);

        if (left === 300) {
          addToast('5 minutes remaining! Review your selected options.', 'warning', 5000);
        }
        if (left === 60) {
          addToast('1 minute remaining! Final auto-submission in 60s.', 'error', 6000);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [quizStatus, startedAt, durationSeconds, submitQuiz, addToast]);

  // Reset demo state
  const resetQuizState = useCallback(() => {
    localStorage.removeItem('blindcode_started_at');
    localStorage.removeItem('blindcode_answers');
    localStorage.removeItem('blindcode_result');
    localStorage.removeItem('blindcode_current_q');
    localStorage.removeItem('blindcode_activity_warnings');
    localStorage.removeItem('blindcode_assigned_questions');
    setAnswers({});
    setCurrentIndex(0);
    setStartedAt(null);
    setRemainingSeconds(durationSeconds);
    setQuizStatus('idle');
    setQuizResult(null);
    setActivityWarnings({ tabSwitchCount: 0, fullscreenExitCount: 0, totalWarnings: 0, maxWarnings: 2 });
  }, [durationSeconds]);

  const answeredCount = Object.keys(answers).length;
  const totalQ = eventConfig.totalQuestions || questions.length || TOTAL_QUESTIONS;
  const unansweredCount = Math.max(0, totalQ - answeredCount);

  return (
    <QuizContext.Provider
      value={{
        eventConfig,
        participant,
        questions,
        answers,
        saveStatusMap,
        currentIndex,
        currentQuestion: questions[currentIndex] || questions[0],
        startedAt,
        remainingSeconds,
        quizStatus,
        quizResult,
        activityWarnings,
        answeredCount,
        unansweredCount,
        totalQuestions: totalQ,
        registerStudent,
        startQuiz,
        selectAnswer,
        clearAnswer,
        goToQuestion,
        nextQuestion,
        prevQuestion,
        submitQuiz,
        recordActivity,
        resetQuizState,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
