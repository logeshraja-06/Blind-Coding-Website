import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, ExternalLink, ShieldAlert, Award, Terminal } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-drabDark text-ivory/80 pt-16 pb-12 border-t border-drabDark-700 relative overflow-hidden">
      {/* Decorative Subtle Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-celticBlue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teaGreen/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-drabDark-700">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group inline-flex">
              <div className="w-10 h-10 rounded-xl bg-celticBlue text-ivory flex items-center justify-center shadow-md">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-comfortaa font-bold text-2xl tracking-tight text-ivory">
                BLIND<span className="text-teaGreen">CODE</span>
              </span>
            </Link>
            <p className="text-sm text-ivory/70 max-w-md leading-relaxed mb-6">
              A modern coding quiz experience designed for thinkers, problem solvers, and future developers.
              Test your logic without relying on editors or real-time compiler previews.
            </p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-drabDark-700 text-teaGreen text-xs font-semibold">
                <Award className="w-3.5 h-3.5" />
                Annual Tech Fest 2026
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-drabDark-700 text-vanilla text-xs font-semibold">
                <Terminal className="w-3.5 h-3.5" />
                MCQ Logic Round
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-comfortaa font-semibold text-ivory text-sm uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-teaGreen transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="/#about" className="hover:text-teaGreen transition-colors">
                  About the Challenge
                </a>
              </li>
              <li>
                <a href="/#rules" className="hover:text-teaGreen transition-colors">
                  Event Rules
                </a>
              </li>
              <li>
                <a href="/#rounds" className="hover:text-teaGreen transition-colors">
                  Active Rounds
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-teaGreen transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Platform Portal */}
          <div>
            <h4 className="font-comfortaa font-semibold text-ivory text-sm uppercase tracking-wider mb-4">
              Event Portal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/register" className="hover:text-teaGreen transition-colors font-medium">
                  Participant Registration →
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-teaGreen transition-colors flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-teaGreen" />
                  Admin Dashboard Demo
                </Link>
              </li>
              <li>
                <Link to="/admin/results" className="hover:text-teaGreen transition-colors">
                  Live Leaderboard
                </Link>
              </li>
              <li>
                <span className="text-ivory/50 text-xs">Platform Version: v2.4 (React 19)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/50">
          <p>© 2026 BLINDCODE • Quiz Event Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Academic Competition Edition</span>
            <span>•</span>
            <span>Frontend Preview</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
