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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isDarkHero
          ? 'py-4 bg-[#141F1D]/80 backdrop-blur-md border-b border-white/10 shadow-sm'
          : isScrolled
          ? 'py-3 bg-ivory/95 backdrop-blur-md border-b border-teaGreen-300 shadow-subtle'
          : 'py-4 bg-ivory/90 backdrop-blur-md border-b border-teaGreen-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand: TECH FORCE Logo + BLIND CODING */}
        <Link to="/" className="flex items-center gap-3 group focus-ring rounded-lg px-1 py-0.5">
          <TechForceLogo className="w-10 h-10 group-hover:scale-105 transition-transform" />
          <div className={`hidden sm:block border-l-2 pl-3 ${isDarkHero ? 'border-white/20' : 'border-drabDark/20'}`}>
            <span className={`font-comfortaa font-bold text-lg tracking-tight block leading-none ${isDarkHero ? 'text-white' : 'text-drabDark'}`}>
              BLIND <span className={isDarkHero ? 'text-[#39D98A]' : 'text-celticBlue'}>CODING</span>
            </span>
            <span className={`text-[10px] font-semibold tracking-wider uppercase block mt-0.5 ${isDarkHero ? 'text-teaGreen-200/80' : 'text-drabDark/60'}`}>
              CSE Dept • AY 2025–2026
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          className={`hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full border shadow-sm backdrop-blur-md transition-colors ${
            isDarkHero
              ? 'bg-white/10 border-white/15 text-white'
              : 'bg-white/80 border-teaGreen-300 text-drabDark'
          }`}
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.path)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer font-poppins ${
                isDarkHero
                  ? 'text-white/90 hover:text-[#39D98A] hover:bg-white/10'
                  : 'text-drabDark/80 hover:text-celticBlue hover:bg-teaGreen-100/60'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/admin"
            className={`text-xs font-semibold px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 font-poppins ${
              isDarkHero
                ? 'text-white/80 hover:text-[#39D98A] hover:bg-white/10'
                : 'text-drabDark/70 hover:text-celticBlue hover:bg-teaGreen-100/50'
            }`}
          >
            <ShieldCheck className={`w-4 h-4 ${isDarkHero ? 'text-[#39D98A]' : 'text-celticBlue'}`} />
            <span>Admin</span>
          </Link>
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate('/register')}
            className={`font-bold shadow-sm px-5 font-poppins ${
              isDarkHero
                ? 'bg-[#39D98A] hover:bg-[#2ecc71] text-[#064E3B] border-none'
                : 'bg-celticBlue hover:bg-celticBlue-600 text-white'
            }`}
            icon={ArrowRight}
            iconPosition="right"
          >
            START QUIZ
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-xl transition-colors ${
            isDarkHero ? 'text-white hover:bg-white/10' : 'text-drabDark hover:bg-teaGreen-100'
          }`}
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
            className={`md:hidden border-b shadow-xl overflow-hidden px-4 py-5 ${
              isDarkHero
                ? 'bg-[#141F1D] border-white/10 text-white'
                : 'bg-ivory border-teaGreen-300 text-drabDark'
            }`}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    handleNavClick(link.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2.5 rounded-xl font-medium transition-colors font-poppins ${
                    isDarkHero
                      ? 'text-white/90 hover:bg-white/10 hover:text-[#39D98A]'
                      : 'text-drabDark hover:bg-teaGreen-100 hover:text-celticBlue'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-3 border-t border-teaGreen-200/40 flex flex-col gap-2">
                <Button
                  variant="primary"
                  className="w-full justify-center font-bold font-poppins bg-[#39D98A] hover:bg-[#2ecc71] text-[#064E3B] border-none"
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
                  className={`text-center py-2 text-xs font-semibold hover:underline flex items-center justify-center gap-1.5 font-poppins ${
                    isDarkHero ? 'text-teaGreen-200' : 'text-celticBlue'
                  }`}
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
