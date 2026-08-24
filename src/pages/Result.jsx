import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  Award,
  Sparkles,
  Home,
  ShieldCheck,
  Calendar,
  Lock,
  GraduationCap
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { FloatingCodeBg } from '../components/common/FloatingCodeBg';
import { AnimatedCounter } from '../components/common/AnimatedCounter';
import { PageTransition } from '../components/layout/PageTransition';
import { TechForceLogo } from '../assets/logo/TechForceLogo';

export const Result = () => {
  const navigate = useNavigate();
  const { quizResult, participant } = useQuiz();

  useEffect(() => {
    if (!quizResult) {
      const localRes = localStorage.getItem('blindcode_result');
      if (!localRes) {
        navigate('/');
      }
    } else if (quizResult.percentage >= 70) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
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
    score = 0,
    total = 25,
    percentage = 0,
    performanceTier = 'GOOD ATTEMPT',
    performanceMessage = performanceTier,
    timeFormatted = '42:15',
  } = quizResult;

  const candidateName = quizResult.studentName || participant?.name || 'Participant';
  const registerNumber = quizResult.registerNumber || participant?.registerNumber || '953710';
  const finalTier = performanceMessage || performanceTier || 'GOOD ATTEMPT';

  const getTierColor = (pct) => {
    if (pct >= 90) return 'bg-teaGreen text-drabDark border-teaGreen-500';
    if (pct >= 70) return 'bg-celticBlue-100 text-celticBlue border-celticBlue-300';
    if (pct >= 50) return 'bg-vanilla-200 text-drabDark border-vanilla-400';
    return 'bg-drabDark-100 text-drabDark border-drabDark/20';
  };

  return (
    <PageTransition>
      <Navbar />

      <main className="flex-1 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-ivory relative flex items-center justify-center">
        <FloatingCodeBg opacity={0.4} />

        <div className="max-w-2xl w-full mx-auto relative z-10 space-y-6">
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
                <TechForceLogo className="w-5 h-5" showText={false} />
                Assessment Completed • {candidateName} ({registerNumber})
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold font-comfortaa text-drabDark mb-2">
                QUIZ COMPLETED
              </h1>
              <p className="text-xs sm:text-sm text-drabDark/60 mb-4">
                Department of Computer Science & Engineering • 2025–2026
              </p>

              {/* Performance Tier Badge */}
              <div className="my-4">
                <span
                  className={`inline-block px-6 py-2 rounded-full font-comfortaa font-bold text-sm sm:text-base border shadow-sm ${getTierColor(
                    percentage
                  )}`}
                >
                  {finalTier}
                </span>
              </div>

              {/* Score Display (Clean & Private) */}
              <div className="py-8 my-6 border-y border-teaGreen-200/80 max-w-md mx-auto">
                <div className="text-xs uppercase tracking-widest text-drabDark/60 font-semibold mb-2">
                  YOUR FINAL SCORE
                </div>
                <div className="text-6xl sm:text-7xl font-bold font-comfortaa text-drabDark">
                  <span className="text-celticBlue">
                    <AnimatedCounter target={score} duration={1200} />
                  </span>
                  <span className="text-3xl sm:text-4xl text-drabDark/40 font-poppins"> / {total}</span>
                </div>
              </div>

              {/* Key Summary Cards */}
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
                <div className="p-4 rounded-2xl bg-celticBlue-50 border border-celticBlue-200">
                  <div className="flex items-center justify-center gap-1 text-celticBlue mb-1">
                    <Award className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Percentage</span>
                  </div>
                  <span className="text-2xl font-bold font-comfortaa text-celticBlue">
                    <AnimatedCounter target={percentage} suffix="%" duration={1000} />
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-ivory border border-teaGreen-300">
                  <div className="flex items-center justify-center gap-1 text-drabDark/70 mb-1">
                    <ShieldCheck className="w-4 h-4 text-teaGreen-600" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Attempt Status</span>
                  </div>
                  <span className="text-sm font-bold font-comfortaa text-drabDark block mt-1">
                    Verified & Recorded
                  </span>
                </div>
              </div>

              {/* Confidentiality Notice */}
              <div className="p-4 rounded-2xl bg-ivory border border-teaGreen-300 text-xs text-drabDark/70 leading-relaxed mb-8 max-w-md mx-auto">
                <Lock className="w-4 h-4 text-celticBlue mx-auto mb-1" />
                <span>
                  To uphold competition fairness, individual answer reviews and rank lists are managed exclusively by the CSE Association. Your score has been securely registered.
                </span>
              </div>

              {/* Return Home CTA */}
              <div className="flex justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/')}
                  icon={Home}
                  iconPosition="left"
                  className="font-bold px-8 shadow-premium"
                >
                  RETURN TO HOME
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
};
