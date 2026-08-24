import React from 'react';
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
  RefreshCw
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { FloatingCodeBg } from '../components/common/FloatingCodeBg';
import { AnimatedCounter } from '../components/common/AnimatedCounter';
import { PageTransition } from '../components/layout/PageTransition';
import { TechForceLogo } from '../assets/logo/TechForceLogo';

export const Home = () => {
  const navigate = useNavigate();

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
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-ivory">
          <FloatingCodeBg opacity={0.5} />

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Column: Heading, Details & CTAs */}
            <div className="lg:col-span-7 text-left space-y-6">
              {/* Badge: TECH FORCE PRESENTS */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-teaGreen-300 shadow-sm"
              >
                <TechForceLogo className="w-5 h-5" showText={false} />
                <span className="text-xs font-bold uppercase tracking-wider text-drabDark font-comfortaa">
                  TECH FORCE PRESENTS
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-celticBlue" />
                <span className="text-[11px] font-semibold text-drabDark/70 font-poppins">DEPARTMENT OF CSE</span>
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-comfortaa tracking-tight text-drabDark leading-[1.05]">
                  BLIND<br />
                  <span className="text-celticBlue">CODING</span>
                </h1>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-drabDark/85 font-medium leading-relaxed max-w-xl font-poppins"
              >
                Think Fast. Trust Your Logic. Code Beyond What You See.
              </motion.p>

              {/* Event Quick Badges */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-wrap items-center gap-3 pt-2 font-poppins"
              >
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-teaGreen-300 shadow-subtle text-xs font-semibold text-drabDark">
                  <Calendar className="w-4 h-4 text-celticBlue" />
                  <span>31 JULY 2026</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-teaGreen-300 shadow-subtle text-xs font-semibold text-drabDark">
                  <GraduationCap className="w-4 h-4 text-teaGreen-600" />
                  <span>CSE STUDENTS</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-teaGreen-300 shadow-subtle text-xs font-semibold text-drabDark">
                  <Clock className="w-4 h-4 text-drabDark" />
                  <span>25 QUESTIONS • 60 MINS</span>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 pt-4"
              >
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate('/register')}
                  className="w-full sm:w-auto font-bold px-8 py-4 text-base shadow-premium font-poppins"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  REGISTER NOW
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    const elem = document.getElementById('details');
                    elem?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto font-semibold px-6 font-poppins"
                >
                  EVENT DETAILS
                </Button>
              </motion.div>
            </div>

            {/* Right Column: Layered Programming Visual Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative w-full aspect-[4/3] max-w-md mx-auto">
                <div className="absolute inset-0 bg-celticBlue/10 rounded-3xl blur-2xl transform -rotate-3" />
                <div className="absolute inset-0 bg-teaGreen/20 rounded-3xl blur-xl transform rotate-2" />

                {/* Terminal Simulation Window */}
                <div className="relative rounded-2xl overflow-hidden bg-drabDark border border-drabDark-600 shadow-2xl z-10">
                  <div className="px-4 py-3 bg-drabDark-700 border-b border-drabDark-600 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-vanilla/80" />
                      <div className="w-3 h-3 rounded-full bg-teaGreen/80" />
                    </div>
                    <div className="text-[11px] font-mono text-teaGreen-300 font-semibold flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-teaGreen" />
                      blind_assessment.cpp
                    </div>
                    <span className="text-[10px] text-ivory/50 font-mono">CSE • 2026</span>
                  </div>

                  <div className="p-5 font-mono text-xs text-teaGreen-100 leading-relaxed overflow-hidden">
                    <div className="text-ivory/40">// TECH FORCE • Logic Challenge</div>
                    <div className="text-celticBlue-300">#include &lt;iostream&gt;</div>
                    <div className="text-celticBlue-300">using namespace std;</div>
                    <div className="pt-2"><span className="text-vanilla">int</span> <span className="text-teaGreen">blindLogic</span>() {'{'}</div>
                    <div className="pl-4 text-ivory/90"><span className="text-vanilla">int</span> x = 10;</div>
                    <div className="pl-4 text-ivory/90">cout &lt;&lt; (<span className="text-teaGreen-300">x++</span>) &lt;&lt; <span className="text-vanilla">" "</span> &lt;&lt; (<span className="text-teaGreen-300">++x</span>);</div>
                    <div className="pl-4 text-vanilla">return 0;</div>
                    <div>{'}'}</div>
                    <div className="pt-2 text-teaGreen-400 font-bold flex items-center gap-1">
                      <span className="animate-pulse">❯</span> Predict Output: <span className="text-vanilla underline decoration-teaGreen">10 12</span>
                    </div>
                  </div>
                </div>

                {/* Floating Card 1 */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -right-6 z-20 p-3.5 rounded-2xl bg-white border-2 border-vanilla shadow-lg flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-vanilla text-drabDark flex items-center justify-center font-bold text-lg font-comfortaa">
                    25
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-drabDark font-comfortaa">MCQ Logic</div>
                    <div className="text-[10px] text-drabDark/60 font-semibold font-poppins">60 Mins Challenge</div>
                  </div>
                </motion.div>

                {/* Floating Card 2 */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-6 -left-6 z-20 p-3.5 rounded-2xl bg-white border-2 border-teaGreen-400 shadow-lg flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-teaGreen text-drabDark flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-drabDark" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-drabDark font-comfortaa">Verified Merit</div>
                    <div className="text-[10px] text-teaGreen-600 font-semibold font-poppins">CSI Chapter Ready</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION: EVENT STATS */}
        <section id="stats" className="py-20 bg-ivory border-y border-teaGreen-300 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-teaGreen-300 text-center shadow-subtle">
                <div className="text-4xl sm:text-5xl font-bold font-comfortaa text-celticBlue mb-2">
                  <AnimatedCounter target={25} />
                </div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-drabDark/70 font-poppins">
                  QUESTIONS
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-teaGreen-300 text-center shadow-subtle">
                <div className="text-4xl sm:text-5xl font-bold font-comfortaa text-drabDark mb-2">
                  <AnimatedCounter target={60} />
                </div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-drabDark/70 font-poppins">
                  MINUTES
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-teaGreen-300 text-center shadow-subtle">
                <div className="text-4xl sm:text-5xl font-bold font-comfortaa text-celticBlue mb-2">
                  <AnimatedCounter target={1} prefix="0" />
                </div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-drabDark/70 font-poppins">
                  CHALLENGE
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-teaGreen-300 text-center shadow-subtle">
                <div className="text-4xl sm:text-5xl font-bold font-comfortaa text-teaGreen-600 mb-2">
                  CSE
                </div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-drabDark/70 font-poppins">
                  STUDENTS
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: OFFICIAL EVENT DETAILS & COORDINATORS */}
        <section id="details" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-celticBlue mb-2 block font-comfortaa">
                Official Information
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-comfortaa text-drabDark mb-4">
                Event Organization & Schedule
              </h2>
              <p className="text-base text-drabDark/70 font-poppins">
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
                    <span className="text-xs text-celticBlue font-semibold uppercase tracking-wider font-poppins">
                      Official Department Qualifier
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-poppins">
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
                  <p className="text-xs text-drabDark/60 font-poppins">Faculty & Student leadership team</p>
                </div>

                {/* Student Coordinators */}
                <div className="space-y-3">
                  <span className="text-xs font-bold font-comfortaa uppercase tracking-wider text-celticBlue block">
                    Student Coordinators
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-poppins">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-poppins">
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

        {/* SECTION: RULES SECTION */}
        <section id="rules" className="py-24 px-4 sm:px-6 lg:px-8 bg-ivory">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-celticBlue mb-2 block font-comfortaa">
                Official Rules
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-comfortaa text-drabDark mb-4">
                Assessment Protocol & Guidelines
              </h2>
              <p className="text-base text-drabDark/70 font-poppins">
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
                      <p className="text-xs text-drabDark/70 leading-relaxed font-poppins">
                        {rule.desc}
                      </p>
                    </div>
                  </Card>
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
