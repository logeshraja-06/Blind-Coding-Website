import React, { useState } from 'react';
import {
  Settings,
  Clock,
  Shield,
  Save,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { useToast } from '../../context/ToastContext';
import { useQuiz } from '../../context/QuizContext';

export const AdminSettings = () => {
  const { addToast } = useToast();
  const { resetQuizState } = useQuiz();

  const [settings, setSettings] = useState({
    eventName: 'BLINDCODE 2026',
    durationMinutes: 60,
    totalQuestions: 25,
    passingPercentage: 50,
    autoSubmitOnTimeout: true,
    allowAnswerChange: true,
    showLeaderboardPublicly: true,
    negativeMarking: false,
  });

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Event settings updated successfully!', 'success', 3000);
  };

  const handleResetDemo = () => {
    if (window.confirm('Reset all demo attempts, participant records, and active sessions in localStorage?')) {
      resetQuizState();
      localStorage.removeItem('blindcode_student');
      localStorage.removeItem('blindcode_submissions');
      addToast('Demo database and localStorage have been reset!', 'info', 4000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Rules Config */}
        <Card variant="default" className="p-6 sm:p-8 border border-teaGreen-300 bg-white">
          <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-teaGreen-200">
            <Clock className="w-5 h-5 text-celticBlue" />
            <div>
              <h3 className="font-comfortaa font-bold text-base text-drabDark">
                Assessment Rules & Timing
              </h3>
              <p className="text-xs text-drabDark/60">Configure round limits and passing criteria</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Event Name"
              value={settings.eventName}
              onChange={(e) => setSettings({ ...settings, eventName: e.target.value })}
            />

            <Input
              label="Assessment Duration (Minutes)"
              type="number"
              value={settings.durationMinutes}
              onChange={(e) => setSettings({ ...settings, durationMinutes: Number(e.target.value) })}
            />

            <Input
              label="Total Questions"
              type="number"
              value={settings.totalQuestions}
              disabled
              helperText="Fixed at 25 curated questions for Round 01"
            />

            <Input
              label="Passing Score Percentage (%)"
              type="number"
              value={settings.passingPercentage}
              onChange={(e) => setSettings({ ...settings, passingPercentage: Number(e.target.value) })}
            />
          </div>
        </Card>

        {/* Security & Integrity Flags */}
        <Card variant="default" className="p-6 sm:p-8 border border-teaGreen-300 bg-white">
          <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-teaGreen-200">
            <Shield className="w-5 h-5 text-teaGreen-600" />
            <div>
              <h3 className="font-comfortaa font-bold text-base text-drabDark">
                Quiz Integrity & Behavior
              </h3>
              <p className="text-xs text-drabDark/60">Toggle assessment security controls</p>
            </div>
          </div>

          <div className="space-y-4 text-xs font-medium text-drabDark">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-ivory border border-teaGreen-200 cursor-pointer">
              <div>
                <span className="font-bold block">Automatic Submission on Timeout</span>
                <span className="text-drabDark/60 text-[11px]">
                  Submits participant answers automatically when 60 minutes expire
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.autoSubmitOnTimeout}
                onChange={(e) => setSettings({ ...settings, autoSubmitOnTimeout: e.target.checked })}
                className="w-4 h-4 text-celticBlue rounded accent-celticBlue"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-ivory border border-teaGreen-200 cursor-pointer">
              <div>
                <span className="font-bold block">Allow Navigating Back & Changing Choices</span>
                <span className="text-drabDark/60 text-[11px]">
                  Participants can use Question Navigator to revisit any item
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.allowAnswerChange}
                onChange={(e) => setSettings({ ...settings, allowAnswerChange: e.target.checked })}
                className="w-4 h-4 text-celticBlue rounded accent-celticBlue"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-ivory border border-teaGreen-200 cursor-pointer">
              <div>
                <span className="font-bold block">Public Leaderboard Access</span>
                <span className="text-drabDark/60 text-[11px]">
                  Allows participants to see top ranks post-submission
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.showLeaderboardPublicly}
                onChange={(e) => setSettings({ ...settings, showLeaderboardPublicly: e.target.checked })}
                className="w-4 h-4 text-celticBlue rounded accent-celticBlue"
              />
            </label>
          </div>

          <div className="pt-6 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              icon={Save}
              iconPosition="left"
              className="font-bold text-xs"
            >
              Save Configuration
            </Button>
          </div>
        </Card>
      </form>

      {/* Danger Zone / Demo Data Reset */}
      <Card variant="ivory" className="p-6 border-2 border-red-200 bg-red-50/40">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-comfortaa font-bold text-sm text-red-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              Demo Data Reset
            </h4>
            <p className="text-xs text-red-700/80 mt-1 max-w-md">
              Clear your current participant session, test answers, and localStorage quiz state to test the student registration flow from scratch.
            </p>
          </div>

          <Button
            variant="danger"
            size="sm"
            onClick={handleResetDemo}
            icon={RotateCcw}
            className="text-xs font-semibold whitespace-nowrap"
          >
            Reset Demo State
          </Button>
        </div>
      </Card>
    </div>
  );
};
