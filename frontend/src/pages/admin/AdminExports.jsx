import React, { useState } from 'react';
import {
  Download,
  FileText,
  FileSpreadsheet,
  FileCode2,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useToast } from '../../context/ToastContext';
import { API_BASE_URL } from '../../services/api';

export const AdminExports = () => {
  const { addToast } = useToast();
  const [downloading, setDownloading] = useState(null);

  const handleExport = (type) => {
    const token = localStorage.getItem('blindcode_admin_token') || '';
    setDownloading(type);
    if (type === 'pdf') {
      window.open(`${API_BASE_URL}/export/pdf?token=${encodeURIComponent(token)}`, '_blank');
      addToast('Generating official PDF merit report...', 'success', 3500);
      setDownloading(null);
    } else if (type === 'xlsx' || type === 'csv') {
      window.location.href = `${API_BASE_URL}/export/${type}?token=${encodeURIComponent(token)}`;
      addToast('Downloading official participant spreadsheet...', 'success', 3500);
      setDownloading(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Intro info box */}
      <div className="p-4 rounded-2xl bg-celticBlue-50 border border-celticBlue-200 flex items-start gap-3 text-xs text-drabDark/80">
        <Info className="w-4 h-4 text-celticBlue flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-celticBlue">Event Reporting Engine: </strong>
          Generate and stream official merit documents for the <strong>Department of Computer Science and Engineering</strong>.
          Reports include candidate ranks, verified timestamps, and complete submission logs.
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
                Printable PDF
              </Badge>
            </div>

            <h3 className="font-comfortaa font-bold text-2xl text-drabDark mb-2">
              PDF REPORT
            </h3>
            <p className="text-sm text-drabDark/70 leading-relaxed mb-6">
              Export verified participant merit results as a printable PDF. Includes official college headers, CSE Association branding, coordinator names, and ranked scores.
            </p>

            <ul className="space-y-2 text-xs text-drabDark/70 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teaGreen-600" />
                <span>Executive Department Summary & Top Rankers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teaGreen-600" />
                <span>Student & Faculty Coordinator Signatures</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teaGreen-600" />
                <span>Print & Certificate Ready</span>
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
            DOWNLOAD PDF REPORT
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
              Export complete candidate data. Contains all participant records, register numbers, scores, accuracy percentage, and timing metrics.
            </p>

            <ul className="space-y-2 text-xs text-drabDark/70 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teaGreen-600" />
                <span>Full candidate roster with Register Numbers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teaGreen-600" />
                <span>Duration, score, and percentage columns</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teaGreen-600" />
                <span>Compatible with Microsoft Excel & Google Sheets</span>
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
              Raw Submissions CSV Data
            </h4>
            <p className="text-xs text-drabDark/60">
              Plain text comma-separated values for custom institutional analytics and departmental records
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
