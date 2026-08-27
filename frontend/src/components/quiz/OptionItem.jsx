import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const OptionItem = ({
  option,
  isSelected,
  onSelect,
  index,
}) => {
  const letters = ['A', 'B', 'C', 'D'];
  const letter = option.id || letters[index] || 'A';

  return (
    <motion.button
      type="button"
      whileHover={{ y: -1.5 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.15 }}
      onClick={() => onSelect(letter)}
      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex items-start gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-celticBlue focus:ring-offset-2 select-none relative ${
        isSelected
          ? 'bg-celticBlue-50/90 border-celticBlue shadow-md shadow-celticBlue/10 ring-1 ring-celticBlue/20'
          : 'bg-white border-teaGreen-300/80 hover:border-celticBlue-300 hover:bg-ivory/60 shadow-subtle'
      }`}
    >
      {/* Option Letter Badge (A, B, C, D) */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center font-comfortaa font-bold text-sm flex-shrink-0 transition-all ${
          isSelected
            ? 'bg-celticBlue text-white shadow-sm scale-105'
            : 'bg-ivory border border-teaGreen-300 text-drabDark/80'
        }`}
      >
        {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : letter}
      </div>

      {/* Option Text Content */}
      <div className="flex-1 pt-1">
        <p
          className={`text-sm sm:text-base leading-relaxed font-poppins ${
            isSelected ? 'text-drabDark font-semibold' : 'text-drabDark/85 font-normal'
          }`}
        >
          {option.text}
        </p>
      </div>

      {/* Selection Check Circle */}
      <div
        className={`w-5 h-5 rounded-full border-2 mt-1.5 flex items-center justify-center transition-all flex-shrink-0 ${
          isSelected
            ? 'border-celticBlue bg-celticBlue text-white scale-110'
            : 'border-teaGreen-400/80 bg-transparent'
        }`}
      >
        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
    </motion.button>
  );
};
