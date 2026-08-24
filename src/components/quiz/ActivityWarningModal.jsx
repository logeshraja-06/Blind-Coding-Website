import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Maximize2, ShieldAlert, Clock, AlertOctagon } from 'lucide-react';
import { Button } from '../ui/Button';

export const ActivityWarningModal = ({
  isOpen,
  type, // 'FULLSCREEN_EXIT' | 'TAB_SWITCH' | 'LIMIT_REACHED'
  currentWarning = 1,
  maxWarnings = 3,
  countdown = 3,
  onAcknowledge,
  onReturnFullscreen,
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
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border-2 border-vanilla-400 shadow-2xl z-10 text-center font-poppins"
        >
          {/* Top Warning Icon */}
          <div className="mx-auto w-14 h-14 rounded-2xl bg-vanilla text-drabDark flex items-center justify-center mb-4 shadow-sm">
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
          <p className="text-xs sm:text-sm text-drabDark/80 leading-relaxed mb-6">
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
          <div className="p-3.5 rounded-2xl bg-ivory border border-teaGreen-300 mb-6 flex items-center justify-between text-xs">
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

          {/* Action / Auto-submit Countdown */}
          {isLimitReached ? (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 animate-spin text-red-600" />
              <span>Submitting quiz in {countdown} seconds...</span>
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

          {/* Browser Note */}
          <p className="text-[10px] text-drabDark/50 mt-4 leading-normal">
            Quiz Activity Monitoring active • Institutional integrity protocol
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
