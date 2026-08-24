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
  Calendar,
  UserCheck,
  GraduationCap,
  Users,
  Code2
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { FloatingCodeBg } from '../components/common/FloatingCodeBg';
import { AnimatedCounter } from '../components/common/AnimatedCounter';
import { PageTransition } from '../components/layout/PageTransition';
import { TechForceLogo } from '../assets/logo/TechForceLogo';

export const Home = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  const faqData = [
    {
      q: 'How many questions are in the Blind Coding contest?',
      a: 'The assessment contains exactly 25 multiple-choice questions covering core programming concepts, pointer logic, recursion, asynchronous behavior, and output predictions in JavaScript, Python, C++, and Algorithms.',
    },
    {
      q: 'Who is eligible to participate in this event?',
      a: 'This event is exclusively conducted for Computer Science and Engineering (CSE) students across 1st, 2nd, 3rd, and 4th years for the Academic Year 2025–2026.',
    },
    {
      q: 'Why is Register Number mandatory?',
      a: 'Your numeric college register number (e.g. 953710) uniquely verifies your participation, prevents duplicate submissions, and maps to official department merit records.',
    },
    {
      q: 'Can I see the answer key or other participants’ scores?',
      a: 'No. To maintain complete competition integrity, students will only see their own final score and percentage upon submission. Answer reviews and leaderboard ranks are strictly confidential and accessible only by administrators.',
    },
    {
      q: 'What happens when the 60-minute timer runs out?',
      a: 'The server automatically locks your attempt, saves all your selected options, calculates your score, and transitions you directly to your private score screen.',
    },
  ];

  const rulesData = [
    {
      num: '01',
      title: '25 MCQ Questions',
      desc: 'The contest contains 25 multiple-choice questions testing code reasoning.',
      icon: Terminal,
    },
    {
      num: '02',
      title: '60 Minutes Duration',
      desc: 'Total duration is 60 minutes. The countdown starts immediately upon entering.',
      icon: Clock,
    },
    {
      num: '03',
      title: 'Register Number Compulsory',
      desc: 'A valid numeric college register number is required to access the contest.',
      icon: Lock,
    },
    {
      num: '04',
      title: 'Single Official Attempt',
      desc: 'Each student is strictly allowed only one attempt per register number.',
      icon: UserCheck,
    },
    {
      num: '05',
      title: 'Real-time Auto-Save',
      desc: 'Selected answers are automatically synced with the backend server.',
      icon: RefreshCw,
    },
    {
      num: '06',
      title: 'Auto-Submit on Timeout',
      desc: 'The quiz automatically locks and submits when the clock hits 00:00.',
      icon: Zap,
    },
    {
      num: '07',
      title: 'Irreversible Submission',
      desc: 'Once submitted, answers cannot be modified or re-attempted.',
      icon: ShieldCheck,
    },
    {
      num: '08',
      title: 'Confidential Private Score',
      desc: 'Students receive their private score and percentage. Answer keys remain confidential.',
      icon: Sparkles,
    },
  ];

  return (
    <PageTransition>
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION — IMMERSIVE & HIGH IMPACT */}
        <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-ivory">
          <FloatingCodeBg opacity={0.55} />

          <div className="max-w-6xl mx-auto text-center relative z-10">
            {/* Association & Department Top Pill */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-teaGreen-400 shadow-sm backdrop-blur-md mb-6"
            >
              <TechForceLogo className="w-6 h-6" showText={false} />
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-drabDark">
                <span className="text-celticBlue">TECH FORCE</span>
                <span>•</span>
                <span>DEPARTMENT OF CSE (2025–2026)</span>
              </div>
            </motion.div>

            {/* Staggered Major Heading */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-5xl sm:text-7xl lg:text-9xl font-bold font-comfortaa tracking-tight text-drabDark leading-[1.02] mb-6">
                BLIND<br />
                <span className="text-celticBlue drop-shadow-sm">CODING</span>
              </h1>
            </motion.div>

            {/* Official Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-2xl text-drabDark font-medium max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Think Fast. Trust Your Logic. Code Beyond What You See.
            </motion.p>

            {/* Official Event Metadata Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 max-w-2xl mx-auto"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-teaGreen-300 shadow-subtle text-xs font-bold text-drabDark">
                <Calendar className="w-4 h-4 text-celticBlue" />
                <span>31 JULY 2026 — FRIDAY</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-teaGreen-300 shadow-subtle text-xs font-bold text-drabDark">
                <GraduationCap className="w-4 h-4 text-teaGreen-600" />
                <span>CSE STUDENTS</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-teaGreen-300 shadow-subtle text-xs font-bold text-drabDark">
                <Trophy className="w-4 h-4 text-vanilla-500" />
                <span>25 QUESTIONS • 60 MINS</span>
              </div>
            </motion.div>

            {/* Primary & Secondary CTAs */}
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
                className="w-full sm:w-auto font-bold px-8 py-4 text-base shadow-premium"
                icon={ArrowRight}
                iconPosition="right"
              >
                REGISTER FOR EVENT
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const elem = document.getElementById('details');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto font-semibold"
              >
                EXPLORE EVENT
              </Button>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: ENTER THE CHALLENGE (Gaming × Logic Cards) */}
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-celticBlue mb-2 block">
                The Assessment Concept
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-comfortaa text-drabDark mb-4">
                Enter the Challenge
              </h2>
              <p className="text-base text-drabDark/70 leading-relaxed">
                Blind Coding tests your pure mental compiler. Analyze complex code structures, spot syntactic subtleties, and predict program behaviors under timed conditions without editor assistance.
              </p>
            </div>

            {/* 3 Interactive Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: THINK */}
              <Card
                variant="ivory"
                hoverEffect
                className="p-8 border-2 border-teaGreen-300 relative overflow-hidden group shadow-subtle"
              >
                <div className="w-14 h-14 rounded-2xl bg-vanilla-200 text-drabDark flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  🧠
                </div>
                <div className="text-xs font-bold font-comfortaa text-celticBlue uppercase tracking-widest mb-1">
                  STAGE 01
                </div>
                <h3 className="text-2xl font-bold font-comfortaa text-drabDark mb-3">
                  THINK
                </h3>
                <p className="text-sm text-drabDark/70 leading-relaxed">
                  Analyze algorithms, pointer logic, asynchronous microtasks, and recursive execution paths.
                </p>
              </Card>

              {/* Card 2: DECIDE */}
              <Card
                variant="ivory"
                hoverEffect
                className="p-8 border-2 border-teaGreen-300 relative overflow-hidden group shadow-subtle"
              >
                <div className="w-14 h-14 rounded-2xl bg-teaGreen-300 text-drabDark flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <div className="text-xs font-bold font-comfortaa text-teaGreen-600 uppercase tracking-widest mb-1">
                  STAGE 02
                </div>
                <h3 className="text-2xl font-bold font-comfortaa text-drabDark mb-3">
                  DECIDE
                </h3>
                <p className="text-sm text-drabDark/70 leading-relaxed">
                  Choose the correct answer from precise MCQ options before the 60-minute timer reaches zero.
                </p>
              </Card>

              {/* Card 3: COMPETE */}
              <Card
                variant="ivory"
                hoverEffect
                className="p-8 border-2 border-teaGreen-300 relative overflow-hidden group shadow-subtle"
              >
                <div className="w-14 h-14 rounded-2xl bg-celticBlue-100 text-celticBlue flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  🏆
                </div>
                <div className="text-xs font-bold font-comfortaa text-vanilla-500 uppercase tracking-widest mb-1">
                  STAGE 03
                </div>
                <h3 className="text-2xl font-bold font-comfortaa text-drabDark mb-3">
                  COMPETE
                </h3>
                <p className="text-sm text-drabDark/70 leading-relaxed">
                  Submit your assessment, earn your verified score, and prove your problem-solving prowess.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION 3: EVENT STATS SECTION */}
        <section id="stats" className="py-20 bg-ivory border-y border-teaGreen-300 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {/* Stat 1 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-teaGreen-300 text-center shadow-subtle">
                <div className="text-4xl sm:text-5xl font-bold font-comfortaa text-celticBlue mb-2">
                  <AnimatedCounter target={25} />
                </div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-drabDark/70">
                  QUESTIONS
                </div>
              </div>

              {/* Stat 2 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-teaGreen-300 text-center shadow-subtle">
                <div className="text-4xl sm:text-5xl font-bold font-comfortaa text-drabDark mb-2">
                  <AnimatedCounter target={60} />
                </div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-drabDark/70">
                  MINUTES
                </div>
              </div>

              {/* Stat 3 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-teaGreen-300 text-center shadow-subtle">
                <div className="text-4xl sm:text-5xl font-bold font-comfortaa text-celticBlue mb-2">
                  <AnimatedCounter target={1} prefix="0" />
                </div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-drabDark/70">
                  CHALLENGE
                </div>
              </div>

              {/* Stat 4 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-teaGreen-300 text-center shadow-subtle">
                <div className="text-4xl sm:text-5xl font-bold font-comfortaa text-teaGreen-600 mb-2">
                  CSE
                </div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-drabDark/70">
                  STUDENTS
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: OFFICIAL EVENT DETAILS & COORDINATORS */}
        <section id="details" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-celticBlue mb-2 block">
                Official Information
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-comfortaa text-drabDark mb-4">
                Event Organization & Schedule
              </h2>
              <p className="text-base text-drabDark/70">
                Conducted by the Department of Computer Science & Engineering under TECH FORCE association.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Event Metadata Card */}
              <Card variant="ivory" className="p-8 border-2 border-teaGreen-300 shadow-premium space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-teaGreen-200">
                  <TechForceLogo className="w-10 h-10" showText={false} />
                  <div>
                    <h3 className="font-comfortaa font-bold text-lg text-drabDark">
                      BLIND CODING 2026
                    </h3>
                    <span className="text-xs text-celticBlue font-semibold uppercase tracking-wider">
                      Official Department Qualifier
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-white border border-teaGreen-200">
                    <span className="text-drabDark/60 uppercase text-[10px] block font-bold">Event Date</span>
                    <span className="font-bold text-drabDark text-sm">31.07.2026 — Friday</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-teaGreen-200">
                    <span className="text-drabDark/60 uppercase text-[10px] block font-bold">Organized By</span>
                    <span className="font-bold text-drabDark text-sm">CSE Association & CSI</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-teaGreen-200">
                    <span className="text-drabDark/60 uppercase text-[10px] block font-bold">Academic Year</span>
                    <span className="font-bold text-drabDark text-sm">2025–2026</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-teaGreen-200">
                    <span className="text-drabDark/60 uppercase text-[10px] block font-bold">Eligibility</span>
                    <span className="font-bold text-celticBlue text-sm">CSE Students (All Years)</span>
                  </div>
                </div>
              </Card>

              {/* Coordinators Card */}
              <Card variant="default" className="p-8 border-2 border-teaGreen-300 shadow-premium bg-white space-y-6">
                <div className="pb-4 border-b border-teaGreen-200">
                  <h3 className="font-comfortaa font-bold text-lg text-drabDark">
                    Event Coordinators
                  </h3>
                  <p className="text-xs text-drabDark/60">Faculty & Student leadership team</p>
                </div>

                {/* Student Coordinators */}
                <div className="space-y-3">
                  <span className="text-xs font-bold font-comfortaa uppercase tracking-wider text-celticBlue block">
                    Student Coordinators
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-ivory border border-teaGreen-200">
                      <div className="font-bold text-drabDark">Mr. S. Logesh Raja</div>
                      <div className="text-[11px] text-drabDark/60 font-semibold">IV Year CSE</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-ivory border border-teaGreen-200">
                      <div className="font-bold text-drabDark">Mr. K. V. Hari Krishnan</div>
                      <div className="text-[11px] text-drabDark/60 font-semibold">IV Year CSE</div>
                    </div>
                  </div>
                </div>

                {/* Faculty Coordinators */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold font-comfortaa uppercase tracking-wider text-teaGreen-600 block">
                    Faculty Coordinators
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-ivory border border-teaGreen-200">
                      <div className="font-bold text-drabDark">Mrs. S. Somiya</div>
                      <div className="text-[11px] text-drabDark/60 font-semibold">ASP / CSE</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-ivory border border-teaGreen-200">
                      <div className="font-bold text-drabDark">Mrs. S. Ramya</div>
                      <div className="text-[11px] text-drabDark/60 font-semibold">AP / CSE</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION 5: RULES SECTION (8 Visual Cards) */}
        <section id="rules" className="py-24 px-4 sm:px-6 lg:px-8 bg-ivory">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-celticBlue mb-2 block">
                Official Rules
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-comfortaa text-drabDark mb-4">
                Assessment Protocol & Guidelines
              </h2>
              <p className="text-base text-drabDark/70">
                Please review the 8 mandatory competition rules before entering the platform.
              </p>
            </div>

            {/* 8 Rules Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {rulesData.map((rule) => {
                const Icon = rule.icon;
                return (
                  <Card
                    key={rule.num}
                    variant="default"
                    hoverEffect
                    className="p-6 border border-teaGreen-300 bg-white flex flex-col justify-between"
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
                      <h3 className="font-comfortaa font-bold text-sm text-drabDark mb-2">
                        {rule.title}
                      </h3>
                      <p className="text-xs text-drabDark/70 leading-relaxed">
                        {rule.desc}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 6: FAQ SECTION */}
        <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-celticBlue mb-2 block">
                Questions & Answers
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-comfortaa text-drabDark mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-drabDark/70">
                Need clarifications regarding the Blind Coding assessment platform?
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
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-comfortaa font-bold text-sm sm:text-base text-drabDark hover:text-celticBlue transition-colors cursor-pointer"
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
