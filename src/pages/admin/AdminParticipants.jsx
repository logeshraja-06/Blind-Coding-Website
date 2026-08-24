import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Users,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  Clock,
  Download,
  X
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { INITIAL_PARTICIPANTS } from '../../data/participants';

export const AdminParticipants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const pageSize = 8;

  // Retrieve stored submissions if any
  const participants = useMemo(() => {
    const local = localStorage.getItem('blindcode_student');
    const localResult = localStorage.getItem('blindcode_result');
    if (local) {
      const parsedStudent = JSON.parse(local);
      const parsedResult = localResult ? JSON.parse(localResult) : null;
      const exists = INITIAL_PARTICIPANTS.some((p) => p.name === parsedStudent.name);
      if (!exists) {
        return [
          {
            id: parsedStudent.id,
            name: parsedStudent.name,
            registerNumber: parsedStudent.registerNumber || 'N/A',
            department: parsedStudent.department,
            year: parsedStudent.year,
            class: parsedStudent.class,
            section: parsedStudent.section,
            score: parsedResult ? parsedResult.score : null,
            total: 25,
            percentage: parsedResult ? parsedResult.percentage : null,
            timeFormatted: parsedResult ? parsedResult.timeFormatted : '--:--',
            status: parsedResult ? 'Completed' : 'In Progress',
            rank: parsedResult ? 14 : null,
          },
          ...INITIAL_PARTICIPANTS,
        ];
      }
    }
    return INITIAL_PARTICIPANTS;
  }, []);

  const filteredData = useMemo(() => {
    return participants.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.registerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.class.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept =
        selectedDept === 'ALL' || p.department === selectedDept;

      const matchesStatus =
        selectedStatus === 'ALL' || p.status === selectedStatus;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [participants, searchTerm, selectedDept, selectedStatus]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return (
    <div className="space-y-6">
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

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={selectedDept}
              onChange={(e) => {
                setSelectedDept(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-ivory border border-teaGreen-300 text-xs font-semibold text-drabDark px-3 py-2.5 rounded-xl outline-none focus:border-celticBlue cursor-pointer"
            >
              <option value="ALL">All Departments</option>
              <option value="Computer Science & Engineering">CSE</option>
              <option value="Information Technology">IT</option>
              <option value="Artificial Intelligence & Data Science">AI&DS</option>
              <option value="Electronics & Communication">ECE</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-ivory border border-teaGreen-300 text-xs font-semibold text-drabDark px-3 py-2.5 rounded-xl outline-none focus:border-celticBlue cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Participants Table */}
      <Card variant="default" className="border border-teaGreen-300 bg-white overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory border-b border-teaGreen-200 text-[11px] uppercase tracking-wider text-drabDark/70 font-semibold">
              <tr>
                <th className="py-4 px-6">Participant</th>
                <th className="py-4 px-4">Department</th>
                <th className="py-4 px-4">Year & Section</th>
                <th className="py-4 px-4">Score</th>
                <th className="py-4 px-4">Time</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-teaGreen-100 font-medium">
              {paginatedData.length > 0 ? (
                paginatedData.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-ivory/60 transition-colors cursor-pointer"
                    onClick={() => setSelectedParticipant(p)}
                  >
                    <td className="py-4 px-6">
                      <div className="font-bold text-drabDark text-sm">{p.name}</div>
                      <div className="text-[11px] text-drabDark/50 font-mono">
                        {p.registerNumber} • ID: {p.id}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-drabDark/80">{p.department}</td>
                    <td className="py-4 px-4 text-drabDark/80">
                      {p.year} • <span className="font-bold">{p.class}</span> (Sec {p.section})
                    </td>
                    <td className="py-4 px-4">
                      {p.score !== null ? (
                        <span className="font-comfortaa font-bold text-celticBlue text-sm">
                          {p.score} / {p.total} ({p.percentage}%)
                        </span>
                      ) : (
                        <span className="text-drabDark/40">-- / 25</span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-mono text-drabDark/70">{p.timeFormatted}</td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={p.status === 'Completed' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {p.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedParticipant(p);
                        }}
                        className="p-1.5 rounded-lg text-drabDark/60 hover:text-celticBlue hover:bg-celticBlue-50 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
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

      {/* Participant Detail Modal */}
      <Modal
        isOpen={Boolean(selectedParticipant)}
        onClose={() => setSelectedParticipant(null)}
        title="Participant Details"
        subtitle="Complete candidate profile & quiz record"
        maxWidth="max-w-md"
      >
        {selectedParticipant && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-white border border-teaGreen-300 text-center">
              <div className="w-12 h-12 rounded-full bg-celticBlue text-white font-comfortaa font-bold text-lg flex items-center justify-center mx-auto mb-2">
                {selectedParticipant.name.charAt(0)}
              </div>
              <h4 className="font-comfortaa font-bold text-base text-drabDark">
                {selectedParticipant.name}
              </h4>
              <p className="text-drabDark/60 font-mono text-[11px]">
                {selectedParticipant.registerNumber}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-ivory border border-teaGreen-200">
                <span className="text-drabDark/60 uppercase text-[10px] block font-semibold">Department</span>
                <span className="font-bold text-drabDark">{selectedParticipant.department}</span>
              </div>
              <div className="p-3 rounded-xl bg-ivory border border-teaGreen-200">
                <span className="text-drabDark/60 uppercase text-[10px] block font-semibold">Class / Section</span>
                <span className="font-bold text-drabDark">{selectedParticipant.class} (Sec {selectedParticipant.section})</span>
              </div>
              <div className="p-3 rounded-xl bg-ivory border border-teaGreen-200">
                <span className="text-drabDark/60 uppercase text-[10px] block font-semibold">Score / Total</span>
                <span className="font-bold text-celticBlue font-comfortaa text-sm">
                  {selectedParticipant.score !== null ? `${selectedParticipant.score} / 25` : 'In Progress'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-ivory border border-teaGreen-200">
                <span className="text-drabDark/60 uppercase text-[10px] block font-semibold">Time Recorded</span>
                <span className="font-bold text-drabDark font-mono">{selectedParticipant.timeFormatted}</span>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setSelectedParticipant(null)}
              className="w-full justify-center mt-2"
            >
              Close
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};
