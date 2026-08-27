import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Clock,
  ShieldCheck,
  Zap,
  Terminal,
  Calendar,
  UserCheck,
  GraduationCap,
  Sparkles,
  Lock,
  RefreshCw,
  Code2,
  Cpu,
  BrainCircuit,
  EyeOff,
  CheckCircle2,
  Check,
  ChevronDown,
  Layers
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { FloatingCodeBg } from '../components/common/FloatingCodeBg';
import { PageTransition } from '../components/layout/PageTransition';
import { TechForceLogo } from '../assets/logo/TechForceLogo';

export const Home = () => {
  const navigate = useNavigate();

  // Interactive Sample Puzzle on Hero Deck (Pure State, No Mouse Jitter)
  const [selectedSampleOpt, setSelectedSampleOpt] = useState('A');
  const [sampleFeedback, setSampleFeedback] = useState(true);

  const handleSampleChoice = (opt) => {
    setSelectedSampleOpt(opt);
    setSampleFeedback(opt === 'A');
  };

  const competitionPillars = [
    {
      icon: EyeOff,
      title: 'Zero Visual Output',
      desc: 'No compiler output or trial executions. Reason through state and pointer logic purely in your mind.',
    },
    {
      icon: BrainCircuit,
      title: 'Logic & Code Reasoning',
      desc: '25 high-caliber MCQs spanning JavaScript closures, C++ pointer arithmetic, Python mutability, and BSTs.',
    },
    {
      icon: ShieldCheck,
      title: 'Proctored Exam Security',
      desc: 'Fullscreen locking, tab-switch monitoring, and automatic submission protocols ensure uncompromising fairness.',
    },
    {
      icon: Cpu,
      title: 'Automated Scoring & Timing',
      desc: 'Precise server-anchored timers and instant, objective grading guarantee transparent results.',
    },
  ];

  const rulesData = [
    {
      num: '01',
      title: '25 MCQ Questions',
      desc: 'The contest contains exactly 25 algorithmic reasoning questions spanning C++, Python, JavaScript, and Data Structures.',
      icon: Terminal,
    },
    {
      num: '02',
      title: '60 Minutes Duration',
      desc: 'The assessment timer is strictly synchronized with the server. Countdown starts upon quiz entry.',
      icon: Clock,
    },
    {
      num: '03',
      title: 'Register Number Compulsory',
      desc: 'A valid college register number is required. Your attempt is uniquely tied to your institutional ID.',
      icon: Lock,
    },
    {
      num: '04',
      title: 'Single Official Attempt',
      desc: 'Strictly one official attempt per student. Retakes or duplicate submissions are blocked to ensure fair competition.',
      icon: UserCheck,
    },
    {
      num: '05',
      title: 'Real-Time Auto-Save',
      desc: 'Every selected option is instantly saved with automatic retry protection against connection drops.',
      icon: RefreshCw,
    },
    {
      num: '06',
      title: 'Randomized Questions & Options',
      desc: 'Both question and option sequences are independently randomized for each candidate.',
      icon: Zap,
    },
    {
      num: '07',
      title: 'Exam Security Protocol',
      desc: 'Exiting fullscreen or switching tabs records a security warning. Reaching 2 warnings initiates auto-submission.',
      icon: ShieldCheck,
    },
    {
      num: '08',
      title: 'Immediate Score Confirmation',
      desc: 'Candidates receive their verified score and accuracy percentage immediately upon completing their assessment.',
      icon: Sparkles,
    },
  ];

  return (
    <PageTransition>
      <Navbar />

      <main className="flex-1 bg-ivory font-poppins text-drabDark overflow-hidden">
        {/* ========================================================================= */}
        {/* HERO SECTION — IMMERSIVE EDITORIAL COMPETITIVE CODING ARENA */}
        {/* ========================================================================= */}
        <section className="relative min-h-screen flex flex-col items-center pt-32 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#141F1D]">
          {/* High-Resolution Background Graphic with Multi-tier Gradient Masking */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
            <img
              src="/assets/images/hero_competitive_coding.jpg"
              alt="Blind Coding Competitive Arena"
              className="w-full h-full object-cover object-center scale-105 transform-gpu opacity-40"
              loading="eager"
            />
            {/* Smooth transition from dark obsidian-slate into the ivory body */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#141F1D]/95 via-[#141F1D]/85 to-[#F9F9F6]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_25%,_rgba(57,113,184,0.25),_transparent_75%)]" />
          </div>

          <FloatingCodeBg opacity={0.35} />

          {/* Hero Content Container (Hardware Accelerated, Zero Mouse Jitter) */}
          <div className="max-w-6xl mx-auto w-full text-center relative z-10 space-y-8">
            {/* Top Institutional Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex flex-wrap items-center justify-center gap-2.5 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm mx-auto"
            >
              <TechForceLogo className="w-4 h-4 flex-shrink-0" showText={false} />
              <span className="text-xs font-bold uppercase tracking-widest text-teaGreen-200 font-comfortaa">
                TECH FORCE PRESENTS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-celticBlue-300" />
              <span className="text-[11px] font-semibold text-teaGreen-100 uppercase tracking-wider">
                DEPT OF CSE & CSI CHAPTER
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-teaGreen-400 hidden sm:inline-block" />
              <span className="text-[11px] text-teaGreen-200/80 font-medium hidden sm:inline-block">
                AY 2025–2026
              </span>
            </motion.div>

            {/* Oversized Editorial Typography */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="space-y-3"
            >
              <div className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-comfortaa tracking-tighter text-white leading-none">
                BLIND <span className="text-[#39D98A]">CODING</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 pt-1">
                <span className="text-xs sm:text-sm font-mono font-bold tracking-wider px-3.5 py-1 rounded-xl bg-white/10 text-teaGreen-200 border border-white/20 backdrop-blur-sm uppercase">
                  ROUND 01 • LOGIC & REASONING ARENA
                </span>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="max-w-2xl mx-auto space-y-2"
            >
              <p className="text-base sm:text-lg md:text-xl text-white font-medium leading-relaxed">
                Think Fast. Trust Your Logic. Code Beyond What You See.
              </p>
              <p className="text-xs sm:text-sm text-teaGreen-100/75 leading-relaxed font-normal">
                An intense competitive programming challenge testing pure mental code tracing across 25 algorithmic puzzles with zero visual compiler output.
              </p>
            </motion.div>

            {/* Key Event Highlights Strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
              className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-teaGreen-200/90 max-w-lg mx-auto"
            >
              <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 backdrop-blur-sm">
                ⚡ 25 Logic MCQs
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 backdrop-blur-sm">
                ⏱️ 60 Minutes Duration
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 backdrop-blur-sm">
                🔒 1 Official Attempt
              </span>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
            >
              <Button
                size="xl"
                variant="primary"
                onClick={() => navigate('/register')}
                className="w-full sm:w-auto px-10 py-4 font-bold text-base bg-[#39D98A] hover:bg-[#2ecc71] text-[#064E3B] border-none shadow-[0_8px_30px_rgba(57,217,138,0.35)] hover:shadow-[0_12px_40px_rgba(57,217,138,0.55)] hover:scale-[1.02] transition-all"
                icon={ArrowRight}
                iconPosition="right"
              >
                START QUIZ
              </Button>

              <Button
                size="xl"
                variant="outline"
                onClick={() => {
                  const elem = document.getElementById('rules');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 font-semibold text-sm text-white border-white/30 bg-white/5 hover:bg-white/15 backdrop-blur-sm transition-all"
              >
                CONTEST RULES
              </Button>
            </motion.div>

            {/* ========================================================================= */}
            {/* CENTERPIECE: INTERACTIVE COMPETITION PREVIEW DECK */}
            {/* ========================================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35, ease: 'easeOut' }}
              className="pt-6 max-w-3xl mx-auto"
            >
              <div className="p-1 rounded-3xl bg-gradient-to-b from-[#39D98A]/30 via-celticBlue/30 to-white/20 shadow-2xl backdrop-blur-md">
                <div className="bg-[#1C2826]/95 rounded-[22px] p-6 sm:p-8 text-left border border-white/10 shadow-inner">
                  {/* Console Header Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-teaGreen-200/20 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#39D98A]" />
                      <span className="font-mono font-semibold text-teaGreen-200 ml-1">
                        sample_logic_puzzle.cpp
                      </span>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-[11px] text-teaGreen-100/70">
                      <span className="px-2 py-0.5 rounded bg-celticBlue/40 text-teaGreen-200 font-bold border border-celticBlue/40">
                        25 MCQs
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-teaGreen-100">60 Minutes</span>
                      <span>•</span>
                      <span className="text-[#39D98A] font-semibold">1 Attempt</span>
                    </div>
                  </div>

                  {/* Code snippet */}
                  <div className="p-4 rounded-xl bg-black/50 text-teaGreen-100 font-mono text-xs leading-relaxed mb-5 shadow-inner border border-white/5">
                    <div className="text-white/40">// Question Preview: Mental Execution Without Terminal</div>
                    <div className="text-cyan-400">#include &lt;iostream&gt;</div>
                    <div className="text-cyan-400">using namespace std;</div>
                    <div className="pt-1.5"><span className="text-amber-300">int</span> <span className="text-[#39D98A]">main</span>() {'{'}</div>
                    <div className="pl-4 text-white/90"><span className="text-amber-300">int</span> arr[] = {'{'}10, 20, 30, 40{'}'};</div>
                    <div className="pl-4 text-white/90"><span className="text-amber-300">int</span> *ptr = arr;</div>
                    <div className="pl-4 text-teaGreen-200">cout &lt;&lt; *(ptr + 2) &lt;&lt; <span className="text-amber-300">" "</span> &lt;&lt; *ptr + 2;</div>
                    <div className="pl-4 text-amber-300">return 0;</div>
                    <div>{'}'}</div>
                  </div>

                  {/* Interactive Options Preview */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-teaGreen-200/80 uppercase tracking-wider mb-2">
                      Test Your Pure Logic: Select Output
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: 'A', text: '30 12', correct: true },
                        { id: 'B', text: '30 30', correct: false },
                        { id: 'C', text: '20 12', correct: false },
                        { id: 'D', text: '30 20', correct: false },
                      ].map((opt) => {
                        const isChosen = selectedSampleOpt === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleSampleChoice(opt.id)}
                            className={`p-3 rounded-xl border text-xs font-mono font-semibold flex items-center justify-between transition-all cursor-pointer ${
                              isChosen
                                ? 'bg-[#39D98A] text-[#064E3B] border-[#39D98A] shadow-md font-bold'
                                : 'bg-white/5 hover:bg-white/10 text-teaGreen-100 border-white/15'
                            }`}
                          >
                            <span>[{opt.id}] {opt.text}</span>
                            {isChosen && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Interactive Micro Feedback */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-teaGreen-100/70">
                    <div className="flex items-center gap-1.5">
                      {sampleFeedback ? (
                        <span className="text-[#39D98A] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#39D98A]" />
                          Correct! `*(ptr + 2)` = 30, and `*ptr + 2` = 12.
                        </span>
                      ) : (
                        <span className="text-amber-400 font-semibold">
                          Notice precedence: `*(ptr+2)` dereferences offset, while `*ptr + 2` adds 2 to 10!
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-cyan-300 font-semibold hidden sm:inline">
                      Blind Coding Core Logic
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4 COMPETITIVE PROGRAMMING PILLARS */}
        {/* ========================================================================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-teaGreen-200">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teaGreen-100 text-drabDark text-xs font-bold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5 text-celticBlue" /> The Blind Coding Philosophy
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-comfortaa text-drabDark">
              What Makes It Blind Coding?
            </h2>
            <p className="text-xs sm:text-sm text-drabDark/70 mt-2 font-normal">
              Most developers rely heavily on compilers, debuggers, and trials. Blind Coding tests pure algorithmic comprehension without visual aids.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {competitionPillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <Card
                  key={i}
                  variant="default"
                  hoverEffect
                  className="p-6 border border-teaGreen-300 bg-white shadow-subtle flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-celticBlue-50 text-celticBlue flex items-center justify-center mb-5 border border-celticBlue-200 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-comfortaa font-bold text-lg text-drabDark mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs text-drabDark/70 leading-relaxed font-normal">
                      {p.desc}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* EVENT ROUNDS OVERVIEW */}
        {/* ========================================================================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-teaGreen-200 bg-ivory">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vanilla text-drabDark text-xs font-bold uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5 text-celticBlue" /> Tournament Structure
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-comfortaa text-drabDark">
              Two Intense Rounds
            </h2>
            <p className="text-xs sm:text-sm text-drabDark/70 mt-2 font-normal">
              Designed to challenge both rapid logical deductions and hands-on unseen code synthesis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Round 1 Card */}
            <div className="p-1 rounded-3xl bg-gradient-to-b from-celticBlue-300 via-teaGreen-300 to-vanilla-300 shadow-elevated">
              <div className="p-8 rounded-[22px] bg-white h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full bg-celticBlue-50 text-celticBlue font-bold font-comfortaa text-xs uppercase border border-celticBlue-200">
                      CURRENT PHASE
                    </span>
                    <span className="font-mono text-xs font-semibold text-drabDark/60">
                      Phase 01 / 02
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-comfortaa text-drabDark mb-2">
                    Round 1: Mental Code Execution
                  </h3>
                  <p className="text-xs sm:text-sm text-drabDark/70 mb-6 leading-relaxed">
                    25 Multiple Choice Questions testing mental execution of C++, Python, and JavaScript snippets, pointers, scoping, and recursion.
                  </p>

                  <div className="space-y-3 font-poppins text-xs">
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-ivory border border-teaGreen-200">
                      <Clock className="w-4 h-4 text-celticBlue flex-shrink-0" />
                      <span><strong>Duration:</strong> 60 Minutes Synchronized Timer</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-ivory border border-teaGreen-200">
                      <ShieldCheck className="w-4 h-4 text-celticBlue flex-shrink-0" />
                      <span><strong>Format:</strong> 25 Randomized MCQs with 4 Options</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-ivory border border-teaGreen-200">
                      <UserCheck className="w-4 h-4 text-celticBlue flex-shrink-0" />
                      <span><strong>Cutoff:</strong> Top scoring candidates advance to Round 2</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate('/register')}
                    className="w-full justify-center font-bold"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    START ROUND 1 ASSESSMENT
                  </Button>
                </div>
              </div>
            </div>

            {/* Round 2 Card */}
            <div className="p-1 rounded-3xl bg-ivory border-2 border-dashed border-teaGreen-300">
              <div className="p-8 rounded-[22px] bg-ivory/60 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full bg-vanilla text-drabDark font-bold font-comfortaa text-xs uppercase border border-vanilla-400">
                      UPCOMING PHASE
                    </span>
                    <span className="font-mono text-xs font-semibold text-drabDark/60">
                      Phase 02 / 02
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-comfortaa text-drabDark mb-2">
                    Round 2: True Blind Coding
                  </h3>
                  <p className="text-xs sm:text-sm text-drabDark/70 mb-6 leading-relaxed">
                    Qualified candidates write complete functional programs with their computer screens turned completely off or darkened. Zero visual feedback.
                  </p>

                  <div className="space-y-3 font-poppins text-xs text-drabDark/80">
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-teaGreen-200">
                      <EyeOff className="w-4 h-4 text-teaGreen-600 flex-shrink-0" />
                      <span><strong>Format:</strong> Monitor Display Powered Off</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-teaGreen-200">
                      <Terminal className="w-4 h-4 text-teaGreen-600 flex-shrink-0" />
                      <span><strong>Evaluation:</strong> Syntax Accuracy, Logic & Test Cases</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-teaGreen-200">
                      <GraduationCap className="w-4 h-4 text-teaGreen-600 flex-shrink-0" />
                      <span><strong>Eligibility:</strong> Shortlisted candidates from Round 1</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="p-3.5 rounded-xl bg-white border border-teaGreen-300 text-center text-xs font-semibold text-drabDark/70">
                    Round 2 portal unlocks upon Round 1 merit declaration
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CONTEST RULES & PROTOCOLS */}
        {/* ========================================================================= */}
        <section id="rules" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-teaGreen-200 bg-ivory">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vanilla text-drabDark text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-celticBlue" /> Official Regulations
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-comfortaa text-drabDark">
              Competition Protocol
            </h2>
            <p className="text-xs sm:text-sm text-drabDark/70 mt-2 font-normal">
              Key guidelines and automated protocols to ensure fair competition for all participants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rulesData.map((rule) => {
              const RuleIcon = rule.icon;
              return (
                <div
                  key={rule.num}
                  className="p-6 rounded-2xl bg-white border border-teaGreen-300 shadow-subtle hover:border-celticBlue-300 transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-comfortaa font-bold text-xl text-celticBlue">
                      {rule.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-ivory text-drabDark flex items-center justify-center group-hover:bg-celticBlue-50 group-hover:text-celticBlue transition-colors">
                      <RuleIcon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-comfortaa font-bold text-base text-drabDark mb-2">
                    {rule.title}
                  </h3>
                  <p className="text-xs text-drabDark/70 leading-relaxed font-normal">
                    {rule.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ROUND 01 EVENT DETAILS & COORDINATORS */}
        {/* ========================================================================= */}
        <section id="details" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-teaGreen-200">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-teaGreen-400 shadow-premium">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-celticBlue-50 border border-celticBlue-200 text-celticBlue text-xs font-bold uppercase tracking-wider">
                  Official College Event • Academic Year 2025–2026
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-comfortaa text-drabDark">
                  Department of Computer Science and Engineering
                </h3>
                <p className="text-xs sm:text-sm text-drabDark/80 leading-relaxed">
                  Jointly presented by the <strong>CSE Student Association (TECH FORCE)</strong> and the <strong>CSI Student Chapter</strong>.
                  Official scores, candidate ranks, and merit standings are verified and announced directly by the event coordinators.
                </p>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-poppins">
                  <div className="p-4 rounded-xl bg-ivory border border-teaGreen-200 space-y-1">
                    <span className="text-[10px] text-drabDark/60 uppercase font-bold block">Faculty Coordinators</span>
                    <div className="font-bold text-drabDark">• Mrs. S. Somiya (ASP/CSE)</div>
                    <div className="font-bold text-drabDark">• Mrs. S. Ramya (AP/CSE)</div>
                  </div>

                  <div className="p-4 rounded-xl bg-ivory border border-teaGreen-200 space-y-1">
                    <span className="text-[10px] text-drabDark/60 uppercase font-bold block">Student Coordinators</span>
                    <div className="font-bold text-celticBlue">• Mr. S. Logesh Raja (IV Year)</div>
                    <div className="font-bold text-celticBlue">• Mr. K. V. Hari Krishnan (IV Year)</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
                <div className="p-6 rounded-2xl bg-ivory border border-teaGreen-300 w-full max-w-sm text-center space-y-4 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-celticBlue text-white flex items-center justify-center mx-auto shadow-md">
                    <Terminal className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-comfortaa font-bold text-lg text-drabDark">
                      Ready to Test Your Mind?
                    </h4>
                    <p className="text-xs text-drabDark/60 mt-1">
                      Register with your official student credentials and begin Round 1.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate('/register')}
                    className="w-full font-bold shadow-md bg-[#39D98A] hover:bg-[#2ecc71] text-[#064E3B] border-none"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    START QUIZ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
};
