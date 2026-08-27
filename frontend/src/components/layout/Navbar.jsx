import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ShieldCheck, Terminal } from 'lucide-react';
import { Button } from '../ui/Button';
import { TechForceLogo } from '../../assets/logo/TechForceLogo';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rules', path: '/#rules' },
    { name: 'Event Details', path: '/#details' },
  ];

  const handleNavClick = (path) => {
    if (path.startsWith('/#')) {
      const sectionId = path.replace('/#', '');
      if (location.pathname === '/') {
        const elem = document.getElementById(sectionId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(`/${path}`);
      }
    } else {
      navigate(path);
    }
  };

  const isDarkHero = location.pathname === '/' && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'py-2.5 bg-[#FBFCEE]/95 backdrop-blur-md border-b border-[#C8D6CD] shadow-sm'
          : 'py-3.5 bg-[#FBFCEE]/90 backdrop-blur-md border-b border-[#C8D6CD]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand: TECH FORCE Logo + BLIND CODING */}
        <Link to="/" className="flex items-center gap-3 group focus-ring rounded-lg px-1 py-0.5">
          <TechForceLogo className="w-9 h-9 group-hover:scale-105 transition-transform" />
          <div className="border-l border-[#343B1B]/20 pl-3">
            <span className="font-comfortaa font-bold text-base sm:text-lg tracking-tight block leading-none text-[#343B1B]">
              BLIND <span className="text-[#3971B8]">CODING</span>
            </span>
            <span className="text-[10px] font-semibold tracking-wider uppercase block mt-0.5 text-[#52605A]">
              CSE Dept • AY 2025–2026
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 px-3 py-1 rounded-lg border border-[#C8D6CD] bg-white shadow-xs">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.path)}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer text-[#343B1B] hover:text-[#3971B8] hover:bg-[#EEF2ED]"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/admin"
            className="text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 text-[#52605A] hover:text-[#3971B8] hover:bg-[#3971B8]/5"
          >
            <ShieldCheck className="w-4 h-4 text-[#3971B8]" />
            <span>Admin</span>
          </Link>
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate('/register')}
            className="font-bold shadow-xs px-4"
            icon={ArrowRight}
            iconPosition="right"
          >
            START QUIZ
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#18231F] hover:bg-[#EEF2ED] transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-[#D0DBD5] shadow-lg overflow-hidden px-4 py-4 bg-[#FAFBF8] text-[#18231F]"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    handleNavClick(link.path);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors text-[#18231F] hover:bg-[#EEF2ED] hover:text-[#39716B]"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-3 border-t border-[#D0DBD5] flex flex-col gap-2">
                <Button
                  variant="primary"
                  className="w-full justify-center font-bold"
                  onClick={() => {
                    navigate('/register');
                    setMobileMenuOpen(false);
                  }}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  START QUIZ
                </Button>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-xs font-semibold text-[#3971B8] hover:underline flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Panel</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
