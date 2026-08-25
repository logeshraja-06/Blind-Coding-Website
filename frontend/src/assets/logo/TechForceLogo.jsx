import React from 'react';

export const TechForceLogo = ({ className = 'w-12 h-12', showText = true, textClass = '', isDark = false }) => {
  const isDarkTheme = isDark || textClass.includes('text-ivory') || textClass.includes('text-white');

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Official Association Logo Image */}
      <div className={`relative flex-shrink-0 aspect-square rounded-xl overflow-hidden shadow-sm border border-drabDark/30 bg-black flex items-center justify-center ${className}`}>
        <img
          src="/techforce-logo.jpg"
          alt="TECH FORCE — CSE Student Association"
          className="w-full h-full object-contain"
          loading="eager"
        />
      </div>

      {/* Association Typography Branding */}
      {showText && (
        <div className={`flex flex-col ${textClass}`}>
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-comfortaa font-extrabold text-base tracking-wider ${isDarkTheme ? 'text-ivory' : 'text-drabDark'}`}>
              TECH <span className="text-celticBlue-300">FORCE</span>
            </span>
          </div>
          <span className={`text-[9px] font-bold tracking-widest uppercase font-poppins mt-0.5 ${isDarkTheme ? 'text-teaGreen-300' : 'text-drabDark/70'}`}>
            CSE Student Association
          </span>
        </div>
      )}
    </div>
  );
};
