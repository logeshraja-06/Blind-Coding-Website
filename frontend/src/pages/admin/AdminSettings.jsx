import React, { useState, useEffect } from 'react';
import {
  Settings,
  Clock,
  Shield,
  Save,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Layers,
  Calendar,
  Eye,
  Maximize2
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { useQuiz } from '../../context/QuizContext';
import { api } from '../../services/api';

export const AdminSettings = () => {
  const { adminToken } = useAuth();
  const { addToast } = useToast();
  const { resetQuizState } = useQuiz();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    eventTitle: 'BLIND CODING',
    quizDurationMinutes: 60,
    totalQuestions: 25,
    passingPercentage: 50,
    eventStartAt: '',
    eventEndAt: '',
    quizAvailability: 'ACTIVE',
    maxActivityWarnings: 2,
    autoSubmitOnWarningLimit: true,
    fullscreenRequired: true,
    tabSwitchMonitoring: true,
    allowAnswerChange: true,
  });

  // Fetch real Event Configuration from backend
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const res = await api.getAdminSettings(adminToken);
        if (res && res.success && res.config) {
          setSettings({
            eventTitle: res.config.eventTitle || 'BLIND CODING',
            quizDurationMinutes: res.config.quizDurationMinutes || 60,
            totalQuestions: res.config.totalQuestions || 25,
            passingPercentage: res.config.passingPercentage || 50,
            eventStartAt: res.config.eventStartAt ? new Date(res.config.eventStartAt).toISOString().slice(0, 16) : '',
            eventEndAt: res.config.eventEndAt ? new Date(res.config.eventEndAt).toISOString().slice(0, 16) : '',
            quizAvailability: res.config.quizAvailability || 'ACTIVE',
            maxActivityWarnings: res.config.maxActivityWarnings || 2,
            autoSubmitOnWarningLimit: res.config.autoSubmitOnWarningLimit !== false,
            fullscreenRequired: res.config.fullscreenRequired !== false,
            tabSwitchMonitoring: res.config.tabSwitchMonitoring !== false,
            allowAnswerChange: res.config.allowAnswerChange !== false,
          });
        }
      } catch (err) {
        addToast('Failed to load event configuration.', 'error', 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [adminToken]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...settings,
        eventStartAt: settings.eventStartAt ? new Date(settings.eventStartAt).toISOString() : null,
        eventEndAt: settings.eventEndAt ? new Date(settings.eventEndAt).toISOString() : null,
      };

      const res = await api.updateAdminSettings(adminToken, payload);
      if (res && res.success) {
        addToast('Event configuration saved to server!', 'success', 3500);
      } else {
        addToast(res?.message || 'Failed to save configuration.', 'error', 4000);
      }
    } catch (err) {
      addToast('Network error saving configuration.', 'error', 4000);
    } finally {
      setSaving(false);
    }
  };

  const handleResetDemo = () => {
    if (window.confirm('Reset all demo attempts, participant records, and active sessions in localStorage?')) {
      resetQuizState();
      localStorage.removeItem('blindcode_student');
      localStorage.removeItem('blindcode_submissions');
      addToast('Demo database and localStorage have been reset!', 'info', 4000);
    }
  };

  const availabilityOptions = [
    { value: 'ACTIVE', label: 'ACTIVE — Open for assessment' },
    { value: 'INACTIVE', label: 'INACTIVE — Assessment locked' },
  ];

  return (
    <div className="space-y-8 max-w-4xl font-poppins">
      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Rules & Availability Config */}
        <Card variant="default" className="p-6 sm:p-8 border border-teaGreen-300 bg-white shadow-subtle">
          <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-teaGreen-200">
            <Clock className="w-5 h-5 text-celticBlue" />
            <div>
              <h3 className="font-comfortaa font-bold text-base text-drabDark">
                Assessment Schedule & Availability
              </h3>
              <p className="text-xs text-drabDark/60">Configure round timing, availability window, and limits</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Event Title"
              value={settings.eventTitle}
              onChange={(e) => setSettings({ ...settings, eventTitle: e.target.value })}
            />

            <Select
              label="Quiz Availability Status"
              options={availabilityOptions}
              value={settings.quizAvailability}
              onChange={(e) => setSettings({ ...settings, quizAvailability: e.target.value })}
            />

            <Input
              label="Assessment Duration (Minutes)"
              type="number"
              value={settings.quizDurationMinutes}
              onChange={(e) => setSettings({ ...settings, quizDurationMinutes: Number(e.target.value) })}
            />

            <Input
              label="Total Questions"
              type="number"
              value={settings.totalQuestions}
              onChange={(e) => setSettings({ ...settings, totalQuestions: Number(e.target.value) })}
              helperText="Questions served from the question bank"
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-drabDark/80 mb-1.5 font-poppins">
                Event Start Date & Time (Optional)
              </label>
              <input
                type="datetime-local"
                value={settings.eventStartAt}
                onChange={(e) => setSettings({ ...settings, eventStartAt: e.target.value })}
                className="w-full bg-ivory text-drabDark border border-teaGreen-300 rounded-xl px-4 py-2 text-xs font-medium focus:ring-2 focus:ring-celticBlue outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-drabDark/80 mb-1.5 font-poppins">
                Event End Date & Time (Optional)
              </label>
              <input
                type="datetime-local"
                value={settings.eventEndAt}
                onChange={(e) => setSettings({ ...settings, eventEndAt: e.target.value })}
                className="w-full bg-ivory text-drabDark border border-teaGreen-300 rounded-xl px-4 py-2 text-xs font-medium focus:ring-2 focus:ring-celticBlue outline-none"
              />
            </div>
          </div>
        </Card>

        {/* Security, Fullscreen & Activity Monitoring Flags */}
        <Card variant="default" className="p-6 sm:p-8 border border-teaGreen-300 bg-white shadow-subtle">
          <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-teaGreen-200">
            <Shield className="w-5 h-5 text-teaGreen-600" />
            <div>
              <h3 className="font-comfortaa font-bold text-base text-drabDark">
                Quiz Activity & Integrity Controls
              </h3>
              <p className="text-xs text-drabDark/60">Configure browser monitoring, warning limits, and lockdown settings</p>
            </div>
          </div>

          <div className="space-y-4 text-xs font-medium text-drabDark">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
              <Input
                label="Maximum Activity Warnings Limit"
                type="number"
                value={settings.maxActivityWarnings}
                onChange={(e) => setSettings({ ...settings, maxActivityWarnings: Number(e.target.value) })}
                helperText="Auto-submits assessment once warning count reaches this value"
              />

              <Input
                label="Passing Score Percentage (%)"
                type="number"
                value={settings.passingPercentage}
                onChange={(e) => setSettings({ ...settings, passingPercentage: Number(e.target.value) })}
              />
            </div>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-ivory border border-teaGreen-200 cursor-pointer">
              <div>
                <span className="font-bold block">Mandatory Fullscreen Mode</span>
                <span className="text-drabDark/60 text-[11px]">
                  Requests fullscreen on launch and warns candidate if fullscreen is exited
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.fullscreenRequired}
                onChange={(e) => setSettings({ ...settings, fullscreenRequired: e.target.checked })}
                className="w-4 h-4 text-celticBlue rounded accent-celticBlue"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-ivory border border-teaGreen-200 cursor-pointer">
              <div>
                <span className="font-bold block">Tab Switch & Window Blur Monitoring</span>
                <span className="text-drabDark/60 text-[11px]">
                  Detects and logs Page Visibility changes and window focus loss
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.tabSwitchMonitoring}
                onChange={(e) => setSettings({ ...settings, tabSwitchMonitoring: e.target.checked })}
                className="w-4 h-4 text-celticBlue rounded accent-celticBlue"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-ivory border border-teaGreen-200 cursor-pointer">
              <div>
                <span className="font-bold block">Auto-Submit when Warning Limit is Reached</span>
                <span className="text-drabDark/60 text-[11px]">
                  Locks interface and auto-submits quiz if total warnings exceed limit
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.autoSubmitOnWarningLimit}
                onChange={(e) => setSettings({ ...settings, autoSubmitOnWarningLimit: e.target.checked })}
                className="w-4 h-4 text-celticBlue rounded accent-celticBlue"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-ivory border border-teaGreen-200 cursor-pointer">
              <div>
                <span className="font-bold block">Allow Navigating Back & Changing Choices</span>
                <span className="text-drabDark/60 text-[11px]">
                  Participants can use Question Navigator to revisit any question
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.allowAnswerChange}
                onChange={(e) => setSettings({ ...settings, allowAnswerChange: e.target.checked })}
                className="w-4 h-4 text-celticBlue rounded accent-celticBlue"
              />
            </label>
          </div>

          <div className="pt-6 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              isLoading={saving}
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
