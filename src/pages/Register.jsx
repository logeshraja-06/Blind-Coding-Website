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
  Code2,
  Sparkles,
  Shield
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { FloatingCodeBg } from '../components/common/FloatingCodeBg';
import { PageTransition } from '../components/layout/PageTransition';
import { useQuiz } from '../context/QuizContext';

export const Register = () => {
  const navigate = useNavigate();
  const { registerStudent, participant } = useQuiz();

  const [formData, setFormData] = useState({
    fullName: participant?.name || '',
    department: participant?.department || 'Computer Science & Engineering',
    year: participant?.year || '3rd Year',
    className: participant?.class || 'CSE-A',
    section: participant?.section || 'A',
    registerNumber: participant?.registerNumber !== 'N/A' ? participant?.registerNumber || '' : '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = [
    { value: 'Computer Science & Engineering', label: 'Computer Science & Engineering' },
    { value: 'Information Technology', label: 'Information Technology' },
    { value: 'Artificial Intelligence & Data Science', label: 'Artificial Intelligence & Data Science' },
    { value: 'Electronics & Communication', label: 'Electronics & Communication' },
    { value: 'Electrical & Electronics', label: 'Electrical & Electronics' },
    { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
  ];

  const years = [
    { value: '1st Year', label: '1st Year' },
    { value: '2nd Year', label: '2nd Year' },
    { value: '3rd Year', label: '3rd Year' },
    { value: '4th Year', label: '4th Year' },
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
      errs.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Full name must be at least 2 characters.';
    }

    if (!formData.department) {
      errs.department = 'Please select your department.';
    }

    if (!formData.year) {
      errs.year = 'Please select your academic year.';
    }

    if (!formData.className.trim()) {
      errs.className = 'Please specify your class/batch (e.g. CSE-A).';
    }

    if (!formData.section) {
      errs.section = 'Please select your section.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      registerStudent(formData);
      setTimeout(() => {
        navigate('/welcome');
      }, 400);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <Navbar />

      <main className="flex-1 relative min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-ivory">
        <FloatingCodeBg opacity={0.4} />

        <div className="max-w-xl w-full mx-auto relative z-10">
          {/* Back to Home Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-drabDark/70 hover:text-celticBlue mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Event Home</span>
          </Link>

          <Card
            variant="default"
            className="p-8 sm:p-10 border-2 border-teaGreen-300 shadow-premium bg-white"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teaGreen-100 text-drabDark text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-celticBlue" />
                Participant Check-in
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-comfortaa text-drabDark mb-2">
                Ready to Begin?
              </h1>
              <p className="text-xs sm:text-sm text-drabDark/70 max-w-sm mx-auto">
                Tell us who you are before entering the challenge.
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <Input
                label="Full Name"
                placeholder="e.g. Logeshwaran K"
                required
                icon={User}
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: null });
                }}
                error={errors.fullName}
              />

              {/* Department */}
              <Select
                label="Department"
                required
                options={departments}
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                error={errors.department}
              />

              {/* Year & Section Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Academic Year"
                  required
                  options={years}
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  error={errors.year}
                />

                <Select
                  label="Section"
                  required
                  options={sections}
                  value={formData.section}
                  onChange={(e) =>
                    setFormData({ ...formData, section: e.target.value })
                  }
                  error={errors.section}
                />
              </div>

              {/* Class & Register Number Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Class / Batch"
                  placeholder="e.g. CSE-A"
                  required
                  icon={Layers}
                  value={formData.className}
                  onChange={(e) => {
                    setFormData({ ...formData, className: e.target.value });
                    if (errors.className) setErrors({ ...errors, className: null });
                  }}
                  error={errors.className}
                />

                <Input
                  label="Register Number (Optional)"
                  placeholder="e.g. 717822P145"
                  icon={Hash}
                  value={formData.registerNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, registerNumber: e.target.value })
                  }
                />
              </div>

              {/* Privacy / Event note */}
              <div className="pt-2">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-ivory border border-teaGreen-300 text-xs text-drabDark/80">
                  <Shield className="w-4 h-4 text-celticBlue flex-shrink-0" />
                  <span>Your details will be used for score ranking & certificate generation.</span>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full font-bold shadow-premium"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  CONTINUE
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
};
