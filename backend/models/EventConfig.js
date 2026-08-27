import mongoose from 'mongoose';

const eventConfigSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
      default: 'BLIND_CODING_2026',
      index: true,
    },
    eventTitle: {
      type: String,
      default: 'BLIND CODING',
      trim: true,
    },
    quizDurationMinutes: {
      type: Number,
      default: 60,
      min: 1,
      max: 180,
    },
    totalQuestions: {
      type: Number,
      default: 25,
      min: 1,
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
      default: 2,
      min: 1,
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
