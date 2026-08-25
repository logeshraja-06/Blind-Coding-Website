import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    registerNumber: {
      type: String,
      required: [true, 'Register number is compulsory'],
      unique: true,
      trim: true,
      index: true,
    },
    department: {
      type: String,
      required: true,
      default: 'Computer Science and Engineering',
    },
    year: {
      type: String,
      required: true,
      enum: ['I Year', 'II Year', 'III Year', 'IV Year'],
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
  },
  { timestamps: true }
);

export const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
