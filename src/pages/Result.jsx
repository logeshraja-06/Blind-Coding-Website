import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  RotateCcw,
  Award,
  ChevronDown,
  ChevronUp,
  FileText,
  BarChart3,
  Sparkles,
  Home
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { FloatingCodeBg } from '../components/common/FloatingCodeBg';
import { AnimatedCounter } from '../components/common/AnimatedCounter';
import { PageTransition } from '../components/layout/PageTransition';

export const Result = () => {
  const navigate = useNavigate();
  const { quizResult, resetQuizState, participant } = useQuiz();
  const [showReview, setShowReview] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'correct' | 'incorrect' | 'unanswered'

  useEffect(() => {
    // If no result exists in state or localStorage, redirect to Home
    if (!quizResult) {
      const localRes = localStorage.getItem('blindcode_result');
      if (!localRes) {
        navigate('/');
      }
    } else if (quizResult.percentage >= 70) {
      // Trigger subtle celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#3971B8', '#C8D696', '#F6E6A5'],
        });
      } catch (e) {
        // ignore
      }
    }
  }, [quizResult, navigate]);

  if (!quizResult) {
    return null;
  }

  const {
    score,
    total,
    correctCount,
    incorrectCount,
    unansweredCount,
    percentage,
    performanceMessage,
    performanceBadge,
    timeFormatted,
    student,
    detailedAnswers = []
  } = quizResult;

  const filteredAnswers = detailedAnswers.filter((item) => {
    if (reviewFilter === 'correct') return item.isCorrect;
    if (reviewFilter === 'incorrect') return item.isAnswered && !item.isCorrect;
    if (reviewFilter === 'unanswered') return !item.isAnswered;
    return true;
  });

  const handleRetakeDemo = () => {
    resetQuizState();
    navigate('/welcome');
  };

  return (
    <PageTransition>
      <Navbar />

      <main className="flex-1 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-ivory relative">
        <FloatingCodeBg opacity={0.4} />

        <div className="max-w-4xl mx-auto relative z-10 space-y-8">
          {/* Main Score Reveal Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              variant="default"
              className="p-8 sm:p-12 border-2 border-teaGreen-400 shadow-premium bg-white text-center relative overflow-hidden"
            >
              {/* Header Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teaGreen-100 border border-teaGreen-300 text-xs font-bold uppercase tracking-wider text-drabDark mb-4">
                <Sparkles className="w-3.5 h-3.5 text-celticBlue" />
                Assessment Completed • {student?.name || 'Participant'}
              </div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold font-comfortaa text-drabDark mb-2"
              >
                QUIZ COMPLETED
              </motion.h1>

              {/* Performance Tier Tag */}
              <div className="my-4">
                <span
                  className={`inline-block px-5 py-2 rounded-full font-comfortaa font-bold text-sm sm:text-base border shadow-sm ${performanceBadge}`}
                >
                  {performanceMessage}
                </span>
              </div>

              {/* Huge Score Display */}
              <div className="py-6 my-4 border-y border-teaGreen-200/80 max-w-lg mx-auto">
                <div className="text-xs uppercase tracking-widest text-drabDark/60 font-semibold mb-2">
                  FINAL SCORE
                </div>
                <div className="text-5xl sm:text-7xl font-bold font-comfortaa text-drabDark">
                  <span className="text-celticBlue">
                    <AnimatedCounter target={score} duration={1200} />
                  </span>
                  <span className="text-2xl sm:text-4xl text-drabDark/40 font-poppins"> / {total}</span>
                </div>
              </div>

              {/* 4 Metric Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
                {/* Correct */}
                <div className="p-4 rounded-2xl bg-teaGreen-50 border border-teaGreen-300">
                  <div className="flex items-center justify-center gap-1 text-teaGreen-600 mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Correct</span>
                  </div>
                  <span className="text-2xl font-bold font-comfortaa text-drabDark">
                    <AnimatedCounter target={correctCount} duration={1000} />
                  </span>
                </div>

                {/* Incorrect */}
                <div className="p-4 rounded-2xl bg-vanilla-50 border border-vanilla-300">
                  <div className="flex items-center justify-center gap-1 text-drabDark/70 mb-1">
                    <XCircle className="w-4 h-4 text-drabDark/60" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Incorrect</span>
                  </div>
                  <span className="text-2xl font-bold font-comfortaa text-drabDark">
                    <AnimatedCounter target={incorrectCount} duration={1000} />
                  </span>
                </div>

                {/* Accuracy Percentage */}
                <div className="p-4 rounded-2xl bg-celticBlue-50 border border-celticBlue-200">
                  <div className="flex items-center justify-center gap-1 text-celticBlue mb-1">
                    <Award className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Percentage</span>
                  </div>
                  <span className="text-2xl font-bold font-comfortaa text-celticBlue">
                    <AnimatedCounter target={percentage} suffix="%" duration={1200} />
                  </span>
                </div>

                {/* Time Taken */}
                <div className="p-4 rounded-2xl bg-ivory border border-teaGreen-300">
                  <div className="flex items-center justify-center gap-1 text-drabDark/70 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Time</span>
                  </div>
                  <span className="text-xl font-bold font-comfortaa text-drabDark">
                    {timeFormatted}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/admin/results')}
                  icon={Trophy}
                  iconPosition="left"
                  className="w-full sm:w-auto font-bold shadow-premium"
                >
                  VIEW LEADERBOARD
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/')}
                  icon={Home}
                  iconPosition="left"
                  className="w-full sm:w-auto font-semibold"
                >
                  RETURN HOME
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={handleRetakeDemo}
                  icon={RotateCcw}
                  iconPosition="left"
                  className="w-full sm:w-auto text-xs"
                >
                  Retake (Demo Mode)
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Detailed Question Review Accordion */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teaGreen-300 shadow-premium">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-teaGreen-200">
              <div>
                <h3 className="font-comfortaa font-bold text-xl text-drabDark flex items-center gap-2">
                  <FileText className="w-5 h-5 text-celticBlue" />
                  Detailed Question Analysis
                </h3>
                <p className="text-xs text-drabDark/60 mt-0.5">
                  Review your answers, correct solutions, and concept explanations
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-ivory rounded-xl border border-teaGreen-300/80 text-xs">
                <button
                  onClick={() => setReviewFilter('all')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    reviewFilter === 'all'
                      ? 'bg-celticBlue text-white shadow-sm'
                      : 'text-drabDark hover:bg-white'
                  }`}
                >
                  All ({detailedAnswers.length})
                </button>
                <button
                  onClick={() => setReviewFilter('correct')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    reviewFilter === 'correct'
                      ? 'bg-teaGreen text-drabDark shadow-sm font-bold'
                      : 'text-drabDark hover:bg-white'
                  }`}
                >
                  Correct ({correctCount})
                </button>
                <button
                  onClick={() => setReviewFilter('incorrect')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    reviewFilter === 'incorrect'
                      ? 'bg-vanilla text-drabDark shadow-sm font-bold'
                      : 'text-drabDark hover:bg-white'
                  }`}
                >
                  Incorrect ({incorrectCount})
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4 pt-6">
              {filteredAnswers.map((item, idx) => (
                <div
                  key={item.questionId}
                  className="p-5 rounded-2xl border border-teaGreen-300/80 bg-ivory/50 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-comfortaa font-bold text-xs bg-white px-2.5 py-1 rounded-lg border border-teaGreen-300">
                        Q{String(item.questionId).padStart(2, '0')}
                      </span>
                      <span className="text-xs font-semibold text-drabDark/60">
                        {item.category}
                      </span>
                    </div>

                    {item.isCorrect ? (
                      <Badge variant="success" size="sm">
                        Correct (+1)
                      </Badge>
                    ) : item.isAnswered ? (
                      <Badge variant="warning" size="sm">
                        Incorrect (0)
                      </Badge>
                    ) : (
                      <Badge variant="default" size="sm">
                        Unattempted (0)
                      </Badge>
                    )}
                  </div>

                  <p className="font-semibold text-sm text-drabDark">
                    {item.question}
                  </p>

                  {item.codeSnippet && (
                    <pre className="p-3 bg-drabDark text-teaGreen-100 rounded-xl text-xs font-mono overflow-x-auto">
                      <code>{item.codeSnippet}</code>
                    </pre>
                  )}

                  {/* Options Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <div
                      className={`p-2.5 rounded-xl border ${
                        item.isCorrect
                          ? 'bg-teaGreen-100 border-teaGreen-400 text-drabDark'
                          : item.selectedOption
                          ? 'bg-red-50 border-red-300 text-red-900'
                          : 'bg-white border-teaGreen-200 text-drabDark/60'
                      }`}
                    >
                      <span className="font-bold block text-[10px] uppercase tracking-wider mb-0.5">
                        Your Selection:
                      </span>
                      <span>
                        {item.selectedOption ? `Option ${item.selectedOption}` : 'None'}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-teaGreen-100 border border-teaGreen-400 text-drabDark">
                      <span className="font-bold block text-[10px] uppercase tracking-wider mb-0.5">
                        Correct Answer:
                      </span>
                      <span>Option {item.correctOption}</span>
                    </div>
                  </div>

                  {/* Explanation */}
                  {item.explanation && (
                    <div className="p-3 rounded-xl bg-white border border-teaGreen-200 text-xs text-drabDark/80">
                      <strong className="text-celticBlue">Explanation: </strong>
                      {item.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
};
