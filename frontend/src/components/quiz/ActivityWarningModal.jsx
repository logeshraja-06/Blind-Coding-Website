import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Maximize2,
  AlertOctagon,
  Loader2,
  CheckCircle2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { Button } from '../ui/Button';

export const ActivityWarningModal = ({
  isOpen,
  type = 'TAB_SWITCH', // 'FULLSCREEN_EXIT' | 'TAB_SWITCH' | 'LIMIT_REACHED'
  currentWarning = 1,
  maxWarnings = 2,
  status = 'idle', // 'idle' | 'submitting' | 'success' | 'error'
  error = null,
  onAcknowledge,
  onReturnFullscreen,
  onRetrySubmit,
}) => {
  if (!isOpen) return null;

  const isLimitReached = type === 'LIMIT_REACHED' || currentWarning >= maxWarnings;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-drabDark/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border-2 border-vanilla-400 shadow-2xl z-10 text-center font-poppins"
        >
          {/* Top Warning Icon */}
          <div
            className={`mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-sm ${
              isLimitReached
                ? 'bg-red-100 text-red-600'
                : 'bg-vanilla text-drabDark'
            }`}
          >
            {isLimitReached ? (
              <AlertOctagon className="w-7 h-7 text-red-600 animate-pulse" />
            ) : type === 'FULLSCREEN_EXIT' ? (
              <Maximize2 className="w-7 h-7 text-drabDark" />
            ) : (
              <AlertTriangle className="w-7 h-7 text-drabDark" />
            )}
          </div>

          {/* Title */}
          <h3 className="font-comfortaa font-bold text-xl sm:text-2xl text-drabDark mb-2">
            {isLimitReached
              ? '⚠️ WARNING LIMIT REACHED'
              : type === 'FULLSCREEN_EXIT'
              ? '⚠️ FULLSCREEN EXIT DETECTED'
              : '⚠️ TAB SWITCH DETECTED'}
          </h3>

          {/* Body Text */}
          <p className="text-xs sm:text-sm text-drabDark/80 leading-relaxed mb-5">
            {isLimitReached ? (
              <>
                The maximum allowed activity warnings (<strong>{maxWarnings}</strong>) have been reached. Your quiz is being submitted automatically.
              </>
            ) : type === 'FULLSCREEN_EXIT' ? (
              'For a fair quiz experience, please continue in fullscreen mode.'
            ) : (
              'This activity has been recorded. Please stay on the assessment tab.'
            )}
          </p>

          {/* Warning Counter Badge */}
          <div className="p-3.5 rounded-2xl bg-ivory border border-teaGreen-300 mb-5 flex items-center justify-between text-xs">
            <span className="font-bold text-drabDark">Activity Warnings</span>
            <span
              className={`font-comfortaa font-bold px-3 py-1 rounded-full border ${
                isLimitReached
                  ? 'bg-red-100 text-red-700 border-red-300'
                  : 'bg-vanilla text-drabDark border-vanilla-400'
              }`}
            >
              Warning: {Math.min(currentWarning, maxWarnings)} / {maxWarnings}
            </span>
          </div>

          {/* Action Area for Limit Reached vs Single Warning */}
          {isLimitReached ? (
            <div className="space-y-3">
              {status === 'submitting' && (
                <div className="p-4 rounded-2xl bg-vanilla-100 border border-vanilla-300 text-xs font-bold text-drabDark flex items-center justify-center gap-2.5 shadow-sm">
                  <Loader2 className="w-5 h-5 animate-spin text-celticBlue" />
                  <span>Submitting your saved answers...</span>
                </div>
              )}

              {status === 'success' && (
                <div className="p-4 rounded-2xl bg-teaGreen-100 border border-teaGreen-300 text-xs font-bold text-teaGreen-800 flex items-center justify-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-teaGreen-600" />
                  <span>Submission confirmed! Navigating to results...</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 space-y-3">
                  <div className="flex items-center justify-center gap-2 font-bold">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span>Connection interrupted during submission</span>
                  </div>
                  <p className="text-[11px] text-red-600/90 leading-relaxed">
                    {error || 'Your answers remain safely saved locally. Click below to retry submission.'}
                  </p>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={onRetrySubmit}
                    icon={RefreshCw}
                    className="w-full font-bold shadow-md bg-red-600 hover:bg-red-700 text-white"
                  >
                    RETRY SUBMISSION NOW
                  </Button>
                </div>
              )}

              {/* Fallback if status is idle before submit initiates */}
              {status === 'idle' && (
                <div className="p-4 rounded-2xl bg-vanilla-100 border border-vanilla-300 text-xs font-bold text-drabDark flex items-center justify-center gap-2.5 shadow-sm">
                  <Loader2 className="w-5 h-5 animate-spin text-celticBlue" />
                  <span>Submitting your saved answers...</span>
                </div>
              )}
            </div>
          ) : type === 'FULLSCREEN_EXIT' ? (
            <Button
              variant="primary"
              size="lg"
              onClick={onReturnFullscreen}
              icon={Maximize2}
              iconPosition="right"
              className="w-full font-bold shadow-md"
            >
              RETURN TO FULLSCREEN
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={onAcknowledge}
              className="w-full font-bold shadow-md"
            >
              CONTINUE ASSESSMENT
            </Button>
          )}

          {/* Institutional Note */}
          <p className="text-[10px] text-drabDark/50 mt-4 leading-normal">
            Institutional Exam Security Protocol • CSE Association & CSI Chapter
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
