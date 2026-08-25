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
      whileHover={{ scale: 1.01, x: 2 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.15 }}
      onClick={() => onSelect(letter)}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-start gap-4 cursor-pointer focus-ring select-none relative ${
        isSelected
          ? 'bg-celticBlue-50/80 border-celticBlue shadow-md shadow-celticBlue/10'
          : 'bg-white border-teaGreen-300/70 hover:border-celticBlue-300 hover:bg-ivory/50 shadow-sm'
      }`}
    >
      {/* Option Identifier Badge (A, B, C, D) */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center font-comfortaa font-bold text-sm flex-shrink-0 transition-colors ${
          isSelected
            ? 'bg-celticBlue text-white shadow-sm'
            : 'bg-ivory border border-teaGreen-300 text-drabDark/80'
        }`}
      >
        {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : letter}
      </div>

      {/* Option Text */}
      <div className="flex-1 pt-1.5">
        <p
          className={`text-sm sm:text-base leading-relaxed font-poppins font-normal ${
            isSelected ? 'text-celticBlue-900 font-medium' : 'text-drabDark'
          }`}
        >
          {option.text}
        </p>
      </div>

      {/* Subtle selection ring indicator */}
      <div
        className={`w-5 h-5 rounded-full border-2 mt-2 flex items-center justify-center transition-colors flex-shrink-0 ${
          isSelected
            ? 'border-celticBlue bg-celticBlue text-white'
            : 'border-teaGreen-400 bg-transparent'
        }`}
      >
        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
    </motion.button>
  );
};
