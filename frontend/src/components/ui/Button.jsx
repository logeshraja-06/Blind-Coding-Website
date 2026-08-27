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
    sm: 'px-3.5 py-1.5 text-xs rounded-lg gap-1.5 tracking-wide font-medium',
    md: 'px-5 py-2.5 text-sm rounded-lg gap-2 tracking-wide font-semibold',
    lg: 'px-6 py-3 text-sm sm:text-base rounded-lg gap-2.5 tracking-wide font-bold',
    xl: 'px-8 py-3.5 text-base sm:text-lg rounded-lg gap-3 tracking-wide font-bold',
  };

  const variantStyles = {
    primary:
      'bg-[#39716B] text-white hover:bg-[#2d5b56] border border-[#39716B]/20 shadow-sm hover:shadow-md transition-all',
    secondary:
      'bg-[#EEF2ED] text-[#18231F] border border-[#C8D6CD] hover:bg-[#E2EADF] shadow-sm font-semibold',
    outline:
      'bg-white text-[#18231F] border border-[#C8D6CD] hover:border-[#39716B] hover:text-[#39716B] hover:bg-[#F3F6F1] shadow-sm',
    outlineBlue:
      'bg-white text-[#3971B8] border border-[#3971B8]/40 hover:border-[#3971B8] hover:bg-[#3971B8]/5 shadow-sm',
    accent:
      'bg-[#3971B8] text-white hover:bg-[#2d5d99] border border-[#3971B8]/20 shadow-sm hover:shadow-md font-bold',
    danger:
      'bg-red-50 text-red-700 border border-red-200 hover:bg-red-600 hover:text-white shadow-sm transition-colors',
    warning:
      'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 shadow-sm',
    ghost:
      'bg-transparent text-[#18231F]/80 hover:text-[#39716B] hover:bg-[#18231F]/5',
    dark:
      'bg-[#18231F] text-white hover:bg-[#24332e] border border-[#18231F] shadow-sm',
  };

  return (
    <motion.button
      whileHover={disabled || isLoading ? {} : { scale: 1.01 }}
      whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center premium-btn transition-all duration-200 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-celticBlue focus:ring-offset-2 focus:ring-offset-ivory disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.primary} ${className}`}
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
