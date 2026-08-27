import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Terminal,
  Layers,
  Sparkles,
  ArrowLeft,
  Calendar,
  Lock,
  Maximize2,
  Check,
  Activity,
  Server
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { FloatingCodeBg } from '../components/common/FloatingCodeBg';
import { PageTransition } from '../components/layout/PageTransition';
import { useQuiz } from '../context/QuizContext';
import { useToast } from '../context/ToastContext';
import { TechForceLogo } from '../assets/logo/TechForceLogo';

export const Welcome = () => {
  const navigate = useNavigate();
  const { participant, startQuiz, eventConfig } = useQuiz();
  const { addToast } = useToast();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    if (!participant) {
      navigate('/register');
    }
  }, [participant, navigate]);

  const handleStartConfirmed = async () => {
    setIsStarting(true);

    // Request Fullscreen directly inside trusted user gesture
    try {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        await docEl.requestFullscreen().catch((err) => {
          console.warn('Fullscreen request rejected or unsupported:', err);
        });
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen();
      }
    } catch (e) {
      console.warn('Fullscreen API error:', e);
    }

    try {
      await startQuiz();
      setConfirmModalOpen(false);
      navigate('/quiz');
    } catch (err) {
      addToast(err.message || 'Unable to start quiz.', 'error', 4500);
      setIsStarting(false);
    }
  };

  const studentName = participant?.name || 'Candidate';
  const durationMins = eventConfig?.quizDurationMinutes || 60;
  const totalQ = eventConfig?.totalQuestions || 25;

  return (
    <PageTransition>
      <Navbar />

      <main className="flex-1 relative min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-ivory font-poppins">
        <FloatingCodeBg opacity={0.5} />

        <div className="max-w-3xl w-full mx-auto relative z-10">
          <Link
            to="/register"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-drabDark/70 hover:text-celticBlue mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Edit Registration Details</span>
          </Link>

          <div className="p-1 rounded-3xl bg-gradient-to-b from-teaGreen-300 via-celticBlue-200 to-vanilla-300 shadow-elevated">
            <div className="p-8 sm:p-12 rounded-[22px] bg-white border border-white text-center">
              {/* Header Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teaGreen-100 border border-teaGreen-300 text-xs font-bold uppercase tracking-wider text-drabDark mb-4">
                <TechForceLogo className="w-5 h-5" showText={false} />
                Verified Candidate • Reg: {participant?.registerNumber || '953710'}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-comfortaa text-drabDark mb-2">
                Welcome, {studentName}!
              </h1>

              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-celticBlue mb-8">
                <span>TECH FORCE</span>
                <span>•</span>
                <span>BLIND CODING 2026</span>
                <span>•</span>
                <span>DEPT OF CSE</span>
              </div>

              {/* Event Metrics Highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-xl mx-auto">
                <div className="p-5 rounded-2xl bg-ivory border border-teaGreen-300 shadow-sm flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-celticBlue-50 text-celticBlue flex items-center justify-center mb-2 border border-celticBlue-200">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-bold font-comfortaa text-drabDark">{totalQ}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-drabDark/60">
                    QUESTIONS
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-ivory border border-teaGreen-300 shadow-sm flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-vanilla text-drabDark flex items-center justify-center mb-2 border border-vanilla-300">
                    <Clock className="w-5 h-5 text-drabDark" />
                  </div>
                  <span className="text-2xl font-bold font-comfortaa text-celticBlue">{durationMins}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-drabDark/60">
                    MINUTES
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-ivory border border-teaGreen-300 shadow-sm flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-teaGreen-200 text-drabDark flex items-center justify-center mb-2 border border-teaGreen-300">
                    <Lock className="w-5 h-5 text-drabDark" />
                  </div>
                  <span className="text-2xl font-bold font-comfortaa text-teaGreen-600">ONE</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-drabDark/60">
                    OFFICIAL ATTEMPT
                  </span>
                </div>
              </div>

              {/* Event Environment Readiness */}
              <div className="p-5 rounded-2xl bg-ivory border border-teaGreen-300 text-left max-w-xl mx-auto mb-8 space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-drabDark/70 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-celticBlue" /> Assessment Environment Rules
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-teaGreen-200 text-drabDark">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teaGreen-600 flex-shrink-0" />
                    <span>Fullscreen Mode Required</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-teaGreen-200 text-drabDark">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teaGreen-600 flex-shrink-0" />
                    <span>Focus Monitoring (Max 2 Warnings)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-teaGreen-200 text-drabDark">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teaGreen-600 flex-shrink-0" />
                    <span>60-Minute Countdown Session</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-teaGreen-200 text-drabDark">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teaGreen-600 flex-shrink-0" />
                    <span>Continuous Answer Auto-Save</span>
                  </div>
                </div>
              </div>

              {/* Launch CTA */}
              <div className="flex justify-center">
                <Button
                  variant="primary"
                  size="xl"
                  onClick={() => setConfirmModalOpen(true)}
                  className="w-full sm:w-auto px-12 py-4 font-bold text-base shadow-premium"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  START OFFICIAL CHALLENGE
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Start Confirmation Modal with Fullscreen Launch */}
        <Modal
          isOpen={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          title="Begin Assessment Challenge"
          subtitle="Confirm to initiate your official timed attempt"
          maxWidth="max-w-md"
        >
          <div className="space-y-4 font-poppins">
            <div className="p-4 rounded-2xl bg-vanilla-50 border border-vanilla-300 flex items-start gap-3">
              <Maximize2 className="w-5 h-5 text-celticBlue flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-drabDark leading-relaxed">
                The assessment will expand into <strong>fullscreen mode</strong>. Navigating away or exiting fullscreen records an official security warning.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-ivory border border-teaGreen-200 text-xs text-drabDark/80">
              Candidate: <strong>{studentName}</strong> ({participant?.registerNumber}) • {participant?.class}
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setConfirmModalOpen(false)}
                className="flex-1 justify-center"
              >
                GO BACK
              </Button>
              <Button
                variant="primary"
                onClick={handleStartConfirmed}
                isLoading={isStarting}
                className="flex-1 justify-center font-bold shadow-md"
                icon={ArrowRight}
                iconPosition="right"
              >
                CONFIRM & START
              </Button>
            </div>
          </div>
        </Modal>
      </main>

      <Footer />
    </PageTransition>
  );
};
