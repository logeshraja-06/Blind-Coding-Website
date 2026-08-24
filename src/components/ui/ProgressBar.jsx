import React from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = ({
  value = 0,
  max = 100,
  height = 'h-2.5',
  color = 'bg-celticBlue',
  backgroundColor = 'bg-teaGreen-200/50',
  showLabel = false,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-drabDark mb-1.5">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full ${height} ${backgroundColor} rounded-full overflow-hidden p-0.5 border border-teaGreen-300/40`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`h-full ${color} rounded-full shadow-sm`}
        />
      </div>
    </div>
  );
};
