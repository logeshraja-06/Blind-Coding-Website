import mongoose from 'mongoose';

const eventConfigSchema = new mongoose.Schema(
  {
    eventTitle: {
      type: String,
      default: 'BLIND CODING',
    },
    quizDurationMinutes: {
      type: Number,
      default: 60,
    },
    totalQuestions: {
      type: Number,
      default: 25,
    },
    eventStartAt: {
      type: Date,
      default: null,
    },
    eventEndAt: {
      type: Date,
      default: null,
    },
    quizAvailability: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
    maxActivityWarnings: {
      type: Number,
      default: 3,
    },
    autoSubmitOnWarningLimit: {
      type: Boolean,
      default: true,
    },
    fullscreenRequired: {
      type: Boolean,
      default: true,
    },
    tabSwitchMonitoring: {
      type: Boolean,
      default: true,
    },
    passingPercentage: {
      type: Number,
      default: 50,
    },
    allowAnswerChange: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const EventConfig =
  mongoose.models.EventConfig || mongoose.model('EventConfig', eventConfigSchema);
