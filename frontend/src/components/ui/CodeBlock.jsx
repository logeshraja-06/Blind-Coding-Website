import React from 'react';
import { Terminal } from 'lucide-react';

export const CodeBlock = ({ code, language = 'code' }) => {
  if (!code) return null;

  const langUpper = (language || 'CODE').toUpperCase();

  return (
    <div className="my-5 rounded-lg overflow-hidden border border-[#18231F]/20 bg-[#18231F] text-white shadow-xs">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#22312B] border-b border-[#2D3E37]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          <span className="ml-2 text-xs font-mono font-bold tracking-wider text-[#39D98A]">
            {langUpper}
          </span>
        </div>
        <Terminal className="w-3.5 h-3.5 text-[#52605A]" />
      </div>

      {/* Code Content Area */}
      <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-[#EEF2ED] overflow-x-auto leading-relaxed whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
};
