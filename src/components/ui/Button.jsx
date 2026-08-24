import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent'
  size = 'md', // 'sm' | 'md' | 'lg'
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
    sm: 'px-3.5 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
    lg: 'px-7 py-3.5 text-base rounded-xl font-semibold gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-celticBlue text-white hover:bg-celticBlue-600 shadow-md hover:shadow-premium shadow-celticBlue/20 border border-celticBlue-600',
    secondary:
      'bg-teaGreen-300 text-drabDark hover:bg-teaGreen-400 border border-teaGreen-400/60 shadow-sm',
    accent:
      'bg-vanilla text-drabDark hover:bg-vanilla-300 border border-vanilla-400 shadow-sm',
    outline:
      'bg-transparent text-drabDark border-2 border-drabDark/20 hover:border-celticBlue hover:text-celticBlue hover:bg-celticBlue-50/50',
    outlineBlue:
      'bg-transparent text-celticBlue border-2 border-celticBlue/40 hover:border-celticBlue hover:bg-celticBlue-50',
    ghost:
      'bg-transparent text-drabDark hover:bg-drabDark/5 hover:text-celticBlue',
    danger:
      'bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-600/20 border border-red-700',
    dark:
      'bg-drabDark text-ivory hover:bg-drabDark-700 border border-drabDark-800 shadow-md',
  };

  return (
    <motion.button
      whileHover={disabled || isLoading ? {} : { scale: 1.02 }}
      whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`inline-flex items-center justify-center font-medium transition-colors duration-200 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.primary} ${className}`}
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
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 flex-shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 flex-shrink-0" />}
        </>
      )}
    </motion.button>
  );
};
