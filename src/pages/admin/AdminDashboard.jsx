import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
  Award,
  ArrowRight,
  Download,
  HelpCircle,
  BarChart3,
  Layers,
  Terminal
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { AnimatedCounter } from '../../components/common/AnimatedCounter';
import { INITIAL_PARTICIPANTS, EVENT_STATS } from '../../data/participants';

export const AdminDashboard = () => {
  const recentSubmissions = INITIAL_PARTICIPANTS.filter((p) => p.status === 'Completed').slice(0, 5);

  const deptData = [
    { name: 'Computer Science & Engineering', count: 68, avg: '78%' },
    { name: 'Information Technology', count: 42, avg: '74%' },
    { name: 'AI & Data Science', count: 28, avg: '72%' },
    { name: 'Electronics & Communication', count: 18, avg: '65%' },
  ];

  return (
    <div className="space-y-8">
      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Participants */}
        <Card variant="default" className="p-6 border border-teaGreen-300 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-drabDark/60">
              Total Participants
            </span>
            <div className="w-9 h-9 rounded-xl bg-celticBlue-50 text-celticBlue flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-comfortaa text-drabDark mb-1">
            <AnimatedCounter target={EVENT_STATS.totalRegistered} />
          </div>
          <span className="text-xs text-teaGreen-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +100% capacity filled
          </span>
        </Card>

        {/* Quiz Completed */}
        <Card variant="default" className="p-6 border border-teaGreen-300 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-drabDark/60">
              Quiz Completed
            </span>
            <div className="w-9 h-9 rounded-xl bg-teaGreen-100 text-drabDark flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-drabDark" />
            </div>
          </div>
          <div className="text-3xl font-bold font-comfortaa text-drabDark mb-1">
            <AnimatedCounter target={EVENT_STATS.quizCompleted} />
          </div>
          <span className="text-xs text-drabDark/60 font-medium">
            91% completion rate
          </span>
        </Card>

        {/* In Progress */}
        <Card variant="default" className="p-6 border border-teaGreen-300 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-drabDark/60">
              In Progress
            </span>
            <div className="w-9 h-9 rounded-xl bg-vanilla-200 text-drabDark flex items-center justify-center">
              <Clock className="w-4 h-4 text-drabDark" />
            </div>
          </div>
          <div className="text-3xl font-bold font-comfortaa text-drabDark mb-1">
            <AnimatedCounter target={EVENT_STATS.inProgress} />
          </div>
          <span className="text-xs text-vanilla-500 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-vanilla-400 animate-ping" />
            Currently answering
          </span>
        </Card>

        {/* Average Score */}
        <Card variant="default" className="p-6 border border-teaGreen-300 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-drabDark/60">
              Average Score
            </span>
            <div className="w-9 h-9 rounded-xl bg-celticBlue-100 text-celticBlue flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-comfortaa text-celticBlue mb-1">
            <AnimatedCounter target={EVENT_STATS.averageScore} suffix="%" />
          </div>
          <span className="text-xs text-drabDark/60 font-medium">
            18.0 / 25 average marks
          </span>
        </Card>
      </div>

      {/* Grid: Department Breakdown & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Department Stats */}
        <Card variant="default" className="p-6 border border-teaGreen-300 bg-white lg:col-span-2">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-teaGreen-200">
            <div>
              <h3 className="font-comfortaa font-bold text-base text-drabDark">
                Department Performance Breakdown
              </h3>
              <p className="text-xs text-drabDark/60">Participation volume & average scores</p>
            </div>
            <Link
              to="/admin/participants"
              className="text-xs font-semibold text-celticBlue hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {deptData.map((dept) => (
              <div key={dept.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-drabDark">
                  <span>{dept.name}</span>
                  <span className="text-celticBlue">{dept.count} Students ({dept.avg} avg)</span>
                </div>
                <div className="w-full h-2.5 bg-ivory rounded-full border border-teaGreen-300/60 overflow-hidden">
                  <div
                    className="h-full bg-celticBlue rounded-full"
                    style={{ width: dept.avg }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions Card */}
        <Card variant="ivory" className="p-6 border border-teaGreen-300 flex flex-col justify-between">
          <div>
            <h3 className="font-comfortaa font-bold text-base text-drabDark mb-1">
              Admin Quick Actions
            </h3>
            <p className="text-xs text-drabDark/60 mb-5">Shortcuts for event management</p>

            <div className="space-y-2.5">
              <Link
                to="/admin/results"
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-teaGreen-300 hover:border-celticBlue text-xs font-semibold text-drabDark transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-celticBlue" />
                  <span>View Top Rankers</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-drabDark/40" />
              </Link>

              <Link
                to="/admin/exports"
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-teaGreen-300 hover:border-celticBlue text-xs font-semibold text-drabDark transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-teaGreen-600" />
                  <span>Download PDF/Excel Report</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-drabDark/40" />
              </Link>

              <Link
                to="/admin/questions"
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-teaGreen-300 hover:border-celticBlue text-xs font-semibold text-drabDark transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-drabDark" />
                  <span>Inspect Question Bank (25)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-drabDark/40" />
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-teaGreen-200 text-xs text-drabDark/60">
            Current Round: <strong className="text-drabDark">MCQ Qualifier (60m)</strong>
          </div>
        </Card>
      </div>

      {/* Recent Submissions Feed */}
      <Card variant="default" className="p-6 border border-teaGreen-300 bg-white">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-teaGreen-200">
          <div>
            <h3 className="font-comfortaa font-bold text-base text-drabDark">
              Recent Submissions
            </h3>
            <p className="text-xs text-drabDark/60">Latest completed participant attempts</p>
          </div>
          <Link
            to="/admin/results"
            className="text-xs font-semibold text-celticBlue hover:underline flex items-center gap-1"
          >
            Full Leaderboard <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-teaGreen-200 text-[11px] uppercase tracking-wider text-drabDark/60">
                <th className="pb-3 font-semibold">Rank</th>
                <th className="pb-3 font-semibold">Participant</th>
                <th className="pb-3 font-semibold">Department</th>
                <th className="pb-3 font-semibold">Score</th>
                <th className="pb-3 font-semibold">Time Taken</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-teaGreen-100">
              {recentSubmissions.map((p) => (
                <tr key={p.id} className="hover:bg-ivory/60 transition-colors">
                  <td className="py-3 font-comfortaa font-bold text-drabDark">
                    #{p.rank}
                  </td>
                  <td className="py-3 font-semibold text-drabDark">
                    {p.name}
                    <span className="block text-[10px] text-drabDark/50 font-normal">
                      {p.registerNumber}
                    </span>
                  </td>
                  <td className="py-3 text-drabDark/70">{p.department}</td>
                  <td className="py-3 font-comfortaa font-bold text-celticBlue">
                    {p.score} / {p.total} ({p.percentage}%)
                  </td>
                  <td className="py-3 font-mono text-drabDark/80">{p.timeFormatted}</td>
                  <td className="py-3">
                    <Badge variant="success" size="sm">
                      {p.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
