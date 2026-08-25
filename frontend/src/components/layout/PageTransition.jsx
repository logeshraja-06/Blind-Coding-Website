import React from 'react';
import { motion } from 'framer-motion';

export const PageTransition = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`w-full min-h-screen flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
};
