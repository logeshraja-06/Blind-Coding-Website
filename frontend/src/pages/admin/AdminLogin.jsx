import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ShieldCheck, ArrowRight, ArrowLeft, KeyRound, Terminal } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { FloatingCodeBg } from '../../components/common/FloatingCodeBg';
import { PageTransition } from '../../components/layout/PageTransition';
import { useAuth } from '../../context/AuthContext';
import { TechForceLogo } from '../../assets/logo/TechForceLogo';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('admin@cse.techforce.edu');
  const [password, setPassword] = useState('Admin@2026');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/admin');
      } else {
        setError(res.message || 'Invalid administrator credentials.');
      }
    } catch (err) {
      setError('Unable to authenticate administrator.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-ivory flex items-center justify-center p-4 sm:p-6 relative font-poppins">
        <FloatingCodeBg opacity={0.4} />

        <div className="max-w-md w-full relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-drabDark/70 hover:text-celticBlue mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public Event Site</span>
          </Link>

          <div className="p-1 rounded-3xl bg-gradient-to-b from-teaGreen-300 via-celticBlue-200 to-vanilla-300 shadow-elevated">
            <div className="p-8 sm:p-10 rounded-[22px] bg-white border border-white">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-3">
                  <TechForceLogo className="w-12 h-12" showText={false} />
                </div>
                <h1 className="text-2xl font-bold font-comfortaa text-drabDark">
                  CONVENOR CONSOLE
                </h1>
                <p className="text-xs text-drabDark/60 mt-1">
                  TECH FORCE • Department of CSE • AY 2025–2026
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Official Admin Email"
                  type="email"
                  required
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  label="Authentication Key / Password"
                  type="password"
                  required
                  icon={KeyRound}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* Institutional Access Advisory */}
                <div className="p-3 rounded-xl bg-ivory border border-teaGreen-300 text-[11px] text-drabDark/70 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-celticBlue flex-shrink-0 mt-0.5" />
                  <span>
                    Restricted console. Authorized Department Faculty Coordinators and Event Convenors only.
                  </span>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isLoading}
                    className="w-full font-bold shadow-premium"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    AUTHENTICATE & ENTER
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};
