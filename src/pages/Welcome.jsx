import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Code2,
  Terminal,
  Layers,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { FloatingCodeBg } from '../components/common/FloatingCodeBg';
import { PageTransition } from '../components/layout/PageTransition';
import { useQuiz } from '../context/QuizContext';

export const Welcome = () => {
  const navigate = useNavigate();
  const { participant, startQuiz, quizStatus } = useQuiz();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // If no participant details, redirect back to register
  useEffect(() => {
    if (!participant) {
      navigate('/register');
    }
  }, [participant, navigate]);

  const handleStartConfirmed = () => {
    setConfirmModalOpen(false);
    startQuiz();
    navigate('/quiz');
  };

  const studentName = participant?.name || 'Participant';

  return (
    <PageTransition>
      <Navbar />

      <main className="flex-1 relative min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-ivory">
        <FloatingCodeBg opacity={0.5} />

        <div className="max-w-3xl w-full mx-auto relative z-10">
          {/* Back button */}
          <Link
            to="/register"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-drabDark/70 hover:text-celticBlue mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Edit Participant Information</span>
          </Link>

          <Card
            variant="default"
            className="p-8 sm:p-12 border-2 border-teaGreen-400 shadow-premium bg-white text-center relative overflow-hidden"
          >
            {/* Student Greeting */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teaGreen-100 border border-teaGreen-300 text-xs font-bold uppercase tracking-wider text-drabDark mb-4">
              <Sparkles className="w-3.5 h-3.5 text-celticBlue" />
              Verified Participant • {participant?.department || 'Engineering'}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-comfortaa text-drabDark mb-2">
              Welcome, {studentName}! 👋
            </h1>

            <div className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wider text-celticBlue mb-8">
              <span>BLIND CODING</span>
              <span>•</span>
              <span>QUIZ ROUND</span>
            </div>

            {/* Event Metrics Highlight */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-xl mx-auto">
              <div className="p-5 rounded-2xl bg-ivory border border-teaGreen-300 shadow-sm flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-celticBlue-100 text-celticBlue flex items-center justify-center mb-2">
                  <Terminal className="w-5 h-5" />
                </div>
                <span className="text-2xl font-bold font-comfortaa text-drabDark">25</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-drabDark/60">
                  QUESTIONS
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-ivory border border-teaGreen-300 shadow-sm flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-vanilla-200 text-drabDark flex items-center justify-center mb-2">
                  <Clock className="w-5 h-5 text-drabDark" />
                </div>
                <span className="text-2xl font-bold font-comfortaa text-celticBlue">60</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-drabDark/60">
                  MINUTES
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-ivory border border-teaGreen-300 shadow-sm flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-teaGreen-200 text-drabDark flex items-center justify-center mb-2">
                  <ShieldCheck className="w-5 h-5 text-drabDark" />
                </div>
                <span className="text-2xl font-bold font-comfortaa text-teaGreen-600">ONE</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-drabDark/60">
                  ATTEMPT
                </span>
              </div>
            </div>

            {/* Warning Checklist Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-vanilla-100/60 border border-vanilla-300 text-left max-w-xl mx-auto mb-8">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-drabDark mb-2">
                <AlertTriangle className="w-4 h-4 text-drabDark" />
                <span>Important Instructions</span>
              </div>
              <ul className="space-y-1.5 text-xs text-drabDark/80">
                <li className="flex items-start gap-2">
                  <span className="text-celticBlue font-bold">•</span>
                  <span>Once you start, the 60-minute countdown runs continuously.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-celticBlue font-bold">•</span>
                  <span>Do not switch browser tabs or close your window to avoid state loss.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-celticBlue font-bold">•</span>
                  <span>All answers are saved automatically as you select them.</span>
                </li>
              </ul>
            </div>

            {/* Start Button */}
            <div className="flex justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setConfirmModalOpen(true)}
                className="w-full sm:w-auto px-10 py-4 font-bold text-base shadow-premium"
                icon={ArrowRight}
                iconPosition="right"
              >
                START QUIZ
              </Button>
            </div>
          </Card>
        </div>

        {/* Confirmation Modal */}
        <Modal
          isOpen={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          title="Start Assessment"
          subtitle="Please confirm before initiating your timed session"
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-vanilla-50 border border-vanilla-300 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-drabDark flex-shrink-0 mt-0.5" />
              <p className="text-sm text-drabDark leading-relaxed">
                Once you start the quiz, your <strong>60-minute timer</strong> will begin immediately and cannot be paused or reset.
              </p>
            </div>

            <p className="text-xs text-drabDark/70">
              Ensure you have a stable network and a distraction-free environment.
            </p>

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
                className="flex-1 justify-center font-bold"
                icon={ArrowRight}
                iconPosition="right"
              >
                START NOW
              </Button>
            </div>
          </div>
        </Modal>
      </main>

      <Footer />
    </PageTransition>
  );
};
