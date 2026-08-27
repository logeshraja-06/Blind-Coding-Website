import React from 'react';

export const DataTable = ({ tableData, tableName }) => {
  if (!tableData || !tableData.headers || !tableData.rows) return null;

  return (
    <div className="my-5 rounded-lg overflow-hidden border border-[#D0DBD5] bg-white shadow-xs">
      {tableName && (
        <div className="bg-[#EEF2ED] px-4 py-2 border-b border-[#D0DBD5] flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#18231F] font-comfortaa">
            TABLE: <span className="text-[#39716B]">{tableName}</span>
          </span>
          <span className="text-[11px] font-medium text-[#52605A] font-poppins">
            {tableData.rows.length} {tableData.rows.length === 1 ? 'row' : 'rows'}
          </span>
        </div>
      )}

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse text-xs sm:text-sm font-poppins">
          <thead>
            <tr className="bg-[#FAFBF8] border-b border-[#D0DBD5]">
              {tableData.headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-4 py-2.5 font-bold uppercase tracking-wider text-[#18231F] border-r last:border-r-0 border-[#E2EA85]/40 text-xs font-comfortaa"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EBF0EC]">
            {tableData.rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="hover:bg-[#F8FAF7] transition-colors duration-150"
              >
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className={`px-4 py-2.5 text-[#18231F] border-r last:border-r-0 border-[#EBF0EC] ${
                      cell === null || cell === 'NULL'
                        ? 'italic text-[#52605A]/70 font-mono text-xs'
                        : typeof cell === 'number'
                        ? 'font-mono'
                        : ''
                    }`}
                  >
                    {cell === null ? 'NULL' : String(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
