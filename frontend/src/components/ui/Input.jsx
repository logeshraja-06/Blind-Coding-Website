import React, { forwardRef } from 'react';

export const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      icon: Icon,
      required = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#18231F] mb-1.5"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#52605A]">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full bg-white text-[#18231F] placeholder:text-[#52605A]/50 border rounded-lg px-3.5 py-2.5 text-base sm:text-sm transition-colors duration-200 outline-none ${
              Icon ? 'pl-10' : ''
            } ${
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-200'
                : 'border-[#D0DBD5] focus:border-[#39716B] focus:ring-1 focus:ring-[#39716B]/20 hover:border-[#39716B]/50'
            } ${className}`}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-xs text-red-600 font-medium">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-xs text-[#52605A]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const Select = forwardRef(
  (
    {
      label,
      error,
      helperText,
      options = [],
      required = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#18231F] mb-1.5"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={`w-full bg-white text-[#18231F] border rounded-lg px-3.5 py-2.5 text-base sm:text-sm transition-colors duration-200 outline-none appearance-none cursor-pointer ${
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-200'
                : 'border-[#D0DBD5] focus:border-[#39716B] focus:ring-1 focus:ring-[#39716B]/20 hover:border-[#39716B]/50'
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-drabDark/50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && <p className="mt-1.5 text-xs text-red-600 font-medium">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-xs text-drabDark/60">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
