import React, { useState } from 'react';
import {
  Download,
  FileText,
  FileSpreadsheet,
  FileCode2,
  CheckCircle2,
  Sparkles,
  Info,
  Calendar,
  Layers
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useToast } from '../../context/ToastContext';

export const AdminExports = () => {
  const { addToast } = useToast();
  const [downloading, setDownloading] = useState(null);

  const handleExport = (type) => {
    setDownloading(type);
    setTimeout(() => {
      setDownloading(null);
      if (type === 'pdf') {
        addToast('PDF Report generated: BLINDCODE_2026_Results.pdf', 'success', 4000);
      } else if (type === 'xlsx') {
        addToast('Excel Sheet generated: BLINDCODE_Participant_Data.xlsx', 'success', 4000);
      } else if (type === 'csv') {
        addToast('CSV Data exported: BLINDCODE_Raw_Submissions.csv', 'success', 4000);
      }
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Intro info box */}
      <div className="p-4 rounded-2xl bg-celticBlue-50 border border-celticBlue-200 flex items-start gap-3 text-xs text-drabDark/80">
        <Info className="w-4 h-4 text-celticBlue flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-celticBlue">Event Reporting Engine: </strong>
          Generate consolidated participant reports, merit lists, and department breakdowns. The exported sheets include official timestamps, raw scores, and candidate verification details.
        </div>
      </div>

      {/* 2 Primary Export Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PDF Card */}
        <Card
          variant="default"
          hoverEffect
          className="p-8 border-2 border-teaGreen-300 bg-white flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center shadow-sm">
                <FileText className="w-6 h-6" />
              </div>
              <Badge variant="dark" size="sm">
                Official PDF
              </Badge>
            </div>

            <h3 className="font-comfortaa font-bold text-2xl text-drabDark mb-2">
              PDF REPORT
            </h3>
            <p className="text-sm text-drabDark/70 leading-relaxed mb-6">
              Export participant results as formatted PDF. Includes college branding, candidate ranks, score summaries, and signature placeholders.
            </p>

            <ul className="space-y-2 text-xs text-drabDark/70 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teaGreen-600" />
                <span>Executive Summary & Top Rankers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teaGreen-600" />
                <span>Department-wise Merit Classification</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teaGreen-600" />
                <span>Certificate Distribution Ready</span>
              </li>
            </ul>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => handleExport('pdf')}
            isLoading={downloading === 'pdf'}
            icon={Download}
            iconPosition="right"
            className="w-full font-bold"
          >
            DOWNLOAD PDF
          </Button>
        </Card>

        {/* Excel Card */}
        <Card
          variant="default"
          hoverEffect
          className="p-8 border-2 border-teaGreen-300 bg-white flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-teaGreen-200 text-drabDark flex items-center justify-center shadow-sm">
                <FileSpreadsheet className="w-6 h-6 text-drabDark" />
              </div>
              <Badge variant="success" size="sm">
                Spreadsheet XLSX
              </Badge>
            </div>

            <h3 className="font-comfortaa font-bold text-2xl text-drabDark mb-2">
              EXCEL REPORT
            </h3>
            <p className="text-sm text-drabDark/70 leading-relaxed mb-6">
              Export complete participant data. Contains all candidate records, register numbers, timing logs, and raw per-question responses for data auditing.
            </p>

            <ul className="space-y-2 text-xs text-drabDark/70 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teaGreen-600" />
                <span>Full candidate roster (156 participants)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teaGreen-600" />
                <span>Timing breakdown & question answers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teaGreen-600" />
                <span>Formatted for Excel & Google Sheets</span>
              </li>
            </ul>
          </div>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => handleExport('xlsx')}
            isLoading={downloading === 'xlsx'}
            icon={Download}
            iconPosition="right"
            className="w-full font-bold bg-teaGreen text-drabDark hover:bg-teaGreen-400"
          >
            DOWNLOAD XLSX
          </Button>
        </Card>
      </div>

      {/* CSV Export Bar */}
      <Card variant="ivory" className="p-6 border border-teaGreen-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-drabDark text-ivory flex items-center justify-center">
            <FileCode2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-comfortaa font-bold text-sm text-drabDark">
              Raw Submissions CSV
            </h4>
            <p className="text-xs text-drabDark/60">
              Machine-readable plain text comma-separated values for custom analytics
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="md"
          onClick={() => handleExport('csv')}
          isLoading={downloading === 'csv'}
          icon={Download}
          className="text-xs w-full sm:w-auto"
        >
          Export Raw CSV
        </Button>
      </Card>
    </div>
  );
};
