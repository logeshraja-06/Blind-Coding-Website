import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { CheckCircle2, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';

export const SubmitModal = ({
  isOpen,
  onClose,
  onSubmit,
  answeredCount,
  unansweredCount,
  totalQuestions,
  isSubmitting = false,
}) => {
  const hasUnanswered = unansweredCount > 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ready to Submit?"
      subtitle="Verify your status before completing your attempt"
      maxWidth="max-w-md"
    >
      <div className="space-y-5">
        {/* Status Summary Box */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-teaGreen-50 border border-teaGreen-300 text-center">
            <div className="flex items-center justify-center gap-1.5 text-drabDark mb-1">
              <CheckCircle2 className="w-4 h-4 text-drabDark" />
              <span className="text-xs font-semibold uppercase">Answered</span>
            </div>
            <span className="text-2xl font-bold font-comfortaa text-drabDark">
              {answeredCount} <span className="text-xs text-drabDark/60 font-poppins">/ {totalQuestions}</span>
            </span>
          </div>

          <div
            className={`p-4 rounded-2xl border text-center ${
              hasUnanswered
                ? 'bg-vanilla-50 border-vanilla-300'
                : 'bg-white border-teaGreen-200'
            }`}
          >
            <div className="flex items-center justify-center gap-1.5 text-drabDark mb-1">
              <HelpCircle className="w-4 h-4 text-drabDark/60" />
              <span className="text-xs font-semibold uppercase">Unanswered</span>
            </div>
            <span
              className={`text-2xl font-bold font-comfortaa ${
                hasUnanswered ? 'text-drabDark font-bold' : 'text-drabDark/60'
              }`}
            >
              {unansweredCount}
            </span>
          </div>
        </div>

        {/* Warning Note */}
        {hasUnanswered ? (
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-vanilla-100/70 border border-vanilla-300 text-drabDark text-xs leading-relaxed">
            <AlertCircle className="w-4 h-4 text-drabDark flex-shrink-0 mt-0.5" />
            <p>
              You still have <strong>{unansweredCount}</strong> unanswered {unansweredCount === 1 ? 'question' : 'questions'}. Unanswered questions will receive 0 marks.
            </p>
          </div>
        ) : (
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-teaGreen-100/60 border border-teaGreen-300 text-drabDark text-xs leading-relaxed">
            <CheckCircle2 className="w-4 h-4 text-drabDark flex-shrink-0 mt-0.5" />
            <p>
              All 25 questions have been answered. You can proceed with final submission.
            </p>
          </div>
        )}

        <p className="text-xs text-drabDark/60 text-center">
          Note: Once submitted, your answers are locked and cannot be modified.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 justify-center"
            disabled={isSubmitting}
          >
            CONTINUE QUIZ
          </Button>
          <Button
            variant="primary"
            onClick={onSubmit}
            isLoading={isSubmitting}
            className="flex-1 justify-center font-bold"
            icon={ArrowRight}
            iconPosition="right"
          >
            SUBMIT NOW
          </Button>
        </div>
      </div>
    </Modal>
  );
};
