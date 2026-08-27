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
  GraduationCap,
  Clock,
  Check,
  FileCheck
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
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
          particleCount: 75,
          spread: 80,
          origin: { y: 0.55 },
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
    submittedAt,
  } = quizResult;

  const candidateName = quizResult.studentName || participant?.name || 'Participant';
  const registerNumber = quizResult.registerNumber || participant?.registerNumber || '953710';
  const finalTier = performanceMessage || performanceTier || 'GOOD ATTEMPT';

  const getTierBadge = (pct) => {
    if (pct >= 90) return 'bg-teaGreen-200 text-drabDark border-teaGreen-500 shadow-sm';
    if (pct >= 70) return 'bg-celticBlue-100 text-celticBlue border-celticBlue-300 shadow-sm';
    if (pct >= 50) return 'bg-vanilla-200 text-drabDark border-vanilla-400 shadow-sm';
    return 'bg-ivory text-drabDark/80 border-drabDark/20 shadow-sm';
  };

  const formattedDate = submittedAt ? new Date(submittedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }) : '31 July 2026';

  return (
    <PageTransition>
      <Navbar />

      <main className="flex-1 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-ivory relative flex items-center justify-center font-poppins">
        <FloatingCodeBg opacity={0.45} />

        <div className="max-w-2xl w-full mx-auto relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Official Certificate Card Container */}
            <div className="p-1 rounded-3xl bg-gradient-to-b from-teaGreen-300 via-celticBlue-200 to-vanilla-300 shadow-elevated">
              <div className="p-8 sm:p-12 rounded-[22px] bg-white border border-white text-center relative overflow-hidden">
                {/* Official College Watermark Seal */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teaGreen-100 border border-teaGreen-300 text-xs font-bold uppercase tracking-wider text-drabDark mb-3">
                  <TechForceLogo className="w-5 h-5" showText={false} />
                  Official Assessment Merit Record
                </div>

                <div className="text-[11px] font-semibold text-drabDark/60 uppercase tracking-widest mb-4">
                  Department of Computer Science and Engineering • AY 2025–2026
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-comfortaa text-drabDark mb-1">
                  {candidateName}
                </h1>
                <div className="text-xs text-celticBlue font-mono font-semibold mb-5">
                  Reg No: {registerNumber} • Round 01 Qualifier
                </div>

                {/* Performance Tier Pill */}
                <div className="mb-6">
                  <span
                    className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-comfortaa font-bold text-xs sm:text-sm border ${getTierBadge(
                      percentage
                    )}`}
                  >
                    <Trophy className="w-4 h-4 text-current" />
                    {finalTier}
                  </span>
                </div>

                {/* Score Showcase Module */}
                <div className="py-6 sm:py-8 my-6 border-y border-teaGreen-200 max-w-md mx-auto bg-ivory/50 rounded-2xl">
                  <div className="text-[11px] uppercase tracking-widest text-drabDark/60 font-bold mb-1">
                    VERIFIED EVALUATED SCORE
                  </div>
                  <div className="text-6xl sm:text-7xl font-bold font-comfortaa text-drabDark tracking-tight">
                    <span className="text-celticBlue">
                      <AnimatedCounter target={score} duration={1000} />
                    </span>
                    <span className="text-3xl sm:text-4xl text-drabDark/40 font-poppins font-normal"> / {total}</span>
                  </div>
                  <div className="text-xs text-drabDark/60 mt-1 font-medium">
                    Time Elapsed: <span className="font-mono font-bold text-drabDark">{timeFormatted}</span>
                  </div>
                </div>

                {/* Performance Analytics Grid */}
                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-6 text-left">
                  <div className="p-4 rounded-2xl bg-celticBlue-50 border border-celticBlue-200">
                    <div className="flex items-center gap-1.5 text-celticBlue mb-1">
                      <Award className="w-4 h-4" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">Accuracy</span>
                    </div>
                    <span className="text-2xl font-bold font-comfortaa text-celticBlue">
                      <AnimatedCounter target={percentage} suffix="%" duration={1000} />
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-teaGreen-50 border border-teaGreen-300">
                    <div className="flex items-center gap-1.5 text-drabDark mb-1">
                      <ShieldCheck className="w-4 h-4 text-teaGreen-600" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">Submission</span>
                    </div>
                    <span className="text-xs font-bold font-comfortaa text-drabDark block mt-1">
                      Verified & Recorded
                    </span>
                  </div>
                </div>

                {/* Official Results Notice */}
                <div className="p-4 rounded-2xl bg-ivory border border-teaGreen-200 text-xs text-drabDark/70 leading-relaxed mb-8 max-w-md mx-auto flex items-start gap-2.5 text-left">
                  <ShieldCheck className="w-4 h-4 text-celticBlue flex-shrink-0 mt-0.5" />
                  <span>
                    Your assessment has been officially submitted. Final merit standings and prize announcements will be released by the Department of Computer Science and Engineering.
                  </span>
                </div>

                {/* Return Home Action */}
                <div className="flex justify-center">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate('/')}
                    icon={Home}
                    iconPosition="left"
                    className="font-bold px-8 shadow-premium"
                  >
                    RETURN TO EVENT OVERVIEW
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
};
