import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ShieldCheck, Terminal, Sparkles } from 'lucide-react';
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
    window.addEventListener('scroll', handleScroll);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-ivory/95 backdrop-blur-md border-b border-teaGreen-300 shadow-subtle'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand: TECH FORCE Logo + BLIND CODING */}
        <Link to="/" className="flex items-center gap-3 group focus-ring rounded-lg px-1 py-0.5">
          <TechForceLogo className="w-10 h-10 group-hover:scale-105 transition-transform" />
          <div className="hidden sm:block border-l-2 border-drabDark/20 pl-3">
            <span className="font-comfortaa font-bold text-lg tracking-tight text-drabDark block leading-none">
              BLIND <span className="text-celticBlue">CODING</span>
            </span>
            <span className="text-[10px] font-semibold text-drabDark/60 tracking-wider uppercase block mt-0.5">
              CSE Dept • 2025–2026
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-teaGreen-300 shadow-sm">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.path)}
              className="px-3.5 py-1.5 text-xs font-semibold text-drabDark/80 hover:text-celticBlue rounded-full hover:bg-teaGreen-100/60 transition-colors cursor-pointer font-poppins"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/admin"
            className="text-xs font-semibold text-drabDark/70 hover:text-celticBlue px-3 py-2 rounded-xl hover:bg-teaGreen-100/50 transition-colors flex items-center gap-1.5 font-poppins"
          >
            <ShieldCheck className="w-4 h-4 text-celticBlue" />
            <span>Admin</span>
          </Link>
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate('/register')}
            className="font-bold shadow-sm px-5 font-poppins"
            icon={ArrowRight}
            iconPosition="right"
          >
            REGISTER NOW
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate('/register')}
            className="text-xs px-3 py-1.5 font-poppins"
          >
            REGISTER
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-drabDark hover:bg-teaGreen-200/50 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-ivory border-b border-teaGreen-300 shadow-xl overflow-hidden px-4 py-5"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    handleNavClick(link.path);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-4 py-2.5 rounded-xl font-medium text-drabDark hover:bg-teaGreen-100 hover:text-celticBlue transition-colors font-poppins"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-3 border-t border-teaGreen-200 flex flex-col gap-2">
                <Button
                  variant="primary"
                  className="w-full justify-center font-bold font-poppins"
                  onClick={() => {
                    navigate('/register');
                    setMobileMenuOpen(false);
                  }}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  REGISTER NOW →
                </Button>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-xs font-semibold text-celticBlue hover:underline flex items-center justify-center gap-1.5 font-poppins"
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
