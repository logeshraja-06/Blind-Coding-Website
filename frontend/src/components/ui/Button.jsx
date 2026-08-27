import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'warning' | 'accent' | 'dark'
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  className = '',
  disabled = false,
  isLoading = false,
  onClick,
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs rounded-xl gap-1.5 tracking-wide',
    md: 'px-5 py-2.5 text-sm rounded-xl gap-2 tracking-wide font-semibold',
    lg: 'px-7 py-3.5 text-base rounded-2xl gap-2.5 tracking-wide font-bold',
    xl: 'px-9 py-4 text-lg rounded-2xl gap-3 tracking-wide font-bold',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-b from-celticBlue-500 to-celticBlue-600 text-white border border-celticBlue-400/40 shadow-[0_4px_14px_0_rgba(57,113,184,0.35)] hover:shadow-[0_8px_25px_rgba(57,113,184,0.5)] hover:from-celticBlue-400 hover:to-celticBlue-600 active:shadow-inner',
    secondary:
      'bg-teaGreen-100 text-drabDark border border-teaGreen-400 hover:bg-teaGreen-200 shadow-sm hover:shadow-md hover:border-teaGreen-500',
    outline:
      'bg-transparent text-drabDark border-2 border-drabDark/25 hover:border-celticBlue hover:text-celticBlue hover:bg-celticBlue-50/60 shadow-sm',
    outlineBlue:
      'bg-white/80 backdrop-blur-sm text-celticBlue border-2 border-celticBlue/30 hover:border-celticBlue hover:bg-celticBlue-50 shadow-sm hover:shadow-subtle',
    accent:
      'bg-gradient-to-b from-vanilla to-vanilla-300 text-drabDark border border-vanilla-400 shadow-[0_4px_14px_0_rgba(246,230,165,0.4)] hover:shadow-[0_6px_20px_rgba(238,213,117,0.55)] hover:from-vanilla-100 hover:to-vanilla-300 font-bold',
    danger:
      'bg-red-50 text-red-700 border border-red-300 hover:bg-red-600 hover:text-white hover:border-red-600 shadow-sm hover:shadow-md transition-colors',
    warning:
      'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 shadow-sm',
    ghost:
      'bg-transparent text-drabDark/80 hover:text-celticBlue hover:bg-drabDark/5',
    dark:
      'bg-drabDark text-ivory hover:bg-drabDark-700 border border-drabDark-800 shadow-md hover:shadow-lg',
  };

  return (
    <motion.button
      whileHover={disabled || isLoading ? {} : { y: -2 }}
      whileTap={disabled || isLoading ? {} : { y: 0, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center transition-all duration-200 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-celticBlue focus:ring-offset-2 focus:ring-offset-ivory disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
          )}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && (
            <Icon className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
          )}
        </>
      )}
    </motion.button>
  );
};
