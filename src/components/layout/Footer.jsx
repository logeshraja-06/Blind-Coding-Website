import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Terminal, Calendar, UserCheck, Sparkles } from 'lucide-react';
import { TechForceLogo } from '../../assets/logo/TechForceLogo';

export const Footer = () => {
  return (
    <footer className="bg-drabDark text-ivory/80 pt-16 pb-12 border-t border-drabDark-700 relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-celticBlue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teaGreen/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-drabDark-700">
          {/* Col 1: Association & Event Branding */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <TechForceLogo className="w-12 h-12" textClass="text-ivory" />
            </div>
            <div className="pt-2">
              <h3 className="font-comfortaa font-bold text-xl text-ivory">
                BLIND <span className="text-teaGreen">CODING</span> 2026
              </h3>
              <p className="text-xs text-teaGreen-300 font-semibold uppercase tracking-wider mt-0.5">
                Department of Computer Science and Engineering
              </p>
            </div>
            <p className="text-xs text-ivory/70 max-w-md leading-relaxed">
              Organized by <strong>CSE Association and CSI Student Chapter</strong> for the Academic Year <strong>2025–2026</strong>.
              A premier technical competition testing algorithmic logic and dry-running instinct without compiler output.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-drabDark-700 text-vanilla text-xs font-semibold">
                <Calendar className="w-3.5 h-3.5" /> 31.07.2026 — Friday
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-drabDark-700 text-teaGreen text-xs font-semibold">
                <Award className="w-3.5 h-3.5" /> CSE Students Only
              </span>
            </div>
          </div>

          {/* Col 2: Event Coordinators */}
          <div>
            <h4 className="font-comfortaa font-semibold text-ivory text-xs uppercase tracking-wider mb-4 text-teaGreen">
              Event Coordinators
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-ivory/50 block text-[10px] uppercase font-bold">Student Coordinators</span>
                <span className="font-semibold text-ivory block">• Mr. S. Logesh Raja (IV Year)</span>
                <span className="font-semibold text-ivory block">• Mr. K. V. Hari Krishnan (IV Year)</span>
              </div>
              <div className="pt-1">
                <span className="text-ivory/50 block text-[10px] uppercase font-bold">Faculty Coordinators</span>
                <span className="text-ivory block">• Mrs. S. Somiya (ASP/CSE)</span>
                <span className="text-ivory block">• Mrs. S. Ramya (AP/CSE)</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation & Admin */}
          <div>
            <h4 className="font-comfortaa font-semibold text-ivory text-xs uppercase tracking-wider mb-4 text-teaGreen">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-teaGreen transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-teaGreen transition-colors font-semibold text-teaGreen">
                  Register for Event →
                </Link>
              </li>
              <li>
                <a href="/#rules" className="hover:text-teaGreen transition-colors">
                  Competition Rules
                </a>
              </li>
              <li>
                <a href="/#details" className="hover:text-teaGreen transition-colors">
                  Official Details
                </a>
              </li>
              <li className="pt-2">
                <Link to="/admin" className="hover:text-teaGreen transition-colors flex items-center gap-1 text-ivory/70">
                  <ShieldCheck className="w-3.5 h-3.5 text-celticBlue" />
                  Admin Console
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/50">
          <p>© 2025–2026 TECH FORCE • CSE Association & CSI Student Chapter. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Department of Computer Science & Engineering</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
