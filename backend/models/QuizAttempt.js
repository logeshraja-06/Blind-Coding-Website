import mongoose from 'mongoose';

const quizAttemptSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
      index: true,
    },
    registerNumber: {
      type: String,
      required: true,
      index: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    answers: {
      type: Map,
      of: String, // { "1": "B", "2": "A", ... } where keys are questionIds and values are stable option IDs
      default: {},
    },
    assignedQuestions: [
      {
        questionId: {
          type: mongoose.Schema.Types.Mixed,
          required: true,
        },
        optionOrder: [
          {
            type: String,
          },
        ],
      },
    ],
    startedAt: {
      type: Date,
      default: null,
    },
    submittedAt: {
      type: Date,
      default: null,
    },
    timeTakenSeconds: {
      type: Number,
      default: null,
    },
    timeFormatted: {
      type: String,
      default: '--:--',
    },
    score: {
      type: Number,
      default: null,
    },
    totalQuestions: {
      type: Number,
      default: 25,
    },
    percentage: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      enum: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'],
      default: 'NOT_STARTED',
      index: true,
    },
    // Quiz Activity & Warning System
    tabSwitchCount: {
      type: Number,
      default: 0,
    },
    fullscreenExitCount: {
      type: Number,
      default: 0,
    },
    totalWarnings: {
      type: Number,
      default: 0,
    },
    activityLogs: [
      {
        type: {
          type: String,
          enum: ['TAB_SWITCH', 'FULLSCREEN_EXIT', 'QUIZ_STARTED', 'QUIZ_SUBMITTED'],
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        details: {
          type: String,
          default: '',
        },
      },
    ],
  },
  { timestamps: true }
);

export const QuizAttempt =
  mongoose.models.QuizAttempt || mongoose.model('QuizAttempt', quizAttemptSchema);
