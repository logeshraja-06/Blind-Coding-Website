import React from 'react';
import { motion } from 'framer-motion';

export const FloatingCodeBg = ({ opacity = 0.55 }) => {
  const codeFragments = [
    { text: 'O(log N)', top: '10%', left: '6%', size: 'text-xs font-mono font-bold text-celticBlue/70', delay: 0, duration: 18 },
    { text: '(x & (x - 1)) == 0', top: '18%', left: '84%', size: 'text-xs font-mono font-semibold text-teaGreen-600/80', delay: 2, duration: 22 },
    { text: '*ptr + 2', top: '74%', left: '5%', size: 'text-xs font-mono font-bold text-drabDark/60', delay: 4, duration: 16 },
    { text: 'std::vector<int>', top: '62%', left: '90%', size: 'text-[11px] font-mono text-celticBlue/60', delay: 1, duration: 20 },
    { text: 'struct Node { int val; }', top: '38%', left: '3%', size: 'text-[11px] font-mono text-drabDark/50', delay: 3, duration: 24 },
    { text: 'DFS_Traversal()', top: '82%', left: '80%', size: 'text-xs font-mono font-bold text-teaGreen-600/75', delay: 5, duration: 25 },
    { text: '0x7FFFFFFF', top: '48%', left: '92%', size: 'text-[11px] font-mono tracking-widest text-celticBlue/50', delay: 2.5, duration: 19 },
    { text: 'λ => logic.evaluate()', top: '8%', left: '72%', size: 'text-xs font-mono font-semibold text-celticBlue/70', delay: 1.5, duration: 21 },
    { text: 'fib(n - 1) + fib(n - 2)', top: '56%', left: '8%', size: 'text-[11px] font-mono text-vanilla-600', delay: 3.5, duration: 23 },
    { text: 'COUNT(*) vs COUNT(col)', top: '88%', left: '30%', size: 'text-xs font-mono text-drabDark/55', delay: 2, duration: 20 },
    { text: '{ [ 25 MCQs ] }', top: '28%', left: '15%', size: 'text-xs font-mono font-bold text-celticBlue/55', delay: 4, duration: 26 },
  ];

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Precision Logic Coordinate Grid */}
      <div
        className="absolute inset-0 bg-grid-pattern opacity-70"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)',
        }}
      />

      {/* Atmospheric Ambient Lighting Spheres */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[45rem] h-[30rem] bg-celticBlue-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-28 w-96 h-96 bg-teaGreen-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-28 w-[32rem] h-[32rem] bg-vanilla-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-teaGreen-300/25 rounded-full blur-3xl pointer-events-none" />

      {/* Precision Coordinate Crosshairs */}
      <div className="absolute top-24 left-16 text-celticBlue/25 font-mono text-xs select-none">
        + [00, 25]
      </div>
      <div className="absolute top-24 right-16 text-celticBlue/25 font-mono text-xs select-none">
        + [60m, 00s]
      </div>
      <div className="absolute bottom-20 left-16 text-teaGreen-600/30 font-mono text-xs select-none">
        + [CSE_2026]
      </div>
      <div className="absolute bottom-20 right-16 text-teaGreen-600/30 font-mono text-xs select-none">
        + [TECH_FORCE]
      </div>

      {/* Floating Competitive Programming Code Fragments */}
      {codeFragments.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.size} select-none hidden sm:block`}
          style={{ top: item.top, left: item.left }}
          animate={{
            y: [0, -12, 0, 10, 0],
            x: [0, 6, 0, -6, 0],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay,
          }}
        >
          <span className="px-2 py-0.5 rounded bg-white/40 backdrop-blur-[1px] border border-teaGreen-300/30 shadow-sm">
            {item.text}
          </span>
        </motion.div>
      ))}

      {/* Subtle Binary Grid Matrix Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#C8D69612_1px,transparent_1px),linear-gradient(to_bottom,#C8D69612_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
    </div>
  );
};
