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
  const [questions] = useState(QUIZ_QUESTIONS);

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

  // Completed result summary
  const [quizResult, setQuizResult] = useState(() => {
    const saved = localStorage.getItem('blindcode_result');
    return saved ? JSON.parse(saved) : null;
  });

  // Save student registration
  const registerStudent = useCallback((details) => {
    const studentObj = {
      id: `BC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: details.fullName.trim(),
      department: details.department,
      year: details.year,
      class: details.className,
      section: details.section,
      registerNumber: details.registerNumber ? details.registerNumber.trim() : 'N/A',
      registeredAt: new Date().toISOString()
    };
    setParticipant(studentObj);
    localStorage.setItem('blindcode_student', JSON.stringify(studentObj));
    return studentObj;
  }, []);

  // Start Quiz
  const startQuiz = useCallback(() => {
    const now = Date.now();
    setStartedAt(now);
    setQuizStatus('in_progress');
    setRemainingSeconds(QUIZ_DURATION_SECONDS);
    setAnswers({});
    setCurrentIndex(0);
    localStorage.setItem('blindcode_started_at', now.toString());
    localStorage.removeItem('blindcode_answers');
    localStorage.removeItem('blindcode_result');
    localStorage.setItem('blindcode_current_q', '0');
    addToast('Quiz started! Good luck!', 'info', 4000);
  }, [addToast]);

  // Select an option for a question
  const selectAnswer = useCallback((questionId, optionId) => {
    setAnswers((prev) => {
      const updated = { ...prev, [questionId]: optionId };
      localStorage.setItem('blindcode_answers', JSON.stringify(updated));
      return updated;
    });
    // subtle feedback
    addToast('Answer saved ✓', 'success', 1800);
  }, [addToast]);

  // Clear answer for current question
  const clearAnswer = useCallback((questionId) => {
    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[questionId];
      localStorage.setItem('blindcode_answers', JSON.stringify(updated));
      return updated;
    });
  }, []);

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

  // Compute final quiz results & submit
  const submitQuiz = useCallback(async (isAutoSubmit = false) => {
    const currentStart = startedAt || parseInt(localStorage.getItem('blindcode_started_at') || `${Date.now()}`, 10);
    const elapsedSeconds = Math.min(
      QUIZ_DURATION_SECONDS,
      Math.floor((Date.now() - currentStart) / 1000)
    );

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    const detailedAnswers = questions.map((q) => {
      const selected = answers[q.id] || null;
      const isAnswered = selected !== null;
      const isCorrect = selected === q.correctAnswer;

      if (!isAnswered) {
        unansweredCount++;
      } else if (isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
      }

      return {
        questionId: q.id,
        category: q.category,
        difficulty: q.difficulty,
        question: q.question,
        codeSnippet: q.codeSnippet,
        selectedOption: selected,
        correctOption: q.correctAnswer,
        isCorrect,
        isAnswered,
        explanation: q.explanation,
        options: q.options
      };
    });

    const percentage = Math.round((correctCount / TOTAL_QUESTIONS) * 100);

    let performanceMessage = 'KEEP LEARNING';
    let performanceBadge = 'bg-drabDark-100 text-drabDark';
    if (percentage >= 90) {
      performanceMessage = 'EXCELLENT PERFORMANCE';
      performanceBadge = 'bg-teaGreen text-drabDark border-teaGreen-500';
    } else if (percentage >= 70) {
      performanceMessage = 'GREAT WORK';
      performanceBadge = 'bg-celticBlue-100 text-celticBlue border-celticBlue-300';
    } else if (percentage >= 50) {
      performanceMessage = 'GOOD ATTEMPT';
      performanceBadge = 'bg-vanilla-200 text-drabDark border-vanilla-400';
    }

    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const finalResult = {
      score: correctCount,
      total: TOTAL_QUESTIONS,
      correctCount,
      incorrectCount,
      unansweredCount,
      percentage,
      performanceMessage,
      performanceBadge,
      timeTakenSeconds: elapsedSeconds,
      timeFormatted,
      isAutoSubmit,
      submittedAt: new Date().toISOString(),
      student: participant,
      detailedAnswers
    };

    setQuizResult(finalResult);
    setQuizStatus('submitted');
    localStorage.setItem('blindcode_result', JSON.stringify(finalResult));
    localStorage.removeItem('blindcode_started_at');

    // MERN-ready API integration
    await api.submitQuiz({
      participantId: participant?.id || 'BC-ANON',
      studentName: participant?.name || 'Anonymous Student',
      department: participant?.department || 'General',
      score: correctCount,
      total: TOTAL_QUESTIONS,
      percentage,
      timeTakenSeconds: elapsedSeconds,
      timeFormatted,
      status: 'Completed'
    });

    if (isAutoSubmit) {
      addToast('Time is up! Your quiz has been submitted automatically.', 'warning', 6000);
    } else {
      addToast('Quiz submitted successfully!', 'success', 4000);
    }

    return finalResult;
  }, [answers, startedAt, questions, participant, addToast]);

  // Active Timer Loop
  useEffect(() => {
    if (quizStatus !== 'in_progress' || !startedAt) return;

    let warningToastTriggered = false;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      const left = QUIZ_DURATION_SECONDS - elapsed;

      if (left <= 0) {
        setRemainingSeconds(0);
        clearInterval(interval);
        submitQuiz(true);
      } else {
        setRemainingSeconds(left);

        // 5 minute warning toast
        if (left === 300 && !warningToastTriggered) {
          warningToastTriggered = true;
          addToast('5 minutes remaining! Review your answers.', 'warning', 5000);
        }
        // 1 minute urgent warning
        if (left === 60) {
          addToast('1 minute remaining! Quiz will submit automatically.', 'error', 6000);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [quizStatus, startedAt, submitQuiz, addToast]);

  // Restart / Reset state for retake or demo
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
        resetQuizState
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
