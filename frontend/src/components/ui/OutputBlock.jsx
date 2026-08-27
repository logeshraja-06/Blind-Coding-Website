import React from 'react';
import { Monitor } from 'lucide-react';

export const OutputBlock = ({ output, label = 'EXPECTED OUTPUT' }) => {
  if (!output) return null;

  return (
    <div className="my-5 rounded-lg overflow-hidden border border-[#D0DBD5] bg-[#FAFBF8] shadow-xs">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#EEF2ED] border-b border-[#D0DBD5]">
        <div className="flex items-center gap-2">
          <Monitor className="w-3.5 h-3.5 text-[#39716B]" />
          <span className="text-xs font-mono font-bold tracking-wider text-[#18231F]">
            {label}
          </span>
        </div>
      </div>

      {/* Output Content Area */}
      <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-[#18231F] overflow-x-auto leading-relaxed whitespace-pre font-bold">
        <code>{output}</code>
      </pre>
    </div>
  );
};
