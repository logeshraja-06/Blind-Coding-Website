import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { QUIZ_QUESTIONS, QUIZ_DURATION_SECONDS, TOTAL_QUESTIONS } from '../data/questions';
import { api } from '../services/api';
import { useToast } from './ToastContext';

const QuizContext = createContext(null);

export const QuizProvider = ({ children }) => {
  const { addToast } = useToast();

  // Participant state
  const [participant, setParticipant] = useState(() => {
    const saved = localStorage.getItem('blindcode_student');
    return saved ? JSON.parse(saved) : null;
  });

  // Quiz active questions
  const [questions, setQuestions] = useState(QUIZ_QUESTIONS);

  // Selected answers: { [questionId]: 'A' | 'B' | 'C' | 'D' }
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem('blindcode_answers');
    return saved ? JSON.parse(saved) : {};
  });

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

  // Remaining time in seconds
  const [remainingSeconds, setRemainingSeconds] = useState(() => {
    const savedStart = localStorage.getItem('blindcode_started_at');
    if (!savedStart) return QUIZ_DURATION_SECONDS;
    const elapsed = Math.floor((Date.now() - parseInt(savedStart, 10)) / 1000);
    return Math.max(0, QUIZ_DURATION_SECONDS - elapsed);
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

  // Load sanitized questions from backend on mount
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const list = await api.getQuestions();
        if (list && list.length > 0) {
          setQuestions(list);
        }
      } catch (err) {
        console.warn('Using local question bank');
      }
    };
    loadQuestions();
  }, []);

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

    // Call Backend API
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
    }

    return response;
  }, []);

  // Start Quiz
  const startQuiz = useCallback(async () => {
    const now = Date.now();
    setStartedAt(now);
    setQuizStatus('in_progress');
    setRemainingSeconds(QUIZ_DURATION_SECONDS);
    setCurrentIndex(0);
    localStorage.setItem('blindcode_started_at', now.toString());
    localStorage.removeItem('blindcode_result');
    localStorage.setItem('blindcode_current_q', '0');

    // Notify backend
    if (participant?.registerNumber) {
      await api.startQuiz(participant.registerNumber);
    }

    addToast('Quiz started! 60 minutes countdown begins.', 'info', 4000);
  }, [participant, addToast]);

  // Select an option for a question
  const selectAnswer = useCallback((questionId, optionId) => {
    setAnswers((prev) => {
      const updated = { ...prev, [questionId]: optionId };
      localStorage.setItem('blindcode_answers', JSON.stringify(updated));
      return updated;
    });

    // Auto-save to backend
    if (participant?.registerNumber) {
      api.saveAnswer(participant.registerNumber, questionId, optionId);
    }

    addToast('Answer saved ✓', 'success', 1500);
  }, [participant, addToast]);

  // Clear answer for current question
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

  // Navigate to specific question index
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

  // Submit assessment (Backend computes score)
  const submitQuiz = useCallback(async (isAutoSubmit = false) => {
    const regNo = participant?.registerNumber;
    let backendResult = null;

    if (regNo) {
      const response = await api.submitQuiz(regNo, isAutoSubmit);
      if (response.success && response.result) {
        backendResult = response.result;
      }
    }

    // Client computation fallback if offline
    if (!backendResult) {
      const currentStart = startedAt || parseInt(localStorage.getItem('blindcode_started_at') || `${Date.now()}`, 10);
      const elapsedSeconds = Math.min(QUIZ_DURATION_SECONDS, Math.floor((Date.now() - currentStart) / 1000));
      const mins = Math.floor(elapsedSeconds / 60);
      const secs = elapsedSeconds % 60;
      const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

      // Calculate approximate score
      let correct = 0;
      questions.forEach((q) => {
        if (answers[q.id || q.questionId] === q.correctAnswer) correct++;
      });
      const percentage = Math.round((correct / TOTAL_QUESTIONS) * 100);
      let performanceTier = 'KEEP LEARNING';
      if (percentage >= 90) performanceTier = 'EXCELLENT PERFORMANCE';
      else if (percentage >= 70) performanceTier = 'GREAT WORK';
      else if (percentage >= 50) performanceTier = 'GOOD ATTEMPT';

      backendResult = {
        studentName: participant?.name || 'Participant',
        registerNumber: participant?.registerNumber || '953710',
        score: correct,
        total: TOTAL_QUESTIONS,
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

    if (isAutoSubmit) {
      addToast('Time is up! Your challenge has been submitted automatically.', 'warning', 6000);
    } else {
      addToast('Challenge submitted successfully!', 'success', 4000);
    }

    return backendResult;
  }, [answers, startedAt, questions, participant, addToast]);

  // Active Timer Loop
  useEffect(() => {
    if (quizStatus !== 'in_progress' || !startedAt) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      const left = QUIZ_DURATION_SECONDS - elapsed;

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
  }, [quizStatus, startedAt, submitQuiz, addToast]);

  // Reset demo
  const resetQuizState = useCallback(() => {
    localStorage.removeItem('blindcode_started_at');
    localStorage.removeItem('blindcode_answers');
    localStorage.removeItem('blindcode_result');
    localStorage.removeItem('blindcode_current_q');
    setAnswers({});
    setCurrentIndex(0);
    setStartedAt(null);
    setRemainingSeconds(QUIZ_DURATION_SECONDS);
    setQuizStatus('idle');
    setQuizResult(null);
  }, []);

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = TOTAL_QUESTIONS - answeredCount;

  return (
    <QuizContext.Provider
      value={{
        participant,
        questions,
        answers,
        currentIndex,
        currentQuestion: questions[currentIndex] || questions[0],
        startedAt,
        remainingSeconds,
        quizStatus,
        quizResult,
        answeredCount,
        unansweredCount,
        totalQuestions: TOTAL_QUESTIONS,
        registerStudent,
        startQuiz,
        selectAnswer,
        clearAnswer,
        goToQuestion,
        nextQuestion,
        prevQuestion,
        submitQuiz,
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
