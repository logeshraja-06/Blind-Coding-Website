import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    questionId: {
      type: Number,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      default: 'General Programming',
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    question: {
      type: String,
      required: [true, 'Question text is required'],
    },
    codeSnippet: {
      type: String,
      default: null,
    },
    options: [
      {
        id: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
    correctAnswer: {
      type: String,
      required: [true, 'Correct answer identifier is required'],
      select: true, // Keep secure; student query will explicitly project this out
    },
    explanation: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);
