import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Menu, X, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Rules', path: '/#rules' },
    { name: 'Rounds', path: '/#rounds' },
    { name: 'FAQ', path: '/#faq' },
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
          ? 'py-3 bg-ivory/90 backdrop-blur-md border-b border-teaGreen-300/60 shadow-subtle'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus-ring rounded-lg px-1 py-0.5"
        >
          <div className="w-10 h-10 rounded-xl bg-celticBlue text-ivory flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-comfortaa font-bold text-xl tracking-tight text-drabDark group-hover:text-celticBlue transition-colors">
              BLIND<span className="text-celticBlue">CODE</span>
            </span>
            <span className="hidden sm:block text-[10px] tracking-widest text-drabDark/60 uppercase font-semibold">
              Tech Event 2026
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-teaGreen-300/60 shadow-sm">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.path)}
              className="px-3.5 py-1.5 text-xs font-semibold text-drabDark/80 hover:text-celticBlue rounded-full hover:bg-teaGreen-100/50 transition-all duration-150"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right CTA Area */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/admin"
            className="text-xs font-semibold text-drabDark/70 hover:text-celticBlue px-3 py-2 rounded-lg hover:bg-teaGreen-100/40 transition-colors flex items-center gap-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-celticBlue" />
            <span>Admin Demo</span>
          </Link>
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate('/register')}
            className="font-semibold shadow-sm"
            icon={ArrowRight}
            iconPosition="right"
          >
            START QUIZ
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate('/register')}
            className="text-xs px-3 py-1.5"
          >
            START
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-drabDark hover:bg-teaGreen-200/50 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
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
                  className="text-left px-4 py-2.5 rounded-xl font-medium text-drabDark hover:bg-teaGreen-100 hover:text-celticBlue transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-3 border-t border-teaGreen-200 flex flex-col gap-2">
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => {
                    navigate('/register');
                    setMobileMenuOpen(false);
                  }}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  START QUIZ →
                </Button>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-xs font-semibold text-celticBlue hover:underline flex items-center justify-center gap-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Admin Dashboard Demo</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
