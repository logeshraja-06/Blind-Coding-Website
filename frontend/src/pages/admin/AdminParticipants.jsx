import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  Users,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  RefreshCw,
  X,
  AlertTriangle,
  HelpCircle,
  KeyRound,
  FileCode2,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export const AdminParticipants = () => {
  const { adminToken } = useAuth();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  // Detailed Modal State
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [participantReview, setParticipantReview] = useState(null);

  const pageSize = 10;

  const fetchParticipants = async () => {
    setLoading(true);
    try {
      const res = await api.getAdminParticipants(adminToken);
      if (res && res.success && res.participants) {
        setParticipants(res.participants);
      }
    } catch (err) {
      console.warn('Error fetching participants:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [adminToken]);

  const handleOpenReview = async (p) => {
    setSelectedParticipant(p);
    setReviewLoading(true);
    setParticipantReview(null);
    try {
      const res = await api.getParticipantReview(adminToken, p.id || p.registerNumber);
      if (res && res.success) {
        setParticipantReview(res);
      }
    } catch (err) {
      console.warn('Failed to load candidate review:', err);
    } finally {
      setReviewLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    return participants.filter((p) => {
      const matchesSearch =
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.registerNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.class?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.department?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesYear = selectedYear === 'ALL' || p.year === selectedYear;

      const matchesStatus =
        selectedStatus === 'ALL' ||
        (selectedStatus === 'Completed' && (p.status === 'Completed' || p.status === 'COMPLETED')) ||
        (selectedStatus === 'In Progress' && (p.status === 'In Progress' || p.status === 'IN_PROGRESS'));

      return matchesSearch && matchesYear && matchesStatus;
    });
  }, [participants, searchTerm, selectedYear, selectedStatus]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return (
    <div className="space-y-6 font-poppins">
      {/* Search & Filter Header Bar */}
      <Card variant="default" className="p-5 border border-teaGreen-300 bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="w-full md:w-80">
            <Input
              placeholder="Search by name, reg no, or class..."
              icon={Search}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Filters and Refresh */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="w-40">
              <Select
                options={[
                  { value: 'ALL', label: 'All Years' },
                  { value: 'IV Year', label: 'IV Year' },
                  { value: 'III Year', label: 'III Year' },
                  { value: 'II Year', label: 'II Year' },
                  { value: 'I Year', label: 'I Year' },
                ]}
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="w-40">
              <Select
                options={[
                  { value: 'ALL', label: 'All Statuses' },
                  { value: 'Completed', label: 'Completed' },
                  { value: 'In Progress', label: 'In Progress' },
                ]}
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <Button
              variant="outline"
              size="md"
              onClick={fetchParticipants}
              icon={RefreshCw}
              title="Refresh Roster"
            >
              Refresh
            </Button>
          </div>
        </div>
      </Card>

      {/* Participants Table Card */}
      <Card variant="default" className="overflow-hidden border border-teaGreen-300 bg-white p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory border-b border-teaGreen-300 text-drabDark font-comfortaa font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-4">Participant</th>
                <th className="px-5 py-4">Register No</th>
                <th className="px-5 py-4">Academic Details</th>
                <th className="px-5 py-4">Score</th>
                <th className="px-5 py-4">Warnings</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-teaGreen-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-drabDark/60">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-celticBlue mb-2" />
                    Loading verified candidate roster...
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((p) => (
                  <tr
                    key={p.id || p.registerNumber}
                    className="hover:bg-ivory/60 transition-colors cursor-pointer"
                    onClick={() => handleOpenReview(p)}
                  >
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-drabDark text-sm">{p.name}</div>
                      <div className="text-[11px] text-drabDark/60 truncate max-w-[180px]">
                        {p.department || 'Department of CSE'}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-mono font-semibold text-celticBlue">
                      {p.registerNumber}
                    </td>
                    <td className="px-5 py-3.5 text-drabDark">
                      <div className="font-medium">{p.year}</div>
                      <div className="text-[11px] text-drabDark/60">{p.class} • Sec {p.section}</div>
                    </td>
                    <td className="px-5 py-3.5">
                      {p.score !== null ? (
                        <div>
                          <span className="font-bold font-comfortaa text-celticBlue text-sm">
                            {p.score} / {p.total || 25}
                          </span>
                          <span className="text-[10px] text-drabDark/60 block font-medium">
                            {p.percentage !== null ? `${p.percentage}%` : ''} • {p.timeFormatted || '--:--'}
                          </span>
                        </div>
                      ) : (
                        <span className="text-drabDark/40 font-medium">Pending Final</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      {(p.totalWarnings || 0) > 0 ? (
                        <Badge variant="warning" size="sm" className="font-bold">
                          {p.totalWarnings} {p.totalWarnings === 1 ? 'Warning' : 'Warnings'}
                        </Badge>
                      ) : (
                        <Badge variant="success" size="sm">0 Clean</Badge>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge
                        variant={
                          p.status === 'Completed' || p.status === 'COMPLETED'
                            ? 'success'
                            : p.status === 'In Progress' || p.status === 'IN_PROGRESS'
                            ? 'info'
                            : 'neutral'
                        }
                        size="sm"
                      >
                        {p.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenReview(p);
                        }}
                        icon={Eye}
                        className="text-[11px] px-2.5 py-1"
                      >
                        Review
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-drabDark/50 text-sm">
                    No participants found matching current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 bg-ivory/50 border-t border-teaGreen-200 flex items-center justify-between text-xs text-drabDark/70">
          <div>
            Showing <strong>{paginatedData.length}</strong> of <strong>{filteredData.length}</strong> participants
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              icon={ChevronLeft}
            >
              Prev
            </Button>
            <span className="font-semibold px-2">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              icon={ChevronRight}
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* Participant Detail & Question-by-Question Review Modal */}
      <Modal
        isOpen={Boolean(selectedParticipant)}
        onClose={() => {
          setSelectedParticipant(null);
          setParticipantReview(null);
        }}
        title="Candidate Assessment Record"
        subtitle="Confidential administrator review & question-by-question audit"
        maxWidth="max-w-3xl"
      >
        {selectedParticipant && (
          <div className="space-y-6 text-xs font-poppins max-h-[75vh] overflow-y-auto pr-1">
            {/* Profile Overview Card */}
            <div className="p-5 rounded-2xl bg-white border border-teaGreen-300 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-teaGreen-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-celticBlue text-white font-comfortaa font-bold text-lg flex items-center justify-center shadow-md">
                    {selectedParticipant.name?.charAt(0) || 'P'}
                  </div>
                  <div>
                    <h4 className="font-comfortaa font-bold text-base text-drabDark">
                      {selectedParticipant.name}
                    </h4>
                    <p className="text-drabDark/70 font-mono text-xs">
                      {selectedParticipant.registerNumber} • {selectedParticipant.department || 'Department of CSE'}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={
                    selectedParticipant.status === 'Completed' || selectedParticipant.status === 'COMPLETED'
                      ? 'success'
                      : 'info'
                  }
                  size="md"
                  className="font-bold"
                >
                  {selectedParticipant.status}
                </Badge>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                <div className="p-3 rounded-xl bg-ivory border border-teaGreen-200">
                  <span className="text-drabDark/60 uppercase text-[10px] block font-semibold">Class & Sec</span>
                  <span className="font-bold text-drabDark text-xs">{selectedParticipant.class} ({selectedParticipant.section})</span>
                  <span className="text-[10px] text-drabDark/60 block">{selectedParticipant.year}</span>
                </div>
                <div className="p-3 rounded-xl bg-ivory border border-teaGreen-200">
                  <span className="text-drabDark/60 uppercase text-[10px] block font-semibold">Final Score</span>
                  <span className="font-bold text-celticBlue font-comfortaa text-sm">
                    {selectedParticipant.score !== null ? `${selectedParticipant.score} / ${selectedParticipant.total || 25}` : 'In Progress'}
                  </span>
                  <span className="text-[10px] text-drabDark/60 block">
                    {selectedParticipant.percentage !== null ? `${selectedParticipant.percentage}% Accuracy` : '--'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-ivory border border-teaGreen-200">
                  <span className="text-drabDark/60 uppercase text-[10px] block font-semibold">Time Recorded</span>
                  <span className="font-bold text-drabDark font-mono text-xs">
                    {selectedParticipant.timeFormatted || '--:--'}
                  </span>
                  <span className="text-[10px] text-drabDark/60 block">
                    {selectedParticipant.timeTakenSeconds ? `${selectedParticipant.timeTakenSeconds}s elapsed` : 'Active'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-ivory border border-teaGreen-200">
                  <span className="text-drabDark/60 uppercase text-[10px] block font-semibold">Integrity Warnings</span>
                  <span className="font-bold text-amber-700 text-xs">
                    {selectedParticipant.totalWarnings || 0} Total
                  </span>
                  <span className="text-[10px] text-drabDark/60 block">
                    {selectedParticipant.tabSwitchCount || 0} Tab / {selectedParticipant.fullscreenExitCount || 0} FS
                  </span>
                </div>
              </div>

              {/* Timestamps */}
              {(selectedParticipant.startedAt || selectedParticipant.submittedAt) && (
                <div className="mt-3 pt-3 border-t border-teaGreen-200 flex flex-wrap gap-4 text-[11px] text-drabDark/70 font-mono">
                  {selectedParticipant.startedAt && (
                    <div>
                      <strong>Started: </strong>
                      {new Date(selectedParticipant.startedAt).toLocaleString()}
                    </div>
                  )}
                  {selectedParticipant.submittedAt && (
                    <div>
                      <strong>Submitted: </strong>
                      {new Date(selectedParticipant.submittedAt).toLocaleString()}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Detailed Question-by-Question Review Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-teaGreen-200">
                <h5 className="font-comfortaa font-bold text-sm text-drabDark flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-celticBlue" />
                  Detailed Question Review (Admin Verified)
                </h5>
                {participantReview?.review && (
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-[#39D98A]/20 text-[#064E3B] font-bold border border-[#22c55e]">
                      {participantReview.review.filter((q) => q.status === 'CORRECT').length} Correct
                    </span>
                    <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold border border-rose-300">
                      {participantReview.review.filter((q) => q.status === 'INCORRECT').length} Incorrect
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-300">
                      {participantReview.review.filter((q) => q.status === 'UNANSWERED').length} Unanswered
                    </span>
                  </div>
                )}
              </div>

              {reviewLoading ? (
                <div className="p-8 text-center bg-ivory rounded-2xl border border-teaGreen-200">
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto text-celticBlue mb-2" />
                  <p className="text-xs text-drabDark/60">Fetching complete question-by-question breakdown...</p>
                </div>
              ) : participantReview?.review && participantReview.review.length > 0 ? (
                <div className="space-y-3">
                  {participantReview.review.map((item) => {
                    const isCorrect = item.status === 'CORRECT';
                    const isIncorrect = item.status === 'INCORRECT';
                    const isUnanswered = item.status === 'UNANSWERED';

                    return (
                      <div
                        key={item.questionId}
                        className={`p-4 rounded-2xl border transition-all ${
                          isCorrect
                            ? 'bg-[#39D98A]/5 border-[#39D98A]/40'
                            : isIncorrect
                            ? 'bg-rose-50/40 border-rose-200'
                            : 'bg-white border-teaGreen-200'
                        }`}
                      >
                        {/* Question Header & Status Badge */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-celticBlue text-white font-bold font-comfortaa text-[10px]">
                              Q{String(item.displayOrder || item.questionId).padStart(2, '0')}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-teaGreen-100 text-drabDark text-[10px] font-semibold">
                              {item.category}
                            </span>
                            <span className="text-[10px] text-drabDark/60 font-medium">
                              Difficulty: {item.difficulty}
                            </span>
                          </div>

                          {/* Status Badge */}
                          {isCorrect && (
                            <span className="px-2.5 py-1 rounded-full bg-[#39D98A] text-[#064E3B] font-bold text-[10px] flex items-center gap-1 border border-[#20c077]">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              CORRECT (+1)
                            </span>
                          )}
                          {isIncorrect && (
                            <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 font-bold text-[10px] flex items-center gap-1 border border-rose-300">
                              <XCircle className="w-3.5 h-3.5" />
                              INCORRECT (0)
                            </span>
                          )}
                          {isUnanswered && (
                            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium text-[10px] flex items-center gap-1 border border-slate-300">
                              <HelpCircle className="w-3.5 h-3.5" />
                              UNANSWERED (0)
                            </span>
                          )}
                        </div>

                        {/* Question Text */}
                        <p className="font-semibold text-drabDark text-xs mb-2">
                          {item.question}
                        </p>

                        {/* Code Snippet if present */}
                        {item.codeSnippet && (
                          <div className="mb-3 p-2.5 rounded-lg bg-drabDark text-teaGreen-200 font-mono text-[11px] overflow-x-auto border border-drabDark/40">
                            <pre>{item.codeSnippet}</pre>
                          </div>
                        )}

                        {/* Student Choice vs Correct Answer Compare Well */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-teaGreen-200/60 text-xs">
                          <div
                            className={`p-2.5 rounded-xl border ${
                              isCorrect
                                ? 'bg-[#39D98A]/10 border-[#39D98A]/40 text-[#064E3B]'
                                : isIncorrect
                                ? 'bg-rose-100/40 border-rose-300 text-rose-800'
                                : 'bg-slate-50 border-slate-200 text-slate-600'
                            }`}
                          >
                            <span className="text-[10px] uppercase font-bold tracking-wider block opacity-75">
                              Candidate Selected:
                            </span>
                            <span className="font-bold font-comfortaa">
                              {item.studentSelectedOptionId ? `[${item.studentSelectedOptionId}] ${item.studentSelectedText}` : '— Not Answered —'}
                            </span>
                          </div>

                          <div className="p-2.5 rounded-xl bg-celticBlue-50 border border-celticBlue-200 text-celticBlue">
                            <span className="text-[10px] uppercase font-bold tracking-wider block opacity-75">
                              Master Correct Answer:
                            </span>
                            <span className="font-bold font-comfortaa">
                              [{item.correctOptionId}] {item.correctText}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center text-drabDark/60 bg-ivory rounded-2xl border border-teaGreen-200">
                  No individual question review available for this attempt status.
                </div>
              )}
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setSelectedParticipant(null);
                setParticipantReview(null);
              }}
              className="w-full justify-center mt-4"
            >
              Close Assessment Review
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};
