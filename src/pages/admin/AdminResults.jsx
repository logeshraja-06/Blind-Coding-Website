import React, { useState, useMemo } from 'react';
import {
  Trophy,
  Medal,
  Award,
  Search,
  Clock,
  CheckCircle2,
  TrendingUp,
  Download,
  Sparkles
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { INITIAL_PARTICIPANTS } from '../../data/participants';
import { useToast } from '../../context/ToastContext';

export const AdminResults = () => {
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Sorted by score descending, then time ascending
  const rankedParticipants = useMemo(() => {
    return [...INITIAL_PARTICIPANTS]
      .filter((p) => p.status === 'Completed')
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return (a.timeTakenSeconds || 0) - (b.timeTakenSeconds || 0);
      })
      .map((p, index) => ({
        ...p,
        rank: index + 1,
      }));
  }, []);

  const filteredRanked = useMemo(() => {
    return rankedParticipants.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.registerNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [rankedParticipants, searchTerm]);

  const top1 = rankedParticipants[0];
  const top2 = rankedParticipants[1];
  const top3 = rankedParticipants[2];

  const handleExportRanks = () => {
    addToast('Leaderboard report generated successfully!', 'success', 3000);
  };

  return (
    <div className="space-y-8">
      {/* Podium Top 3 Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4">
        {/* 2nd Place */}
        {top2 && (
          <Card
            variant="default"
            hoverEffect
            className="p-6 border-2 border-drabDark/20 bg-white text-center relative order-2 md:order-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-drabDark/10 text-drabDark font-comfortaa font-bold text-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
              🥈
            </div>
            <Badge variant="default" size="sm" className="mb-2">
              Rank 02 • Silver
            </Badge>
            <h3 className="font-comfortaa font-bold text-lg text-drabDark">
              {top2.name}
            </h3>
            <p className="text-xs text-drabDark/60 mb-3">{top2.department}</p>

            <div className="p-3 rounded-xl bg-ivory border border-teaGreen-200 flex justify-around items-center">
              <div>
                <span className="text-[10px] text-drabDark/60 block uppercase font-semibold">Score</span>
                <span className="font-comfortaa font-bold text-celticBlue text-base">{top2.score} / 25</span>
              </div>
              <div className="border-l border-teaGreen-200 pl-3">
                <span className="text-[10px] text-drabDark/60 block uppercase font-semibold">Time</span>
                <span className="font-mono text-drabDark text-xs font-semibold">{top2.timeFormatted}</span>
              </div>
            </div>
          </Card>
        )}

        {/* 1st Place (Center / Taller) */}
        {top1 && (
          <Card
            variant="default"
            hoverEffect
            className="p-8 border-2 border-vanilla-400 bg-gradient-to-b from-white to-vanilla-50/50 text-center relative order-1 md:order-2 shadow-premium -translate-y-2"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-vanilla-300 border border-vanilla-400 text-drabDark text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3 text-celticBlue" />
              Event Champion
            </div>

            <div className="w-16 h-16 rounded-2xl bg-vanilla text-drabDark font-comfortaa font-bold text-3xl flex items-center justify-center mx-auto mb-3 shadow-md">
              🥇
            </div>
            <Badge variant="warning" size="sm" className="mb-2">
              Rank 01 • Gold
            </Badge>
            <h3 className="font-comfortaa font-bold text-xl text-drabDark">
              {top1.name}
            </h3>
            <p className="text-xs text-drabDark/60 mb-4">{top1.department}</p>

            <div className="p-4 rounded-xl bg-white border border-vanilla-300 shadow-sm flex justify-around items-center">
              <div>
                <span className="text-[10px] text-drabDark/60 block uppercase font-semibold">Score</span>
                <span className="font-comfortaa font-bold text-celticBlue text-lg">{top1.score} / 25</span>
              </div>
              <div className="border-l border-vanilla-200 pl-4">
                <span className="text-[10px] text-drabDark/60 block uppercase font-semibold">Time</span>
                <span className="font-mono text-drabDark text-sm font-bold">{top1.timeFormatted}</span>
              </div>
            </div>
          </Card>
        )}

        {/* 3rd Place */}
        {top3 && (
          <Card
            variant="default"
            hoverEffect
            className="p-6 border-2 border-teaGreen-400/80 bg-white text-center relative order-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-teaGreen-200 text-drabDark font-comfortaa font-bold text-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
              🥉
            </div>
            <Badge variant="success" size="sm" className="mb-2">
              Rank 03 • Bronze
            </Badge>
            <h3 className="font-comfortaa font-bold text-lg text-drabDark">
              {top3.name}
            </h3>
            <p className="text-xs text-drabDark/60 mb-3">{top3.department}</p>

            <div className="p-3 rounded-xl bg-ivory border border-teaGreen-200 flex justify-around items-center">
              <div>
                <span className="text-[10px] text-drabDark/60 block uppercase font-semibold">Score</span>
                <span className="font-comfortaa font-bold text-celticBlue text-base">{top3.score} / 25</span>
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
              onClick={handleExportRanks}
              icon={Download}
              className="text-xs whitespace-nowrap"
            >
              Export
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
              {filteredRanked.map((p) => (
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
                    <div className="text-[10px] text-drabDark/60">{p.class}</div>
                  </td>
                  <td className="py-3.5 px-4 font-comfortaa font-bold text-celticBlue text-sm">
                    {p.score} / 25
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-drabDark">{p.percentage}%</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-drabDark/80">{p.timeFormatted}</td>
                  <td className="py-3.5 px-4 text-drabDark/60 text-[11px]">{p.submittedAt || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
