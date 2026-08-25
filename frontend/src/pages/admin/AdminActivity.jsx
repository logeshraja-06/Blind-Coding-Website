import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  Eye,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Maximize2,
  Layers,
  Info,
  RefreshCw,
  AlertOctagon
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Input, Select } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const AdminActivity = () => {
  const { adminToken } = useAuth();
  const { addToast } = useToast();

  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  const [maxWarnings, setMaxWarnings] = useState(2);

  const fetchActivityData = async () => {
    setLoading(true);
    try {
      const res = await api.getAdminActivity(adminToken);
      if (res && res.success) {
        setAttempts(res.attempts || []);
        setMaxWarnings(res.maxWarnings || 2);
      }
    } catch (err) {
      addToast('Failed to load activity logs.', 'error', 3500);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivityData();
  }, [adminToken]);

  // Filtering
  const filteredAttempts = attempts.filter((att) => {
    const matchesSearch =
      att.name.toLowerCase().includes(search.toLowerCase()) ||
      att.registerNumber.toLowerCase().includes(search.toLowerCase()) ||
      att.class.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'NO_WARNINGS') return att.totalWarnings === 0;
    if (filterType === 'TAB_SWITCH') return att.tabSwitchCount > 0;
    if (filterType === 'FULLSCREEN_EXIT') return att.fullscreenExitCount > 0;
    if (filterType === 'LIMIT_REACHED') return att.warningLimitReached || att.totalWarnings >= maxWarnings;

    return true;
  });

  const filterOptions = [
    { value: 'ALL', label: 'All Candidates' },
    { value: 'NO_WARNINGS', label: 'No Warnings (0)' },
    { value: 'TAB_SWITCH', label: 'Tab Switch Detected' },
    { value: 'FULLSCREEN_EXIT', label: 'Fullscreen Exit Detected' },
    { value: 'LIMIT_REACHED', label: 'Warning Limit Reached (3+)' },
  ];

  const formatTime = (isoString) => {
    if (!isoString) return '--:--';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="space-y-6 font-poppins">
      {/* Information Header & Security Disclaimer */}
      <div className="p-4 sm:p-5 rounded-2xl bg-celticBlue-50 border border-celticBlue-200 flex items-start gap-3.5 text-xs text-drabDark/80">
        <Info className="w-5 h-5 text-celticBlue flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-celticBlue font-bold block text-sm mb-0.5">
            Quiz Activity & Session Monitoring
          </strong>
          <span>
            This system logs browser-level Page Visibility events, Window Focus losses, and Fullscreen state changes.
            A maximum of <strong>{maxWarnings} warnings</strong> triggers automatic submission. Note: Institutional environmental lockdown requires kiosk mode or Safe Exam Browser.
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <Card variant="default" className="p-4 sm:p-6 border border-teaGreen-300 bg-white">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-72">
            <Input
              placeholder="Search candidate or register no..."
              icon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-full sm:w-56">
              <Select
                options={filterOptions}
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              />
            </div>

            <Button
              variant="outline"
              size="md"
              onClick={fetchActivityData}
              icon={RefreshCw}
              className="text-xs px-3"
              title="Refresh logs"
            />
          </div>
        </div>
      </Card>

      {/* Activity Table */}
      <Card variant="default" className="border border-teaGreen-300 bg-white overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-drabDark">
            <thead className="bg-ivory border-b border-teaGreen-300 text-[11px] font-bold font-comfortaa uppercase tracking-wider text-drabDark/80">
              <tr>
                <th className="px-5 py-4">Student Name</th>
                <th className="px-5 py-4">Reg Number</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-center">Tab Switches</th>
                <th className="px-5 py-4 text-center">Fullscreen Exits</th>
                <th className="px-5 py-4 text-center">Total Warnings</th>
                <th className="px-5 py-4">Latest Activity</th>
                <th className="px-5 py-4 text-right">Activity Logs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-teaGreen-200/60 font-medium">
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-drabDark/60">
                    <Clock className="w-6 h-6 animate-spin mx-auto mb-2 text-celticBlue" />
                    Loading activity telemetry...
                  </td>
                </tr>
              ) : filteredAttempts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-drabDark/60">
                    No matching activity records found.
                  </td>
                </tr>
              ) : (
                filteredAttempts.map((att) => {
                  const isExceeded = att.totalWarnings >= maxWarnings;

                  return (
                    <tr
                      key={att.id}
                      className="hover:bg-ivory/60 transition-colors cursor-pointer"
                      onClick={() => setSelectedAttempt(att)}
                    >
                      <td className="px-5 py-3.5 font-bold text-drabDark">
                        {att.name}
                        <span className="block text-[10px] font-normal text-drabDark/60">{att.class}</span>
                      </td>

                      <td className="px-5 py-3.5 font-mono text-celticBlue font-semibold">
                        {att.registerNumber}
                      </td>

                      <td className="px-5 py-3.5">
                        <Badge
                          variant={
                            att.status === 'Completed'
                              ? 'success'
                              : att.status === 'In Progress'
                              ? 'info'
                              : 'default'
                          }
                          size="sm"
                        >
                          {att.status}
                        </Badge>
                      </td>

                      <td className="px-5 py-3.5 text-center">
                        <span
                          className={`font-comfortaa font-bold px-2 py-0.5 rounded-lg ${
                            att.tabSwitchCount > 0 ? 'bg-vanilla text-drabDark' : 'text-drabDark/50'
                          }`}
                        >
                          {att.tabSwitchCount}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-center">
                        <span
                          className={`font-comfortaa font-bold px-2 py-0.5 rounded-lg ${
                            att.fullscreenExitCount > 0 ? 'bg-vanilla text-drabDark' : 'text-drabDark/50'
                          }`}
                        >
                          {att.fullscreenExitCount}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-center">
                        <span
                          className={`font-comfortaa font-bold px-3 py-1 rounded-full text-xs border ${
                            isExceeded
                              ? 'bg-red-100 text-red-700 border-red-300'
                              : att.totalWarnings > 0
                              ? 'bg-vanilla-200 text-drabDark border-vanilla-400'
                              : 'bg-teaGreen-100 text-teaGreen-700 border-teaGreen-300'
                          }`}
                        >
                          {att.totalWarnings} / {maxWarnings}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-drabDark/70 font-mono text-[11px]">
                        {formatTime(att.latestActivityTime)}
                      </td>

                      <td className="px-5 py-3.5 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAttempt(att);
                          }}
                          icon={Eye}
                          className="text-[11px] px-2.5 py-1"
                        >
                          View Logs
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Chronological Activity Detail Modal */}
      {selectedAttempt && (
        <Modal
          isOpen={Boolean(selectedAttempt)}
          onClose={() => setSelectedAttempt(null)}
          title={`Activity Logs: ${selectedAttempt.name}`}
          subtitle={`Reg No: ${selectedAttempt.registerNumber} • Total Warnings: ${selectedAttempt.totalWarnings}/${maxWarnings}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4 font-poppins">
            {/* Candidate Summary Pill */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-ivory border border-teaGreen-300">
                <span className="text-[10px] text-drabDark/60 block uppercase font-bold">Tab Switches</span>
                <span className="font-comfortaa font-bold text-base text-celticBlue">
                  {selectedAttempt.tabSwitchCount}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-ivory border border-teaGreen-300">
                <span className="text-[10px] text-drabDark/60 block uppercase font-bold">Fullscreen Exits</span>
                <span className="font-comfortaa font-bold text-base text-celticBlue">
                  {selectedAttempt.fullscreenExitCount}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-ivory border border-teaGreen-300">
                <span className="text-[10px] text-drabDark/60 block uppercase font-bold">Total Warnings</span>
                <span
                  className={`font-comfortaa font-bold text-base ${
                    selectedAttempt.totalWarnings >= maxWarnings ? 'text-red-600' : 'text-drabDark'
                  }`}
                >
                  {selectedAttempt.totalWarnings} / {maxWarnings}
                </span>
              </div>
            </div>

            {/* Chronological Events Timeline */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-drabDark/70 block pt-2">
                Timeline of Monitored Events
              </span>

              {selectedAttempt.activityLogs && selectedAttempt.activityLogs.length > 0 ? (
                selectedAttempt.activityLogs.map((log, index) => {
                  const isWarn = log.type === 'TAB_SWITCH' || log.type === 'FULLSCREEN_EXIT';

                  return (
                    <div
                      key={index}
                      className={`p-3 rounded-xl border flex items-start gap-3 text-xs ${
                        isWarn
                          ? 'bg-vanilla-50 border-vanilla-300 text-drabDark'
                          : 'bg-white border-teaGreen-200 text-drabDark/80'
                      }`}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        {log.type === 'QUIZ_STARTED' && (
                          <Clock className="w-4 h-4 text-celticBlue" />
                        )}
                        {log.type === 'QUIZ_SUBMITTED' && (
                          <CheckCircle2 className="w-4 h-4 text-teaGreen-600" />
                        )}
                        {log.type === 'TAB_SWITCH' && (
                          <AlertTriangle className="w-4 h-4 text-vanilla-600" />
                        )}
                        {log.type === 'FULLSCREEN_EXIT' && (
                          <Maximize2 className="w-4 h-4 text-red-500" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-drabDark">
                            {log.type.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] font-mono text-drabDark/60">
                            {formatTime(log.timestamp)}
                          </span>
                        </div>
                        <p className="text-[11px] text-drabDark/70 mt-0.5">
                          {log.details || 'Activity event recorded'}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-4 rounded-xl bg-ivory text-center text-xs text-drabDark/60">
                  No activity events registered for this candidate.
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedAttempt(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
