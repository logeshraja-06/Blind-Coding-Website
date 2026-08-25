import React from 'react';

export const Badge = ({
  children,
  variant = 'default', // 'default' | 'success' | 'warning' | 'info' | 'blue' | 'dark'
  size = 'md', // 'sm' | 'md'
  className = '',
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-3 py-1 text-xs font-semibold',
  };

  const variantStyles = {
    default: 'bg-ivory border border-drabDark/20 text-drabDark',
    success: 'bg-teaGreen-200 text-drabDark-700 border border-teaGreen-400',
    warning: 'bg-vanilla text-drabDark-800 border border-vanilla-400',
    info: 'bg-celticBlue-100 text-celticBlue-800 border border-celticBlue-300',
    blue: 'bg-celticBlue text-white shadow-sm',
    dark: 'bg-drabDark text-ivory border border-drabDark-700',
    active: 'bg-teaGreen text-drabDark border border-teaGreen-500 font-bold tracking-wider',
  };

  return (
    <span
      className={`inline-flex items-center justify-center gap-1 rounded-full uppercase tracking-wider ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.default} ${className}`}
    >
      {children}
    </span>
  );
};
