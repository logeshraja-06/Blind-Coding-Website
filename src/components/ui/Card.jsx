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
    default: 'bg-white border border-teaGreen-300/60 text-drabDark shadow-subtle',
    ivory: 'bg-ivory border border-teaGreen-300/80 text-drabDark shadow-subtle',
    dark: 'bg-drabDark text-ivory border border-drabDark-700 shadow-xl',
    glass: 'glass-panel text-drabDark shadow-premium',
    highlight: 'bg-gradient-to-br from-ivory to-vanilla-50 border-2 border-vanilla-300 text-drabDark shadow-subtle',
    blue: 'bg-celticBlue-50/70 border border-celticBlue-200 text-drabDark shadow-subtle',
  };

  const Component = hoverEffect ? motion.div : 'div';
  const hoverProps = hoverEffect
    ? {
        whileHover: { y: -4, transition: { duration: 0.2, ease: 'easeOut' } },
        className: `rounded-2xl transition-all duration-300 ${variantStyles[variant]} ${className}`,
      }
    : {
        className: `rounded-2xl ${variantStyles[variant]} ${className}`,
      };

  return (
    <Component onClick={onClick} {...hoverProps} {...props}>
      {children}
    </Component>
  );
};
