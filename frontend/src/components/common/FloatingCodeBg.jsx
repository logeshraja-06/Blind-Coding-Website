import React from 'react';
import { motion } from 'framer-motion';

export const FloatingCodeBg = ({ opacity = 0.45, density = 'normal' }) => {
  const codeSymbols = [
    { text: '{ }', top: '12%', left: '8%', size: 'text-2xl font-mono', delay: 0, duration: 18 },
    { text: '< />', top: '24%', left: '88%', size: 'text-3xl font-mono', delay: 2, duration: 22 },
    { text: '[ ]', top: '78%', left: '6%', size: 'text-xl font-mono', delay: 4, duration: 16 },
    { text: '01', top: '65%', left: '92%', size: 'text-sm font-mono tracking-widest', delay: 1, duration: 20 },
    { text: '101', top: '35%', left: '15%', size: 'text-xs font-mono tracking-widest', delay: 3, duration: 24 },
    { text: 'function()', top: '82%', left: '76%', size: 'text-sm font-mono', delay: 5, duration: 26 },
    { text: '=>', top: '48%', left: '82%', size: 'text-lg font-mono', delay: 2.5, duration: 19 },
    { text: 'const', top: '15%', left: '65%', size: 'text-xs font-mono font-semibold', delay: 1.5, duration: 21 },
    { text: 'return;', top: '55%', left: '5%', size: 'text-xs font-mono', delay: 3.5, duration: 23 },
    { text: '0x1F', top: '40%', left: '4%', size: 'text-xs font-mono opacity-40', delay: 4.5, duration: 25 },
    { text: 'let logic;', top: '88%', left: '28%', size: 'text-xs font-mono', delay: 2, duration: 20 },
  ];

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Subtle Dot Grid Layer */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* Elegant Radial Lighting Blurs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teaGreen-200/40 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] bg-vanilla-200/35 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-celticBlue-100/30 rounded-full blur-3xl" />

      {/* Floating Coding Symbols */}
      {codeSymbols.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute text-drabDark/30 ${item.size} select-none`}
          style={{ top: item.top, left: item.left }}
          animate={{
            y: [0, -18, 0, 14, 0],
            x: [0, 8, 0, -8, 0],
            rotate: [0, 4, -3, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay,
          }}
        >
          {item.text}
        </motion.div>
      ))}

      {/* Subtle Abstract Geometric Shapes */}
      <svg
        className="absolute top-20 right-1/4 w-32 h-32 text-celticBlue/10"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
        <rect x="30" y="30" width="40" height="40" strokeDasharray="6 3" />
      </svg>

      <svg
        className="absolute bottom-28 left-1/4 w-28 h-28 text-teaGreen-600/15"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <polygon points="50,15 90,85 10,85" strokeDasharray="3 3" />
      </svg>
    </div>
  );
};
