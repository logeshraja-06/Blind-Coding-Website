import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Calendar, ChevronRight } from 'lucide-react';
import { TechForceLogo } from '../../assets/logo/TechForceLogo';

export const Footer = () => {
  return (
    <footer className="bg-drabDark text-ivory pt-16 pb-12 border-t-2 border-teaGreen-400 relative overflow-hidden font-poppins">
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-celticBlue/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teaGreen/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-teaGreen-400/40">
          {/* Col 1: Association & Event Branding (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <TechForceLogo isDark={true} className="w-12 h-12" />
            </div>
            
            <div className="pt-2">
              <h3 className="font-comfortaa font-bold text-2xl text-ivory tracking-wide">
                BLIND <span className="text-teaGreen">CODING</span> 2026
              </h3>
              <p className="text-xs font-bold text-teaGreen uppercase tracking-wider mt-1">
                DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
              </p>
            </div>

            <p className="text-sm text-ivory leading-relaxed max-w-lg">
              Organized by the <strong className="text-vanilla font-semibold">CSE Association & CSI Student Chapter</strong> for the Academic Year <strong className="text-vanilla font-semibold">2025–2026</strong>. 
              A premier technical competition testing algorithmic logic, memory visualization, and dry-running capabilities.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-drabDark-700 border border-teaGreen-400/60 text-vanilla text-xs font-bold shadow-sm">
                <Calendar className="w-4 h-4 text-vanilla" /> 31.07.2026 — Friday
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-drabDark-700 border border-teaGreen-400/60 text-teaGreen text-xs font-bold shadow-sm">
                <Award className="w-4 h-4 text-teaGreen" /> CSE Students Only
              </span>
            </div>
          </div>

          {/* Col 2: Event Coordinators (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-comfortaa font-bold text-teaGreen text-sm uppercase tracking-wider">
              Event Coordinators
            </h4>
            
            <div className="space-y-4 text-xs">
              {/* Student Coordinators */}
              <div className="p-3 rounded-xl bg-drabDark-700/80 border border-teaGreen-400/40 space-y-1">
                <span className="text-vanilla font-bold block text-[10px] uppercase tracking-wider">
                  Student Coordinators
                </span>
                <span className="font-semibold text-ivory text-xs block">
                  • Mr. S. Logesh Raja <span className="text-teaGreen text-[11px] font-normal">(IV Year)</span>
                </span>
                <span className="font-semibold text-ivory text-xs block">
                  • Mr. K. V. Hari Krishnan <span className="text-teaGreen text-[11px] font-normal">(IV Year)</span>
                </span>
              </div>

              {/* Faculty Coordinators */}
              <div className="p-3 rounded-xl bg-drabDark-700/80 border border-teaGreen-400/40 space-y-1">
                <span className="text-vanilla font-bold block text-[10px] uppercase tracking-wider">
                  Faculty Coordinators
                </span>
                <span className="font-semibold text-ivory text-xs block">
                  • Mrs. S. Somiya <span className="text-teaGreen text-[11px] font-normal">(ASP/CSE)</span>
                </span>
                <span className="font-semibold text-ivory text-xs block">
                  • Mrs. S. Ramya <span className="text-teaGreen text-[11px] font-normal">(AP/CSE)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-comfortaa font-bold text-teaGreen text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link to="/" className="text-ivory hover:text-vanilla transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teaGreen" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-vanilla hover:text-teaGreen font-bold transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-vanilla" />
                  <span>Register for Event →</span>
                </Link>
              </li>
              <li>
                <a href="/#rules" className="text-ivory hover:text-vanilla transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teaGreen" />
                  <span>Competition Rules</span>
                </a>
              </li>
              <li>
                <a href="/#details" className="text-ivory hover:text-vanilla transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teaGreen" />
                  <span>Official Details</span>
                </a>
              </li>
              <li className="pt-2">
                <Link to="/admin" className="text-teaGreen hover:text-ivory font-bold transition-colors inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-drabDark-700 border border-teaGreen-400/50">
                  <ShieldCheck className="w-4 h-4 text-celticBlue-300" />
                  <span>Admin Console</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar (High Contrast) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory">
          <p className="font-medium text-ivory text-center sm:text-left">
            © 2025–2026 <strong className="text-teaGreen">TECH FORCE</strong> • CSE Association & CSI Student Chapter. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-teaGreen font-semibold">
            <span>Department of Computer Science & Engineering</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
