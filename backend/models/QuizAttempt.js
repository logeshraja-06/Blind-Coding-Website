import mongoose from 'mongoose';

const assignedQuestionSchema = new mongoose.Schema(
  {
    questionId: {
      type: Number,
      required: true,
    },
    optionOrder: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length === 4;
        },
        message: 'Assigned option order must contain exactly 4 option keys.',
      },
    },
  },
  { _id: false }
);

const activityLogSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: {
        values: ['TAB_SWITCH', 'FULLSCREEN_EXIT', 'QUIZ_STARTED', 'QUIZ_SUBMITTED'],
        message: '{VALUE} is not a valid activity type',
      },
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    details: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { _id: false }
);

const quizAttemptSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student ID reference is required'],
      index: true,
    },
    eventId: {
      type: String,
      required: [true, 'Event ID is required'],
      default: 'BLIND_CODING_2026',
      index: true,
    },
    registerNumber: {
      type: String,
      required: [true, 'Register number is required'],
      trim: true,
      uppercase: true,
      index: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
      trim: true,
    },
    section: {
      type: String,
      required: true,
      trim: true,
    },
    // Map of questionId -> selectedOptionId ('A', 'B', 'C', 'D')
    answers: {
      type: Map,
      of: String,
      default: {},
    },
    // Detailed list of calculated answer records for admin verification
    answerDetails: [
      {
        questionId: { type: Number, required: true },
        selectedOptionId: { type: String, default: null },
        isCorrect: { type: Boolean, default: false },
        answeredAt: { type: Date, default: null },
      },
    ],
    assignedQuestions: {
      type: [assignedQuestionSchema],
      default: [],
    },
    startedAt: {
      type: Date,
      default: null,
    },
    expiresAt: {
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
      enum: {
        values: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'],
        message: '{VALUE} is not a valid quiz status',
      },
      default: 'NOT_STARTED',
      index: true,
    },
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
    activityLogs: {
      type: [activityLogSchema],
      default: [],
    },
  },
  { timestamps: true }
);

// Database-level constraint: Unique attempt per student per event
quizAttemptSchema.index({ studentId: 1, eventId: 1 }, { unique: true });
quizAttemptSchema.index({ registerNumber: 1, eventId: 1 });

export const QuizAttempt =
  mongoose.models.QuizAttempt || mongoose.model('QuizAttempt', quizAttemptSchema);
