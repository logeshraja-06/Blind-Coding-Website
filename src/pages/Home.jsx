import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  Zap,
  Trophy,
  Clock,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Lock,
  RefreshCw,
  Terminal,
  FileCode,
  Flame
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { FloatingCodeBg } from '../components/common/FloatingCodeBg';
import { AnimatedCounter } from '../components/common/AnimatedCounter';
import { PageTransition } from '../components/layout/PageTransition';

export const Home = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  const faqData = [
    {
      q: 'How many questions are there?',
      a: 'The assessment contains exactly 25 curated multiple-choice questions covering JavaScript, Python, C++, Bitwise operations, and computational logic.',
    },
    {
      q: 'How much time do I get?',
      a: 'You will have a total duration of 60 minutes. A live countdown timer is visible throughout the challenge to help manage your time.',
    },
    {
      q: 'Can I change my answers during the test?',
      a: 'Yes, you can revisit any question using the Question Navigator and change your selected option at any time before final submission.',
    },
    {
      q: 'What happens when the timer ends?',
      a: 'The platform automatically locks your session and submits all your saved answers immediately, ensuring your score is calculated with complete integrity.',
    },
    {
      q: 'Can I attempt the quiz again?',
      a: 'Each student is granted only one official attempt per registration ID to maintain a fair competitive leaderboard.',
    },
  ];

  const rulesData = [
    {
      num: '01',
      title: '25 MCQ Questions',
      desc: 'The quiz contains 25 multiple-choice questions covering programming logic and prediction.',
      icon: Terminal,
    },
    {
      num: '02',
      title: '60 Minutes Duration',
      desc: 'The total duration is 60 minutes. The countdown starts immediately when you enter.',
      icon: Clock,
    },
    {
      num: '03',
      title: 'Single Official Attempt',
      desc: 'Each participant gets only one attempt per registered student identity.',
      icon: Lock,
    },
    {
      num: '04',
      title: 'Real-time Auto-Save',
      desc: 'Answers are automatically saved instantly in real-time as you select them.',
      icon: RefreshCw,
    },
    {
      num: '05',
      title: 'Auto-Submit on Timeout',
      desc: 'The quiz automatically submits immediately when the timer reaches zero.',
      icon: Zap,
    },
    {
      num: '06',
      title: 'Irreversible Submission',
      desc: 'Once submitted, answers cannot be modified or re-attempted.',
      icon: ShieldCheck,
    },
  ];

  return (
    <PageTransition>
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-ivory">
          <FloatingCodeBg opacity={0.6} />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            {/* Small Label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-teaGreen-300 shadow-sm backdrop-blur-sm mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-celticBlue animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-drabDark">
                COLLEGE TECH EVENT • 2026
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold font-comfortaa tracking-tight text-drabDark leading-[1.05] mb-6">
                BLIND<br />
                <span className="text-celticBlue drop-shadow-sm">CODING</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-drabDark/80 max-w-2xl mx-auto font-normal leading-relaxed mb-10"
            >
              Test your logic. Trust your instincts. Code beyond what you see.
            </motion.p>

            {/* Dual CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
            >
              <Button
                size="lg"
                variant="primary"
                onClick={() => navigate('/register')}
                className="w-full sm:w-auto font-bold px-8 shadow-premium"
                icon={ArrowRight}
                iconPosition="right"
              >
                ENTER EVENT
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const elem = document.getElementById('about');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto"
              >
                EVENT DETAILS
              </Button>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: EVENT INFORMATION SECTION */}
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-celticBlue mb-2 block">
                The Concept
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-comfortaa text-drabDark mb-4">
                What is Blind Coding?
              </h2>
              <p className="text-base text-drabDark/70 leading-relaxed">
                Blind Coding challenges your deep understanding of language semantics, dry-running abilities, and syntactic precision without the crutch of live code execution.
              </p>
            </div>

            {/* 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <Card
                variant="ivory"
                hoverEffect
                className="p-8 border border-teaGreen-300 relative overflow-hidden group"
              >
                <div className="w-14 h-14 rounded-2xl bg-vanilla-200 text-drabDark flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  🧠
                </div>
                <h3 className="text-xl font-bold font-comfortaa text-drabDark mb-3">
                  Think Fast
                </h3>
                <p className="text-sm text-drabDark/70 leading-relaxed">
                  Analyze coding concepts, pointer arithmetic, asynchronous loops, and algorithmic logic under pressure.
                </p>
              </Card>

              {/* Card 2 */}
              <Card
                variant="ivory"
                hoverEffect
                className="p-8 border border-teaGreen-300 relative overflow-hidden group"
              >
                <div className="w-14 h-14 rounded-2xl bg-teaGreen-300 text-drabDark flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <h3 className="text-xl font-bold font-comfortaa text-drabDark mb-3">
                  Choose Smart
                </h3>
                <p className="text-sm text-drabDark/70 leading-relaxed">
                  Select the precise output and behavior from subtle multiple-choice options before the 60-minute clock runs out.
                </p>
              </Card>

              {/* Card 3 */}
              <Card
                variant="ivory"
                hoverEffect
                className="p-8 border border-teaGreen-300 relative overflow-hidden group"
              >
                <div className="w-14 h-14 rounded-2xl bg-celticBlue-100 text-celticBlue flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  🏆
                </div>
                <h3 className="text-xl font-bold font-comfortaa text-drabDark mb-3">
                  Score Big
                </h3>
                <p className="text-sm text-drabDark/70 leading-relaxed">
                  Compete with fellow programmers across departments and earn top rank on the official college event leaderboard.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION 3: EVENT STATS SECTION */}
        <section id="stats" className="py-20 bg-ivory border-y border-teaGreen-300/80 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {/* Stat 1 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-teaGreen-300/70 text-center shadow-subtle hover:border-celticBlue-300 transition-colors">
                <div className="text-4xl sm:text-5xl font-bold font-comfortaa text-celticBlue mb-2">
                  <AnimatedCounter target={25} />
                </div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-drabDark/70">
                  QUESTIONS
                </div>
              </div>

              {/* Stat 2 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-teaGreen-300/70 text-center shadow-subtle hover:border-celticBlue-300 transition-colors">
                <div className="text-4xl sm:text-5xl font-bold font-comfortaa text-drabDark mb-2">
                  <AnimatedCounter target={60} />
                </div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-drabDark/70">
                  MINUTES
                </div>
              </div>

              {/* Stat 3 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-teaGreen-300/70 text-center shadow-subtle hover:border-celticBlue-300 transition-colors">
                <div className="text-4xl sm:text-5xl font-bold font-comfortaa text-celticBlue mb-2">
                  <AnimatedCounter target={1} />
                </div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-drabDark/70">
                  CHALLENGE
                </div>
              </div>

              {/* Stat 4 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-teaGreen-300/70 text-center shadow-subtle hover:border-celticBlue-300 transition-colors">
                <div className="text-4xl sm:text-5xl font-bold font-comfortaa text-teaGreen-600 mb-2">
                  <AnimatedCounter target="∞" />
                </div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-drabDark/70">
                  POSSIBILITIES
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: RULES SECTION */}
        <section id="rules" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-celticBlue mb-2 block">
                Official Guidelines
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-comfortaa text-drabDark mb-4">
                Event Rules & Protocol
              </h2>
              <p className="text-base text-drabDark/70">
                Please read the official competition rules carefully before initiating your assessment attempt.
              </p>
            </div>

            {/* 6 Visual Numbered Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rulesData.map((rule) => {
                const Icon = rule.icon;
                return (
                  <Card
                    key={rule.num}
                    variant="default"
                    hoverEffect
                    className="p-6 border border-teaGreen-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-comfortaa font-bold text-2xl text-celticBlue">
                          {rule.num}
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-teaGreen-100 flex items-center justify-center text-drabDark">
                          <Icon className="w-4 h-4 text-drabDark" />
                        </div>
                      </div>
                      <h3 className="font-comfortaa font-bold text-base text-drabDark mb-2">
                        {rule.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-drabDark/70 leading-relaxed">
                        {rule.desc}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 5: QUIZ ROUNDS SECTION */}
        <section id="rounds" className="py-24 px-4 sm:px-6 lg:px-8 bg-ivory relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-celticBlue mb-2 block">
                Competition Stages
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-comfortaa text-drabDark mb-4">
                Event Rounds
              </h2>
              <p className="text-base text-drabDark/70">
                Current active round and upcoming advanced coding rounds for top qualifiers.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Card
                variant="default"
                hoverEffect
                className="p-8 sm:p-10 border-2 border-teaGreen-400 bg-white relative shadow-premium overflow-hidden"
              >
                {/* Active Indicator Top Ribbon */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-comfortaa uppercase tracking-widest text-celticBlue">
                      ROUND 01
                    </span>
                    <Badge variant="active" size="sm">
                      ACTIVE
                    </Badge>
                  </div>
                  <span className="text-xs font-semibold text-drabDark/60">
                    College Qualifier
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold font-comfortaa text-drabDark mb-4">
                  BLIND CODING
                </h3>

                <p className="text-sm sm:text-base text-drabDark/80 leading-relaxed mb-8">
                  Core multiple-choice logic challenge. Analyze algorithms, predict program outputs, spot edge cases, and solve bitwise puzzles under timed constraints.
                </p>

                {/* Round Metrics */}
                <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-ivory border border-teaGreen-300 mb-8 text-center">
                  <div>
                    <div className="font-comfortaa font-bold text-lg sm:text-xl text-drabDark">
                      25
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-drabDark/60 font-semibold">
                      Questions
                    </div>
                  </div>
                  <div className="border-x border-teaGreen-300">
                    <div className="font-comfortaa font-bold text-lg sm:text-xl text-celticBlue">
                      60
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-drabDark/60 font-semibold">
                      Minutes
                    </div>
                  </div>
                  <div>
                    <div className="font-comfortaa font-bold text-lg sm:text-xl text-teaGreen-600">
                      MCQ
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-drabDark/60 font-semibold">
                      Challenge
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-drabDark/60 font-medium">
                    ⚡ Instant automatic score calculation upon submission
                  </span>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate('/register')}
                    icon={ArrowRight}
                    iconPosition="right"
                    className="w-full sm:w-auto font-bold"
                  >
                    ENTER ROUND
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION 6: FAQ SECTION */}
        <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-celticBlue mb-2 block">
                Clarifications
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-comfortaa text-drabDark mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-drabDark/70">
                Everything you need to know before participating in BLINDCODE 2026.
              </p>
            </div>

            <div className="space-y-4">
              {faqData.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-teaGreen-300 overflow-hidden bg-ivory transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-comfortaa font-bold text-sm sm:text-base text-drabDark hover:text-celticBlue transition-colors"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 text-drabDark/60 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-celticBlue' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-5 pb-5 pt-1 text-xs sm:text-sm text-drabDark/80 leading-relaxed border-t border-teaGreen-200/50"
                        >
                          {item.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
};
