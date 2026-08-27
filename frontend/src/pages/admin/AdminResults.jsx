import React, { useState, useEffect, useMemo } from 'react';
import {
  Trophy,
  Medal,
  Award,
  Search,
  Clock,
  CheckCircle2,
  TrendingUp,
  Download,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { api, API_BASE_URL } from '../../services/api';

export const AdminResults = () => {
  const { adminToken } = useAuth();
  const { addToast } = useToast();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await api.getAdminLeaderboard(adminToken);
      if (res && res.success && res.leaderboard) {
        setLeaderboard(res.leaderboard);
      }
    } catch (err) {
      console.warn('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [adminToken]);

  const filteredRanked = useMemo(() => {
    return leaderboard.filter(
      (p) =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.registerNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.class?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [leaderboard, searchTerm]);

  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];

  const handleExportRanks = () => {
    const token = localStorage.getItem('blindcode_admin_token') || '';
    window.location.href = `${API_BASE_URL}/export/xlsx?token=${encodeURIComponent(token)}`;
    addToast('Downloading official leaderboard report...', 'success', 3000);
  };

  return (
    <div className="space-y-8 font-poppins">
      {/* Podium Top 3 Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4">
        {/* Rank 2 (Silver) */}
        {top2 && (
          <Card
            variant="default"
            className="p-6 border-2 border-slate-300 bg-white text-center shadow-subtle order-2 md:order-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto mb-3 font-comfortaa font-bold text-lg shadow-sm">
              🥈 02
            </div>
            <h4 className="font-comfortaa font-bold text-base text-drabDark mb-0.5">
              {top2.name}
            </h4>
            <p className="text-xs text-drabDark/60 font-mono mb-3">
              {top2.registerNumber} • {top2.class}
            </p>
            <div className="text-2xl font-comfortaa font-bold text-celticBlue mb-1">
              {top2.score} / 25
            </div>
            <div className="text-xs text-drabDark/70 font-semibold mb-4">
              {top2.percentage}% Accuracy
            </div>
            <div className="pt-3 border-t border-teaGreen-200 grid grid-cols-2 text-center text-xs">
              <div>
                <span className="text-[10px] text-drabDark/60 block uppercase font-semibold">Rank</span>
                <span className="font-bold text-slate-700">#2 Silver</span>
              </div>
              <div className="border-l border-teaGreen-200 pl-3">
                <span className="text-[10px] text-drabDark/60 block uppercase font-semibold">Time</span>
                <span className="font-mono text-drabDark text-xs font-semibold">{top2.timeFormatted}</span>
              </div>
            </div>
          </Card>
        )}

        {/* Rank 1 (Gold) */}
        {top1 && (
          <Card
            variant="default"
            className="p-8 border-2 border-vanilla-400 bg-vanilla-50/50 text-center shadow-premium relative order-1 md:order-2 md:-mt-4"
          >
            <div className="w-16 h-16 rounded-3xl bg-vanilla text-drabDark flex items-center justify-center mx-auto mb-3 font-comfortaa font-bold text-2xl shadow-md border border-vanilla-400">
              🥇 01
            </div>
            <div className="inline-block px-3 py-1 rounded-full bg-vanilla text-drabDark text-[11px] font-bold uppercase tracking-wider mb-2 border border-vanilla-400">
              Champion
            </div>
            <h4 className="font-comfortaa font-bold text-lg text-drabDark mb-0.5">
              {top1.name}
            </h4>
            <p className="text-xs text-drabDark/60 font-mono mb-3">
              {top1.registerNumber} • {top1.class}
            </p>
            <div className="text-4xl font-comfortaa font-bold text-drabDark mb-1">
              {top1.score} / 25
            </div>
            <div className="text-xs text-drabDark/80 font-bold mb-5">
              {top1.percentage}% Accuracy
            </div>
            <div className="pt-4 border-t border-vanilla-300 grid grid-cols-2 text-center text-xs">
              <div>
                <span className="text-[10px] text-drabDark/60 block uppercase font-semibold">Rank</span>
                <span className="font-bold text-drabDark">#1 Gold</span>
              </div>
              <div className="border-l border-vanilla-300 pl-3">
                <span className="text-[10px] text-drabDark/60 block uppercase font-semibold">Time</span>
                <span className="font-mono text-drabDark font-bold">{top1.timeFormatted}</span>
              </div>
            </div>
          </Card>
        )}

        {/* Rank 3 (Bronze) */}
        {top3 && (
          <Card
            variant="default"
            className="p-6 border-2 border-amber-300/80 bg-white text-center shadow-subtle order-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mx-auto mb-3 font-comfortaa font-bold text-lg shadow-sm">
              🥉 03
            </div>
            <h4 className="font-comfortaa font-bold text-base text-drabDark mb-0.5">
              {top3.name}
            </h4>
            <p className="text-xs text-drabDark/60 font-mono mb-3">
              {top3.registerNumber} • {top3.class}
            </p>
            <div className="text-2xl font-comfortaa font-bold text-celticBlue mb-1">
              {top3.score} / 25
            </div>
            <div className="text-xs text-drabDark/70 font-semibold mb-4">
              {top3.percentage}% Accuracy
            </div>
            <div className="pt-3 border-t border-teaGreen-200 grid grid-cols-2 text-center text-xs">
              <div>
                <span className="text-[10px] text-drabDark/60 block uppercase font-semibold">Rank</span>
                <span className="font-bold text-amber-800">#3 Bronze</span>
              </div>
              <div className="border-l border-teaGreen-200 pl-3">
                <span className="text-[10px] text-drabDark/60 block uppercase font-semibold">Time</span>
                <span className="font-mono text-drabDark text-xs font-semibold">{top3.timeFormatted}</span>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Full Leaderboard Table */}
      <Card variant="default" className="p-6 border border-teaGreen-300 bg-white shadow-subtle">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-teaGreen-200">
          <div>
            <h3 className="font-comfortaa font-bold text-lg text-drabDark">
              Complete Official Leaderboard
            </h3>
            <p className="text-xs text-drabDark/60">
              Ranked strictly by highest score, then fastest completion time
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search leaderboard..."
                icon={Search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchLeaderboard}
              icon={RefreshCw}
              className="text-xs"
              title="Refresh Leaderboard"
            />
            <Button
              variant="primary"
              size="sm"
              onClick={handleExportRanks}
              icon={Download}
              className="text-xs whitespace-nowrap"
            >
              Export XLSX
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto pt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-teaGreen-200 text-[11px] uppercase tracking-wider text-drabDark/60 font-semibold">
                <th className="pb-3 px-4">Rank</th>
                <th className="pb-3 px-4">Participant</th>
                <th className="pb-3 px-4">Department & Class</th>
                <th className="pb-3 px-4">Score (25)</th>
                <th className="pb-3 px-4">Accuracy</th>
                <th className="pb-3 px-4">Time Taken</th>
                <th className="pb-3 px-4">Submission Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-teaGreen-100 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-drabDark/60">
                    <Clock className="w-6 h-6 animate-spin mx-auto mb-2 text-celticBlue" />
                    Loading leaderboard standings...
                  </td>
                </tr>
              ) : filteredRanked.length > 0 ? (
                filteredRanked.map((p) => (
                  <tr key={p.id} className="hover:bg-ivory/60 transition-colors">
                    <td className="py-3.5 px-4 font-comfortaa font-bold text-sm">
                      {p.rank === 1 ? '🥇 01' : p.rank === 2 ? '🥈 02' : p.rank === 3 ? '🥉 03' : `#${String(p.rank).padStart(2, '0')}`}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-drabDark text-sm">{p.name}</div>
                      <div className="text-[10px] text-drabDark/50 font-mono">{p.registerNumber}</div>
                    </td>
                    <td className="py-3.5 px-4 text-drabDark/80">
                      <div>{p.department}</div>
                      <div className="text-[10px] text-drabDark/60">{p.year} • {p.class}</div>
                    </td>
                    <td className="py-3.5 px-4 font-comfortaa font-bold text-celticBlue text-sm">
                      {p.score} / 25
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-drabDark">{p.percentage}%</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-drabDark/80">{p.timeFormatted}</td>
                    <td className="py-3.5 px-4 text-drabDark/60 text-[11px] font-mono">
                      {p.submittedAt ? new Date(p.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-drabDark/50 text-sm">
                    No completed attempts recorded on the leaderboard yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
