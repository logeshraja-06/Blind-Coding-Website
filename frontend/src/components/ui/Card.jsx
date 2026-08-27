import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  variant = 'default', // 'default' | 'ivory' | 'dark' | 'glass' | 'highlight'
  onClick,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white border border-[#D0DBD5] text-[#18231F] shadow-sm',
    ivory: 'bg-[#F8FAF7] border border-[#D0DBD5] text-[#18231F] shadow-sm',
    dark: 'bg-[#18231F] text-white border border-[#2D3F38] shadow-md',
    glass: 'bg-white/90 border border-[#D0DBD5] text-[#18231F] shadow-sm',
    highlight: 'bg-[#F3F6F1] border border-[#39716B]/30 text-[#18231F] shadow-sm',
    blue: 'bg-[#3971B8]/5 border border-[#3971B8]/30 text-[#18231F] shadow-sm',
  };

  const Component = hoverEffect ? motion.div : 'div';
  const hoverProps = hoverEffect
    ? {
        whileHover: { y: -2, transition: { duration: 0.2, ease: 'easeOut' } },
        className: `rounded-xl premium-card ${variantStyles[variant]} ${className}`,
      }
    : {
        className: `rounded-xl premium-card ${variantStyles[variant]} ${className}`,
      };

  return (
    <Component onClick={onClick} {...hoverProps} {...props}>
      {children}
    </Component>
  );
};
