import mongoose from 'mongoose';

const optionSubSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      enum: ['A', 'B', 'C', 'D'],
    },
    optionId: {
      type: String,
      default: function () {
        return this.id;
      },
    },
    text: {
      type: String,
      required: [true, 'Option text is required'],
      trim: true,
    },
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    questionId: {
      type: Number,
      required: [true, 'questionId is required'],
      unique: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Question category is required'],
      default: 'General Programming',
      trim: true,
    },
    difficulty: {
      type: String,
      enum: {
        values: ['Easy', 'Medium', 'Hard'],
        message: '{VALUE} is not a valid difficulty',
      },
      default: 'Medium',
    },
    question: {
      type: String,
      required: [true, 'Question text is required'],
      trim: true,
    },
    questionText: {
      type: String,
      default: function () {
        return this.question;
      },
    },
    codeSnippet: {
      type: String,
      default: null,
    },
    options: {
      type: [optionSubSchema],
      required: true,
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length === 4;
        },
        message: 'A question must have exactly four options (A, B, C, D).',
      },
    },
    correctAnswer: {
      type: String,
      required: [true, 'Correct answer identifier is required'],
      enum: {
        values: ['A', 'B', 'C', 'D'],
        message: 'Correct answer must be one of A, B, C, or D.',
      },
    },
    correctOptionId: {
      type: String,
      default: function () {
        return this.correctAnswer;
      },
    },
    explanation: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
);

// Virtual getters for flexible access
questionSchema.virtual('displayQuestion').get(function () {
  return this.questionText || this.question;
});

export const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);
