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
  const text = option.text || '';
  const isMultilineOrCode = text.includes('\n') || text.startsWith('SELECT') || text.startsWith('int') || text.includes('*');

  return (
    <motion.button
      type="button"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.15 }}
      onClick={() => onSelect(letter)}
      className={`w-full text-left min-h-[48px] p-3.5 sm:p-4 rounded-lg border transition-colors duration-150 flex items-start gap-3.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#39716B] focus:ring-offset-2 select-none relative ${
        isSelected
          ? 'bg-[#39716B]/10 border-[#39716B] text-[#18231F] shadow-xs font-semibold'
          : 'bg-white border-[#D0DBD5] hover:border-[#39716B]/50 hover:bg-[#F8FAF7] text-[#18231F] shadow-xs font-normal'
      }`}
    >
      {/* Option Letter Badge (A, B, C, D) Top-Aligned */}
      <div
        className={`w-8 h-8 rounded-md flex items-center justify-center font-comfortaa font-bold text-xs sm:text-sm flex-shrink-0 transition-colors mt-0.5 ${
          isSelected
            ? 'bg-[#39716B] text-white shadow-xs'
            : 'bg-[#EEF2ED] border border-[#C8D6CD] text-[#18231F]'
        }`}
      >
        {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : letter}
      </div>

      {/* Option Content Area with Pre-Wrap Support */}
      <div className="flex-1 py-0.5 overflow-x-auto">
        {isMultilineOrCode ? (
          <pre className="text-xs sm:text-sm leading-relaxed font-mono whitespace-pre-wrap font-medium">
            <code>{text}</code>
          </pre>
        ) : (
          <p className="text-sm sm:text-base leading-snug font-poppins">
            {text}
          </p>
        )}
      </div>

      {/* Selection Check Circle */}
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 mt-1 ${
          isSelected
            ? 'border-[#39716B] bg-[#39716B] text-white'
            : 'border-[#D0DBD5] bg-transparent'
        }`}
      >
        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
    </motion.button>
  );
};
