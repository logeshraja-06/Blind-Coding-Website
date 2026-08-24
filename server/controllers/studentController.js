import { Student } from '../models/Student.js';
import { QuizAttempt } from '../models/QuizAttempt.js';
import { memoryStore } from '../config/db.js';

// Helper to validate numeric register number
const isValidRegisterNumber = (regNo) => {
  if (!regNo || typeof regNo !== 'string') return false;
  const cleaned = regNo.trim();
  // Allow numeric or standard alphanumeric college roll number (min 4 chars)
  return /^[0-9A-Za-z]{4,15}$/.test(cleaned);
};

export const registerStudent = async (req, res) => {
  try {
    const { name, registerNumber, department, year, className, class: classAlt, section } = req.body;
    const finalClass = className || classAlt;

    if (!name || !registerNumber || !year || !finalClass || !section) {
      return res.status(400).json({
        success: false,
        message: 'All fields are mandatory, including Register Number, Year, Class, and Section.',
      });
    }

    const regNoClean = registerNumber.trim();

    if (!isValidRegisterNumber(regNoClean)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Register Number format. Please enter a valid numeric college register number (e.g. 953710).',
      });
    }

    // Check if attempt already exists in memory or Mongoose
    let existingAttempt = memoryStore.quizAttempts.get(regNoClean);
    let existingStudent = memoryStore.students.get(regNoClean);

    if (existingAttempt) {
      if (existingAttempt.status === 'COMPLETED') {
        return res.status(403).json({
          success: false,
          message: 'You have already completed the Blind Coding challenge. Only one official attempt is permitted.',
          status: 'COMPLETED',
          score: existingAttempt.score,
          total: existingAttempt.totalQuestions,
          submittedAt: existingAttempt.submittedAt,
        });
      }

      if (existingAttempt.status === 'IN_PROGRESS') {
        return res.status(200).json({
          success: true,
          message: 'Active session restored. Continuing your ongoing assessment attempt.',
          student: existingStudent || {
            name: existingAttempt.studentName,
            registerNumber: regNoClean,
            department: existingAttempt.department,
            year: existingAttempt.year,
            class: existingAttempt.class,
            section: existingAttempt.section,
          },
          attempt: existingAttempt,
          isResume: true,
        });
      }
    }

    // Create new student and initial attempt
    const studentRecord = {
      id: `std-${Date.now()}`,
      name: name.trim(),
      registerNumber: regNoClean,
      department: department || 'Department of Computer Science and Engineering',
      year,
      class: finalClass.trim(),
      section: section.trim(),
      createdAt: new Date().toISOString(),
    };

    const newAttempt = {
      id: `attempt-${regNoClean}`,
      studentId: studentRecord.id,
      studentName: studentRecord.name,
      registerNumber: regNoClean,
      department: studentRecord.department,
      year: studentRecord.year,
      class: studentRecord.class,
      section: studentRecord.section,
      answers: {},
      startedAt: null,
      submittedAt: null,
      timeTakenSeconds: null,
      timeFormatted: '--:--',
      score: null,
      totalQuestions: 25,
      percentage: null,
      status: 'NOT_STARTED',
    };

    memoryStore.students.set(regNoClean, studentRecord);
    memoryStore.quizAttempts.set(regNoClean, newAttempt);

    return res.status(201).json({
      success: true,
      message: 'Student registered successfully. Ready to start the Blind Coding challenge.',
      student: studentRecord,
      attempt: newAttempt,
      isResume: false,
    });
  } catch (error) {
    console.error('Error registering student:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while processing student registration.',
    });
  }
};

export const checkRegisterNumber = async (req, res) => {
  try {
    const { registerNumber } = req.params;
    if (!registerNumber) {
      return res.status(400).json({ success: false, message: 'Register Number required.' });
    }

    const regNoClean = registerNumber.trim();
    const attempt = memoryStore.quizAttempts.get(regNoClean);
    const student = memoryStore.students.get(regNoClean);

    if (!attempt) {
      return res.json({
        success: true,
        exists: false,
        status: 'NOT_REGISTERED',
      });
    }

    return res.json({
      success: true,
      exists: true,
      status: attempt.status,
      student,
      attempt: {
        id: attempt.id,
        startedAt: attempt.startedAt,
        status: attempt.status,
        score: attempt.status === 'COMPLETED' ? attempt.score : null,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error checking register number.' });
  }
};
