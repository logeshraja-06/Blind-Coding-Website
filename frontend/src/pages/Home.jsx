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
  Layers,
  HelpCircle,
  FileCode,
  Award
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { PageTransition } from '../components/layout/PageTransition';
import { TechForceLogo } from '../assets/logo/TechForceLogo';

export const Home = () => {
  const navigate = useNavigate();

  // Interactive Sample Puzzle on Hero Right Column (State Only, No Lag)
  const [selectedSampleOpt, setSelectedSampleOpt] = useState('A');
  const [sampleFeedback, setSampleFeedback] = useState(true);

  const handleSampleChoice = (opt) => {
    setSelectedSampleOpt(opt);
    setSampleFeedback(opt === 'A');
  };

  const eventHighlights = [
    { label: '25 Questions', sub: 'Logic & Reasoning MCQs', icon: Terminal },
    { label: '60 Minutes', sub: 'Synchronized Timer', icon: Clock },
    { label: 'One Official Attempt', sub: 'Strict Security', icon: UserCheck },
  ];

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

      <main className="flex-1 bg-[#FAFBF8] font-poppins text-[#18231F] overflow-hidden">
        {/* ========================================================================= */}
        {/* HERO SECTION — LIGHT ASYMMETRIC EDITORIAL LAYOUT */}
        {/* ========================================================================= */}
        <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Subtle Ambient Background Gradients (Light & Elegant) */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
            <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#39716B]/5 rounded-full blur-3xl" />
            <div className="absolute top-24 right-10 w-[30rem] h-[30rem] bg-[#3971B8]/5 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#18231F05_1px,transparent_1px),linear-gradient(to_bottom,#18231F05_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* LEFT COLUMN: Editorial Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Professional Event Label */}
              <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-md bg-[#EEF2ED] border border-[#C8D6CD] text-[#18231F]">
                <TechForceLogo className="w-5 h-5 flex-shrink-0" showText={false} />
                <div className="text-left leading-tight">
                  <span className="text-xs font-bold uppercase tracking-wider block text-[#18231F]">
                    TECH FORCE
                  </span>
                  <span className="text-[10px] font-medium text-[#52605A] block uppercase">
                    CSE STUDENT ASSOCIATION
                  </span>
                </div>
              </div>

              {/* Main Heading & Typography */}
              <div className="space-y-1">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-comfortaa tracking-tight leading-none text-[#18231F]">
                  BLIND <span className="text-[#39716B]">CODING</span>
                </h1>
                <p className="text-lg sm:text-xl font-semibold text-[#3971B8] font-comfortaa pt-2">
                  A Competitive Programming Challenge
                </p>
              </div>

              {/* Supporting Copy */}
              <p className="text-sm sm:text-base text-[#52605A] leading-relaxed max-w-xl font-normal">
                Think logically. Read carefully. Solve confidently. Put your programming knowledge to the test.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate('/register')}
                  className="px-7 font-bold text-base shadow-sm"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  START QUIZ
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    const elem = document.getElementById('rules');
                    elem?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 font-semibold text-sm"
                >
                  VIEW RULES
                </Button>
              </div>

              {/* Compact Event Information Cards (Subtle borders, 8px-10px radius) */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
                {eventHighlights.map((h, i) => {
                  const Icon = h.icon;
                  return (
                    <div
                      key={i}
                      className="p-3.5 rounded-lg bg-white border border-[#D0DBD5] shadow-xs flex items-center gap-3"
                    >
                      <div className="w-9 h-9 rounded-md bg-[#EEF2ED] text-[#39716B] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#18231F] font-comfortaa">
                          {h.label}
                        </div>
                        <div className="text-[10px] text-[#52605A] font-medium">
                          {h.sub}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: Code Workspace Visual (Light Editorial Tone) */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-[#D0DBD5] bg-white shadow-md overflow-hidden">
                {/* Editor Header Bar */}
                <div className="px-4 py-3 bg-[#EEF2ED] border-b border-[#D0DBD5] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-[#39D98A]" />
                    <span className="font-mono text-xs font-semibold text-[#18231F] ml-2">
                      logic_puzzle.cpp
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white text-[#39716B] border border-[#C8D6CD]">
                    Mental Code Tracing
                  </span>
                </div>

                {/* Code Snippet */}
                <div className="p-4 bg-[#18231F] text-white font-mono text-xs leading-relaxed text-left">
                  <div className="text-gray-400">// Evaluate without running terminal execution</div>
                  <div className="text-cyan-300">#include &lt;iostream&gt;</div>
                  <div className="text-cyan-300">using namespace std;</div>
                  <div className="pt-1.5"><span className="text-amber-300">int</span> <span className="text-[#39D98A]">main</span>() {'{'}</div>
                  <div className="pl-4 text-gray-200"><span className="text-amber-300">int</span> arr[] = {'{'}10, 20, 30, 40{'}'};</div>
                  <div className="pl-4 text-gray-200"><span className="text-amber-300">int</span> *ptr = arr;</div>
                  <div className="pl-4 text-[#39D98A]">cout &lt;&lt; *(ptr + 2) &lt;&lt; <span className="text-amber-300">" "</span> &lt;&lt; *ptr + 2;</div>
                  <div className="pl-4 text-amber-300">return 0;</div>
                  <div>{'}'}</div>
                </div>

                {/* Interactive Sample Choices */}
                <div className="p-4 bg-white space-y-3 text-left">
                  <div className="text-xs font-semibold text-[#52605A] uppercase tracking-wider">
                    Interactive Sample MCQ Preview
                  </div>
                  <div className="grid grid-cols-2 gap-2">
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
                          className={`p-2.5 rounded-md border text-xs font-mono font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                            isChosen
                              ? 'bg-[#39716B] text-white border-[#39716B]'
                              : 'bg-[#F8FAF7] text-[#18231F] border-[#D0DBD5] hover:bg-[#EEF2ED]'
                          }`}
                        >
                          <span>[{opt.id}] {opt.text}</span>
                          {isChosen && <Check className="w-3.5 h-3.5" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback line */}
                  <div className="pt-2 text-[11px] font-medium text-[#52605A]">
                    {sampleFeedback ? (
                      <span className="text-[#39716B] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#39716B]" />
                        Correct! `*(ptr + 2)` evaluates to 30, and `*ptr + 2` evaluates to 12.
                      </span>
                    ) : (
                      <span className="text-amber-700">
                        Notice operator precedence: `*(ptr+2)` accesses element index 2, while `*ptr + 2` adds 2 to element 0.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4 COMPETITIVE PROGRAMMING PILLARS */}
        {/* ========================================================================= */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#D0DBD5]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EEF2ED] text-[#18231F] text-xs font-bold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5 text-[#39716B]" /> The Blind Coding Philosophy
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-comfortaa text-[#18231F]">
              What Makes It Blind Coding?
            </h2>
            <p className="text-xs sm:text-sm text-[#52605A] mt-2 font-normal">
              Most developers rely heavily on compilers and debuggers. Blind Coding tests pure mental algorithmic execution without visual aids.
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
                  className="p-6 border border-[#D0DBD5] bg-white shadow-xs flex flex-col justify-between rounded-xl"
                >
                  <div>
                    <div className="w-11 h-11 rounded-lg bg-[#EEF2ED] text-[#39716B] flex items-center justify-center mb-4 border border-[#C8D6CD]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-comfortaa font-bold text-base text-[#18231F] mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#52605A] leading-relaxed font-normal">
                      {p.desc}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* EVENT STRUCTURE */}
        {/* ========================================================================= */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#D0DBD5] bg-[#F8FAF7]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EEF2ED] text-[#18231F] text-xs font-bold uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5 text-[#3971B8]" /> Tournament Format
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-comfortaa text-[#18231F]">
              Competition Structure
            </h2>
            <p className="text-xs sm:text-sm text-[#52605A] mt-2 font-normal">
              Designed to challenge both rapid logical deductions and hands-on unseen code synthesis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Round 1 Card */}
            <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#D0DBD5] shadow-sm flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="px-3 py-1 rounded-md bg-[#39716B]/10 text-[#39716B] font-bold font-comfortaa text-xs uppercase border border-[#39716B]/30">
                    ROUND 1 • LOGIC ASSESSMENT
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#52605A]">
                    Phase 01 / 02
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-comfortaa text-[#18231F] mb-2">
                  Mental Code Tracing
                </h3>
                <p className="text-xs sm:text-sm text-[#52605A] mb-6 leading-relaxed">
                  25 Multiple Choice Questions testing mental execution of C++, Python, and JavaScript snippets, pointers, scoping, and recursion.
                </p>

                <div className="space-y-2.5 text-xs text-[#18231F]">
                  <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#FAFBF8] border border-[#D0DBD5]">
                    <Clock className="w-4 h-4 text-[#39716B] flex-shrink-0" />
                    <span><strong>Duration:</strong> 60 Minutes Synchronized Timer</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#FAFBF8] border border-[#D0DBD5]">
                    <ShieldCheck className="w-4 h-4 text-[#39716B] flex-shrink-0" />
                    <span><strong>Format:</strong> 25 Randomized MCQs with 4 Options</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#FAFBF8] border border-[#D0DBD5]">
                    <UserCheck className="w-4 h-4 text-[#39716B] flex-shrink-0" />
                    <span><strong>Selection:</strong> Top scoring candidates advance to Round 2</span>
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
                  START QUIZ
                </Button>
              </div>
            </div>

            {/* Round 2 Card */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#F3F6F1] border border-[#C8D6CD] shadow-xs flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="px-3 py-1 rounded-md bg-[#3971B8]/10 text-[#3971B8] font-bold font-comfortaa text-xs uppercase border border-[#3971B8]/30">
                    ROUND 2 • HANDS-ON ASSESSMENT
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#52605A]">
                    Phase 02 / 02
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-comfortaa text-[#18231F] mb-2">
                  True Blind Coding
                </h3>
                <p className="text-xs sm:text-sm text-[#52605A] mb-6 leading-relaxed">
                  Shortlisted candidates write functional code solutions with their monitor screens powered off or darkened. Zero visual feedback.
                </p>

                <div className="space-y-2.5 text-xs text-[#18231F]">
                  <div className="flex items-center gap-2.5 p-3 rounded-lg bg-white border border-[#D0DBD5]">
                    <EyeOff className="w-4 h-4 text-[#3971B8] flex-shrink-0" />
                    <span><strong>Format:</strong> Monitor Display Powered Off</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-lg bg-white border border-[#D0DBD5]">
                    <Terminal className="w-4 h-4 text-[#3971B8] flex-shrink-0" />
                    <span><strong>Evaluation:</strong> Syntax Accuracy, Logic & Test Cases</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-lg bg-white border border-[#D0DBD5]">
                    <GraduationCap className="w-4 h-4 text-[#3971B8] flex-shrink-0" />
                    <span><strong>Eligibility:</strong> Shortlisted candidates from Round 1</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="p-3 rounded-lg bg-white border border-[#D0DBD5] text-center text-xs font-semibold text-[#52605A]">
                  Round 2 portal unlocks upon Round 1 merit declaration
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CONTEST RULES & PROTOCOLS */}
        {/* ========================================================================= */}
        <section id="rules" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#D0DBD5]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EEF2ED] text-[#18231F] text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#39716B]" /> Official Regulations
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-comfortaa text-[#18231F]">
              Competition Regulations
            </h2>
            <p className="text-xs sm:text-sm text-[#52605A] mt-2 font-normal">
              Key guidelines and automated protocols to ensure fair competition for all participants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {rulesData.map((rule) => {
              const RuleIcon = rule.icon;
              return (
                <div
                  key={rule.num}
                  className="p-6 rounded-xl bg-white border border-[#D0DBD5] shadow-xs hover:border-[#39716B] transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-comfortaa font-bold text-lg text-[#39716B]">
                      {rule.num}
                    </span>
                    <div className="w-9 h-9 rounded-md bg-[#F3F6F1] text-[#18231F] flex items-center justify-center">
                      <RuleIcon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-comfortaa font-bold text-sm text-[#18231F] mb-1.5">
                    {rule.title}
                  </h3>
                  <p className="text-xs text-[#52605A] leading-relaxed font-normal">
                    {rule.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* EVENT DETAILS & ORGANIZERS */}
        {/* ========================================================================= */}
        <section id="details" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#D0DBD5]">
          <div className="p-8 sm:p-10 rounded-xl bg-white border border-[#D0DBD5] shadow-sm text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EEF2ED] border border-[#C8D6CD] text-[#18231F] text-xs font-bold uppercase tracking-wider">
                  Academic Year 2025–2026
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-comfortaa text-[#18231F]">
                  Department of Computer Science and Engineering
                </h3>
                <p className="text-xs sm:text-sm text-[#52605A] leading-relaxed">
                  Organized by the <strong>CSE Student Association (TECH FORCE)</strong> and the <strong>CSI Student Chapter</strong>.
                  Official scores, candidate ranks, and merit standings are verified and announced directly by the event coordinators.
                </p>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-poppins">
                  <div className="p-4 rounded-lg bg-[#FAFBF8] border border-[#D0DBD5] space-y-1">
                    <span className="text-[10px] text-[#52605A] uppercase font-bold block">Faculty Coordinators</span>
                    <div className="font-bold text-[#18231F]">• Mrs. S. Somiya (ASP/CSE)</div>
                    <div className="font-bold text-[#18231F]">• Mrs. S. Ramya (AP/CSE)</div>
                  </div>

                  <div className="p-4 rounded-lg bg-[#FAFBF8] border border-[#D0DBD5] space-y-1">
                    <span className="text-[10px] text-[#52605A] uppercase font-bold block">Student Coordinators</span>
                    <div className="font-bold text-[#39716B]">• Mr. S. Logesh Raja (IV Year)</div>
                    <div className="font-bold text-[#39716B]">• Mr. K. V. Hari Krishnan (IV Year)</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
                <div className="p-6 rounded-xl bg-[#FAFBF8] border border-[#D0DBD5] w-full max-w-sm text-center space-y-4 shadow-xs">
                  <div className="w-14 h-14 rounded-lg bg-[#39716B] text-white flex items-center justify-center mx-auto shadow-xs">
                    <Terminal className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-comfortaa font-bold text-base text-[#18231F]">
                      Ready to Test Your Mind?
                    </h4>
                    <p className="text-xs text-[#52605A] mt-1">
                      Register with your official student credentials and begin the assessment.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate('/register')}
                    className="w-full font-bold shadow-xs"
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
