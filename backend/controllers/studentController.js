import { Student } from '../models/Student.js';
import { QuizAttempt } from '../models/QuizAttempt.js';

// Helper to validate numeric/alphanumeric college register number
const isValidRegisterNumber = (regNo) => {
  if (!regNo || typeof regNo !== 'string') return false;
  const cleaned = regNo.trim();
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

    const regNoClean = registerNumber.trim().toUpperCase();

    if (!isValidRegisterNumber(regNoClean)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Register Number format. Please enter a valid college register number (e.g. 953710).',
      });
    }

    const eventId = 'BLIND_CODING_2026';

    // Check existing attempt in MongoDB
    const existingAttempt = await QuizAttempt.findOne({ registerNumber: regNoClean, eventId });
    const existingStudent = await Student.findOne({ registerNumber: regNoClean });

    if (existingAttempt) {
      if (existingAttempt.status === 'COMPLETED') {
        return res.status(200).json({
          success: false,
          isAlreadyCompleted: true,
          message: 'You have already completed the Blind Coding challenge. Only one official attempt is permitted.',
          status: 'COMPLETED',
          registerNumber: regNoClean,
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

      // If existing attempt is NOT_STARTED, return it cleanly
      return res.status(200).json({
        success: true,
        message: 'Registration confirmed. Ready to start the Blind Coding challenge.',
        student: existingStudent || {
          name: existingAttempt.studentName,
          registerNumber: regNoClean,
          department: existingAttempt.department,
          year: existingAttempt.year,
          class: existingAttempt.class,
          section: existingAttempt.section,
        },
        attempt: existingAttempt,
        isResume: false,
      });
    }

    // Persist Student Document in MongoDB
    let student = existingStudent;
    if (!student) {
      student = await Student.create({
        name: name.trim(),
        registerNumber: regNoClean,
        department: department?.trim() || 'Department of Computer Science and Engineering',
        year,
        class: finalClass.trim(),
        section: section.trim(),
      });
    }

    // Persist QuizAttempt Document in MongoDB
    const newAttempt = await QuizAttempt.create({
      studentId: student._id,
      eventId,
      registerNumber: regNoClean,
      studentName: student.name,
      department: student.department,
      year: student.year,
      class: student.class,
      section: student.section,
      answers: {},
      assignedQuestions: [],
      startedAt: null,
      expiresAt: null,
      submittedAt: null,
      timeTakenSeconds: null,
      timeFormatted: '--:--',
      score: null,
      totalQuestions: 25,
      percentage: null,
      status: 'NOT_STARTED',
      tabSwitchCount: 0,
      fullscreenExitCount: 0,
      totalWarnings: 0,
      activityLogs: [],
    });

    return res.status(201).json({
      success: true,
      message: 'Student registered successfully in MongoDB. Ready to start the challenge.',
      student: {
        id: student._id,
        name: student.name,
        registerNumber: student.registerNumber,
        department: student.department,
        year: student.year,
        class: student.class,
        section: student.section,
      },
      attempt: newAttempt,
      isResume: false,
    });
  } catch (error) {
    console.error('Error registering student in MongoDB:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error while processing student registration.',
    });
  }
};

export const checkRegisterNumber = async (req, res) => {
  try {
    const { registerNumber } = req.params;
    if (!registerNumber) {
      return res.status(400).json({ success: false, message: 'Register Number required.' });
    }

    const regNoClean = registerNumber.trim().toUpperCase();
    const eventId = 'BLIND_CODING_2026';

    const [attempt, student] = await Promise.all([
      QuizAttempt.findOne({ registerNumber: regNoClean, eventId }),
      Student.findOne({ registerNumber: regNoClean }),
    ]);

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
      student: student || {
        name: attempt.studentName,
        registerNumber: attempt.registerNumber,
        department: attempt.department,
        year: attempt.year,
        class: attempt.class,
        section: attempt.section,
      },
      attempt: {
        id: attempt._id,
        startedAt: attempt.startedAt,
        status: attempt.status,
        score: attempt.status === 'COMPLETED' ? attempt.score : null,
      },
    });
  } catch (error) {
    console.error('Server error checking register number:', error);
    return res.status(500).json({ success: false, message: 'Server error checking register number.' });
  }
};
