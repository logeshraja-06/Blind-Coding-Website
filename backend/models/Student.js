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
      uppercase: true,
      index: true,
      validate: {
        validator: function (v) {
          return /^[0-9A-Za-z]{4,15}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid register number (4-15 alphanumeric chars).`,
      },
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      default: 'Department of Computer Science and Engineering',
      trim: true,
    },
    year: {
      type: String,
      required: [true, 'Academic year is required'],
      enum: {
        values: ['I Year', 'II Year', 'III Year', 'IV Year'],
        message: '{VALUE} is not a valid academic year',
      },
    },
    class: {
      type: String,
      required: [true, 'Class name is required'],
      trim: true,
    },
    section: {
      type: String,
      required: [true, 'Section is required'],
      trim: true,
    },
  },
  { timestamps: true }
);

export const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
