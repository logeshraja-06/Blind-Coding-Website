import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  GraduationCap,
  Calendar,
  Layers,
  Hash,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Shield,
  AlertCircle,
  Terminal,
  Lock
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { FloatingCodeBg } from '../components/common/FloatingCodeBg';
import { PageTransition } from '../components/layout/PageTransition';
import { useQuiz } from '../context/QuizContext';
import { useToast } from '../context/ToastContext';
import { TechForceLogo } from '../assets/logo/TechForceLogo';

export const Register = () => {
  const navigate = useNavigate();
  const { registerStudent, participant } = useQuiz();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: participant?.name || '',
    registerNumber: participant?.registerNumber || '',
    department: 'Department of Computer Science and Engineering',
    year: participant?.year || 'IV Year',
    className: participant?.class || 'IV CSE A',
    section: participant?.section || 'A',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [duplicateError, setDuplicateError] = useState(null);
  const [completedRegNo, setCompletedRegNo] = useState(null);

  const years = [
    { value: 'I Year', label: 'I Year (First Year)' },
    { value: 'II Year', label: 'II Year (Second Year)' },
    { value: 'III Year', label: 'III Year (Third Year)' },
    { value: 'IV Year', label: 'IV Year (Final Year)' },
  ];

  const sections = [
    { value: 'A', label: 'Section A' },
    { value: 'B', label: 'Section B' },
    { value: 'C', label: 'Section C' },
    { value: 'D', label: 'Section D' },
  ];

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    }

    if (!formData.registerNumber.trim()) {
      errs.registerNumber = 'Register Number is compulsory.';
    } else if (!/^[0-9A-Za-z]{4,15}$/.test(formData.registerNumber.trim())) {
      errs.registerNumber = 'Please enter a valid numeric college register number (e.g. 953710).';
    }

    if (!formData.year) {
      errs.year = 'Please select your academic year.';
    }

    if (!formData.className.trim()) {
      errs.className = 'Class is required (e.g. CSE).';
    }

    if (!formData.section) {
      errs.section = 'Section is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDuplicateError(null);
    setCompletedRegNo(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await registerStudent(formData);
      if (res.success) {
        addToast(res.message || 'Registration confirmed.', 'success', 3000);
        navigate('/welcome');
      } else {
        setDuplicateError(res.message || 'Registration error.');
        if (res.isAlreadyCompleted || res.status === 'COMPLETED') {
          setCompletedRegNo(res.registerNumber || formData.registerNumber);
        }
        addToast(res.message, 'error', 4000);
      }
    } catch (err) {
      setDuplicateError(err.message || 'You have already completed the Blind Coding challenge.');
      addToast(err.message || 'Participation error.', 'error', 4500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <Navbar />

      <main className="flex-1 relative min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-ivory">
        <FloatingCodeBg opacity={0.45} />

        <div className="max-w-xl w-full mx-auto relative z-10">
          {/* Back Action */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-drabDark/70 hover:text-celticBlue mb-6 transition-colors font-poppins"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Event Overview</span>
          </Link>

          {/* Registration Deck Card */}
          <div className="p-1 rounded-3xl bg-gradient-to-b from-teaGreen-300 via-celticBlue-200 to-vanilla-300 shadow-elevated">
            <div className="p-8 sm:p-10 rounded-[22px] bg-white border border-white">
              {/* Header Badge */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teaGreen-100 border border-teaGreen-300 text-drabDark text-xs font-bold uppercase tracking-wider mb-3">
                  <TechForceLogo className="w-4 h-4" showText={false} />
                  Official Assessment Credentials
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold font-comfortaa text-drabDark mb-2">
                  Candidate Registration
                </h1>
                <p className="text-xs sm:text-sm text-drabDark/70 max-w-sm mx-auto font-poppins">
                  Enter your official student credentials to initialize your individual assessment session.
                </p>
              </div>

              {/* Duplicate / Blocked Warning Notice */}
              {duplicateError && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 text-xs space-y-2">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Attempt Notice</strong>
                      {duplicateError}
                    </div>
                  </div>
                  {completedRegNo && (
                    <div className="pt-2 text-left">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => navigate('/result', { state: { registerNumber: completedRegNo } })}
                        className="text-xs font-bold"
                        icon={ArrowRight}
                        iconPosition="right"
                      >
                        VIEW YOUR RESULT CARD
                      </Button>
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 font-poppins">
                {/* Full Name */}
                <Input
                  label="Candidate Full Name *"
                  placeholder="e.g. S. Logesh Raja"
                  required
                  icon={User}
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: null });
                  }}
                  error={errors.fullName}
                />

                {/* Register Number (Compulsory) */}
                <Input
                  label="College Register Number *"
                  placeholder="Example: 953710"
                  required
                  icon={Hash}
                  value={formData.registerNumber}
                  onChange={(e) => {
                    setFormData({ ...formData, registerNumber: e.target.value });
                    if (errors.registerNumber) setErrors({ ...errors, registerNumber: null });
                  }}
                  error={errors.registerNumber}
                  helperText="Your official register number will be bound to your single assessment attempt."
                />

                {/* Department (Pre-set to CSE) */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-drabDark/80 mb-1.5 font-poppins">
                    Department
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      disabled
                      value="Department of Computer Science and Engineering"
                      className="w-full bg-ivory text-drabDark/80 border border-teaGreen-300 rounded-xl px-4 py-2.5 text-xs font-semibold cursor-not-allowed font-poppins"
                    />
                    <Lock className="w-3.5 h-3.5 text-drabDark/40 absolute right-3.5 top-3" />
                  </div>
                </div>

                {/* Year & Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Academic Year *"
                    required
                    options={years}
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    error={errors.year}
                  />

                  <Select
                    label="Section *"
                    required
                    options={sections}
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    error={errors.section}
                  />
                </div>

                {/* Class */}
                <Input
                  label="Class *"
                  placeholder="e.g. CSE"
                  required
                  icon={Layers}
                  value={formData.className}
                  onChange={(e) => {
                    setFormData({ ...formData, className: e.target.value });
                    if (errors.className) setErrors({ ...errors, className: null });
                  }}
                  error={errors.className}
                />

                <div className="pt-2">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-ivory border border-teaGreen-300 text-xs text-drabDark/80 font-poppins">
                    <Shield className="w-4 h-4 text-celticBlue flex-shrink-0" />
                    <span>Single official attempt per student. Real-time activity telemetry is enabled.</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full font-bold shadow-premium font-poppins"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    CONTINUE TO PRE-FLIGHT BRIEFING
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
};
