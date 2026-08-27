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

import heroOptJpg from '../assets/images/hero_competitive_coding_opt.jpg';

export const Home = () => {
  const navigate = useNavigate();

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

  // Motion Variants for Staggered Entrance Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <PageTransition>
      <Navbar />

      <main className="flex-1 bg-[#FBFCEE] font-poppins text-[#343B1B] overflow-hidden">
        {/* ========================================================================= */}
        {/* HERO SECTION — PREMIUM LIGHT EDITORIAL COMPOSITION */}
        {/* ========================================================================= */}
        <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Subtle Ambient Background Accents */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
            <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#3971B8]/5 rounded-full blur-3xl" />
            <div className="absolute top-24 right-10 w-[30rem] h-[30rem] bg-[#C8D696]/20 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#343B1B08_1px,transparent_1px),linear-gradient(to_bottom,#343B1B08_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center"
          >
            {/* LEFT COLUMN: Editorial Content & Actions */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Official Branding Label */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#EEF2ED] border border-[#C8D6CD] text-[#343B1B]">
                <TechForceLogo className="w-4 h-4 flex-shrink-0" showText={false} />
                <span className="text-xs font-bold uppercase tracking-wider text-[#343B1B]">TECH FORCE</span>
                <span className="text-xs text-[#52605A]">•</span>
                <span className="text-[10px] font-semibold text-[#52605A] uppercase tracking-wide">CSE STUDENT ASSOCIATION</span>
              </motion.div>

              {/* Main Headline */}
              <motion.div variants={itemVariants} className="space-y-2">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-comfortaa tracking-tight leading-none text-[#343B1B]">
                  BLIND <span className="text-[#3971B8]">CODING</span>
                </h1>
                <p className="text-xl sm:text-2xl font-bold font-comfortaa text-[#343B1B]/80 tracking-wide pt-1">
                  Think. Trace. Solve.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate('/register')}
                  className="px-7 font-bold text-base shadow-sm rounded-lg bg-[#3971B8] hover:bg-[#2d5d99] text-white border-0"
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
                  className="px-6 font-semibold text-sm rounded-lg border-[#C8D6CD] text-[#343B1B] hover:bg-[#EEF2ED]"
                >
                  VIEW RULES
                </Button>
              </motion.div>

              {/* Minimal Event Info Row */}
              <motion.div variants={itemVariants} className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold uppercase tracking-wider text-[#52605A] font-comfortaa">
                <span>25 QUESTIONS</span>
                <span className="text-[#3971B8]">•</span>
                <span>60 MINUTES</span>
                <span className="text-[#3971B8]">•</span>
                <span>CSE STUDENTS</span>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Premium Editorial Visual Presentation */}
            <motion.div variants={itemVariants} className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-[#C8D6CD] bg-white shadow-xl group">
                <img
                  src={heroOptJpg}
                  alt="Tech Force Blind Coding Competitive Programming Assessment"
                  width="960"
                  height="640"
                  loading="eager"
                  decoding="async"
                  className="w-full h-auto object-cover object-center max-h-[420px] transition-transform duration-500 group-hover:scale-[1.01]"
                />
                
                {/* Subtle Editorial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#343B1B]/40 via-transparent to-transparent pointer-events-none" />

                {/* Restrained Technical Tag Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="px-3.5 py-1.5 rounded-lg bg-white/90 backdrop-blur-md border border-white/50 text-xs font-mono font-bold text-[#343B1B] shadow-sm">
                    PYTHON • JAVA • SQL
                  </div>
                  <div className="px-3 py-1 rounded-lg bg-[#3971B8]/90 text-white text-xs font-mono font-semibold backdrop-blur-md shadow-sm">
                    AY 2025–2026
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
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
