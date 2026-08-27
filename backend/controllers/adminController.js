import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { Question } from '../models/Question.js';
import { QuizAttempt } from '../models/QuizAttempt.js';
import { EventConfig } from '../models/EventConfig.js';
import { getActiveConfig } from './quizController.js';

const JWT_SECRET = process.env.JWT_SECRET || 'TECH_FORCE_BLIND_CODING_2026_SECRET_KEY';

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const emailClean = email.trim().toLowerCase();
    const admin = await Admin.findOne({ email: emailClean });

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Administrator account not found.' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role || 'EVENT_ADMIN',
      },
      JWT_SECRET,
      { expiresIn: '12h' }
    );

    return res.json({
      success: true,
      message: 'Admin authentication successful.',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role || 'EVENT_ADMIN',
      },
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    return res.status(500).json({ success: false, message: 'Admin login processing error.' });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const eventId = 'BLIND_CODING_2026';

    const [totalRegistered, completedAttempts, inProgressCount, totalWarningsResult, yearAgg] =
      await Promise.all([
        QuizAttempt.countDocuments({ eventId }),
        QuizAttempt.find({ eventId, status: 'COMPLETED' }, 'score'),
        QuizAttempt.countDocuments({ eventId, status: 'IN_PROGRESS' }),
        QuizAttempt.aggregate([
          { $match: { eventId } },
          { $group: { _id: null, total: { $sum: '$totalWarnings' } } },
        ]),
        QuizAttempt.aggregate([
          { $match: { eventId } },
          { $group: { _id: '$year', count: { $sum: 1 } } },
        ]),
      ]);

    const completedCount = completedAttempts.length;
    const totalScore = completedAttempts.reduce((acc, curr) => acc + (curr.score || 0), 0);
    const averageScore =
      completedCount > 0 ? Math.round((totalScore / (completedCount * 25)) * 100) : 0;

    const totalActivityWarnings =
      totalWarningsResult.length > 0 ? totalWarningsResult[0].total : 0;

    const yearStats = {
      'IV Year': 0,
      'III Year': 0,
      'II Year': 0,
      'I Year': 0,
    };
    yearAgg.forEach((y) => {
      if (y._id && yearStats[y._id] !== undefined) {
        yearStats[y._id] = y.count;
      }
    });

    return res.json({
      success: true,
      stats: {
        totalRegistered,
        quizCompleted: completedCount,
        inProgress: inProgressCount,
        averageScore,
        totalActivityWarnings,
        yearStats,
      },
    });
  } catch (error) {
    console.error('Failed to fetch admin stats from MongoDB:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch admin stats.' });
  }
};

export const getParticipants = async (req, res) => {
  try {
    const { search = '', year = 'ALL', status = 'ALL', page = 1, limit = 50 } = req.query;
    const eventId = 'BLIND_CODING_2026';
    const query = { eventId };

    if (year !== 'ALL') {
      query.year = year;
    }

    if (status !== 'ALL') {
      const s = status.toUpperCase();
      if (s === 'COMPLETED') query.status = 'COMPLETED';
      else if (s === 'IN PROGRESS' || s === 'IN_PROGRESS') query.status = 'IN_PROGRESS';
      else if (s === 'NOT STARTED' || s === 'NOT_STARTED') query.status = 'NOT_STARTED';
    }

    if (search) {
      const qRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { studentName: qRegex },
        { registerNumber: qRegex },
        { class: qRegex },
        { department: qRegex },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 50;
    const skip = (pageNum - 1) * limitNum;

    const [total, attempts] = await Promise.all([
      QuizAttempt.countDocuments(query),
      QuizAttempt.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    ]);

    const participants = attempts.map((a) => ({
      id: a._id,
      name: a.studentName,
      registerNumber: a.registerNumber,
      department: a.department,
      year: a.year,
      class: a.class,
      section: a.section,
      score: a.score,
      total: a.totalQuestions || 25,
      percentage: a.percentage,
      timeFormatted: a.timeFormatted || '--:--',
      timeTakenSeconds: a.timeTakenSeconds,
      tabSwitchCount: a.tabSwitchCount || 0,
      fullscreenExitCount: a.fullscreenExitCount || 0,
      totalWarnings: a.totalWarnings || 0,
      status:
        a.status === 'COMPLETED'
          ? 'Completed'
          : a.status === 'IN_PROGRESS'
          ? 'In Progress'
          : 'Not Started',
      submittedAt: a.submittedAt,
    }));

    return res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      participants,
    });
  } catch (error) {
    console.error('Failed to query participants from MongoDB:', error);
    return res.status(500).json({ success: false, message: 'Failed to query participants.' });
  }
};

// Admin-Only Quiz Activity Log Monitor
export const getAdminActivity = async (req, res) => {
  try {
    const config = await getActiveConfig();
    const eventId = 'BLIND_CODING_2026';

    const attemptsDoc = await QuizAttempt.find({ eventId }).sort({ updatedAt: -1 });

    const attempts = attemptsDoc.map((a) => {
      const logs = a.activityLogs || [];
      const latestLog = logs.length > 0 ? logs[logs.length - 1] : null;

      return {
        id: a._id,
        name: a.studentName,
        registerNumber: a.registerNumber,
        department: a.department,
        year: a.year,
        class: a.class,
        status:
          a.status === 'COMPLETED'
            ? 'Completed'
            : a.status === 'IN_PROGRESS'
            ? 'In Progress'
            : 'Not Started',
        tabSwitchCount: a.tabSwitchCount || 0,
        fullscreenExitCount: a.fullscreenExitCount || 0,
        totalWarnings: a.totalWarnings || 0,
        maxWarnings: config.maxActivityWarnings || 2,
        warningLimitReached: (a.totalWarnings || 0) >= (config.maxActivityWarnings || 2),
        latestActivityTime: latestLog ? latestLog.timestamp : a.startedAt || null,
        activityLogs: logs,
      };
    });

    return res.json({
      success: true,
      total: attempts.length,
      maxWarnings: config.maxActivityWarnings || 2,
      attempts,
    });
  } catch (error) {
    console.error('Failed to retrieve activity monitor data:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve activity monitor data.' });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const eventId = 'BLIND_CODING_2026';

    // Ranks strictly by: 1. Score desc, 2. Time taken asc
    const completed = await QuizAttempt.find({
      eventId,
      status: 'COMPLETED',
      score: { $ne: null },
    }).sort({ score: -1, timeTakenSeconds: 1 });

    const leaderboard = completed.map((a, index) => ({
      rank: index + 1,
      id: a._id,
      name: a.studentName,
      registerNumber: a.registerNumber,
      department: a.department,
      year: a.year,
      class: a.class,
      score: a.score,
      total: a.totalQuestions || 25,
      percentage: a.percentage,
      timeFormatted: a.timeFormatted,
      totalWarnings: a.totalWarnings || 0,
      submittedAt: a.submittedAt,
    }));

    return res.json({
      success: true,
      totalRanked: leaderboard.length,
      leaderboard,
    });
  } catch (error) {
    console.error('Failed to build admin leaderboard from MongoDB:', error);
    return res.status(500).json({ success: false, message: 'Failed to build admin leaderboard.' });
  }
};

export const getQuestionsBank = async (req, res) => {
  try {
    const questions = await Question.find().sort({ questionId: 1 });
    return res.json({ success: true, questions });
  } catch (error) {
    console.error('Failed to retrieve questions bank from MongoDB:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve questions bank.' });
  }
};

export const addQuestion = async (req, res) => {
  try {
    const { category, difficulty, question, codeSnippet, options, correctAnswer, explanation } = req.body;

    if (!question || !options || options.length !== 4 || !correctAnswer) {
      return res.status(400).json({
        success: false,
        message: 'Question, exactly 4 options, and a valid correct answer (A, B, C, or D) are required.',
      });
    }

    const highest = await Question.findOne().sort({ questionId: -1 });
    const newId = highest ? highest.questionId + 1 : 1;

    const newQuestion = await Question.create({
      questionId: newId,
      category: category || 'General Programming',
      difficulty: difficulty || 'Medium',
      question: question.trim(),
      codeSnippet: codeSnippet || null,
      options: options.map((opt, i) => ({
        id: opt.id || ['A', 'B', 'C', 'D'][i],
        text: opt.text || opt,
      })),
      correctAnswer: correctAnswer.toUpperCase(),
      explanation: explanation || 'Admin verified solution.',
    });

    return res.status(201).json({
      success: true,
      message: 'New question added to MongoDB question bank successfully.',
      question: newQuestion,
    });
  } catch (error) {
    console.error('Failed to add question to MongoDB:', error);
    return res.status(500).json({ success: false, message: error.message || 'Failed to add question.' });
  }
};

// Admin Event Settings CRUD in MongoDB
export const getAdminSettings = async (req, res) => {
  try {
    const config = await getActiveConfig();
    return res.json({
      success: true,
      config,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve admin settings.' });
  }
};

export const updateAdminSettings = async (req, res) => {
  try {
    const updates = req.body;
    if (!updates) {
      return res.status(400).json({ success: false, message: 'Configuration payload required.' });
    }

    const currentConfig = await getActiveConfig();

    if (updates.eventTitle !== undefined) currentConfig.eventTitle = updates.eventTitle;
    if (updates.quizDurationMinutes !== undefined)
      currentConfig.quizDurationMinutes = Number(updates.quizDurationMinutes);
    if (updates.totalQuestions !== undefined)
      currentConfig.totalQuestions = Number(updates.totalQuestions);
    if (updates.quizAvailability !== undefined)
      currentConfig.quizAvailability = updates.quizAvailability;
    if (updates.maxActivityWarnings !== undefined)
      currentConfig.maxActivityWarnings = Number(updates.maxActivityWarnings);
    if (updates.autoSubmitOnWarningLimit !== undefined)
      currentConfig.autoSubmitOnWarningLimit = Boolean(updates.autoSubmitOnWarningLimit);
    if (updates.fullscreenRequired !== undefined)
      currentConfig.fullscreenRequired = Boolean(updates.fullscreenRequired);
    if (updates.tabSwitchMonitoring !== undefined)
      currentConfig.tabSwitchMonitoring = Boolean(updates.tabSwitchMonitoring);
    if (updates.passingPercentage !== undefined)
      currentConfig.passingPercentage = Number(updates.passingPercentage);
    if (updates.allowAnswerChange !== undefined)
      currentConfig.allowAnswerChange = Boolean(updates.allowAnswerChange);

    await currentConfig.save();

    return res.json({
      success: true,
      message: 'Event Configuration updated successfully in MongoDB.',
      config: currentConfig,
    });
  } catch (error) {
    console.error('Failed to update event configuration in MongoDB:', error);
    return res.status(500).json({ success: false, message: 'Failed to update event configuration.' });
  }
};

// Admin Detailed Participant Review (Admin-Only Question-by-Question Breakdown)
export const getParticipantReview = async (req, res) => {
  try {
    const { id } = req.params;
    let attempt = null;

    if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
      attempt = await QuizAttempt.findById(id);
    }
    if (!attempt) {
      attempt = await QuizAttempt.findOne({ registerNumber: id.trim().toUpperCase(), eventId: 'BLIND_CODING_2026' });
    }

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Participant record not found.' });
    }

    const allQuestions = await Question.find().sort({ questionId: 1 });
    const questionMap = new Map();
    allQuestions.forEach((q) => questionMap.set(String(q.questionId), q));

    const studentAnswers = attempt.answers instanceof Map
      ? attempt.answers
      : new Map(Object.entries(attempt.answers || {}));

    // Reconstruct list in the student's assigned order if available, else sequential
    let orderedQuestions = [];
    if (attempt.assignedQuestions && attempt.assignedQuestions.length > 0) {
      orderedQuestions = attempt.assignedQuestions
        .map((aq) => questionMap.get(String(aq.questionId)))
        .filter(Boolean);
    } else {
      orderedQuestions = allQuestions;
    }

    const review = orderedQuestions.map((q, idx) => {
      const qIdStr = String(q.questionId);
      const studentChoice = studentAnswers.get(qIdStr) || null;
      const correctId = q.correctOptionId || q.correctAnswer;

      const optionsMap = new Map((q.options || []).map((o) => [o.id || o.optionId, o.text]));
      const studentText = studentChoice ? optionsMap.get(studentChoice) || `Option ${studentChoice}` : 'Not Answered';
      const correctText = optionsMap.get(correctId) || `Option ${correctId}`;

      let status = 'UNANSWERED';
      let isCorrect = null;

      if (studentChoice) {
        if (studentChoice === correctId) {
          status = 'CORRECT';
          isCorrect = true;
        } else {
          status = 'INCORRECT';
          isCorrect = false;
        }
      }

      return {
        displayOrder: idx + 1,
        questionId: q.questionId,
        category: q.category,
        difficulty: q.difficulty,
        question: q.questionText || q.question,
        codeSnippet: q.codeSnippet,
        options: (q.options || []).map((o) => ({ id: o.id || o.optionId, text: o.text })),
        studentSelectedOptionId: studentChoice,
        studentSelectedText: studentText,
        correctOptionId: correctId,
        correctText,
        status, // 'CORRECT' | 'INCORRECT' | 'UNANSWERED'
        isCorrect,
      };
    });

    return res.json({
      success: true,
      student: {
        id: attempt._id,
        name: attempt.studentName,
        registerNumber: attempt.registerNumber,
        department: attempt.department,
        year: attempt.year,
        class: attempt.class,
        section: attempt.section,
        status: attempt.status,
        score: attempt.score,
        total: attempt.totalQuestions || 25,
        percentage: attempt.percentage,
        timeFormatted: attempt.timeFormatted,
        timeTakenSeconds: attempt.timeTakenSeconds,
        tabSwitchCount: attempt.tabSwitchCount || 0,
        fullscreenExitCount: attempt.fullscreenExitCount || 0,
        totalWarnings: attempt.totalWarnings || 0,
        startedAt: attempt.startedAt,
        submittedAt: attempt.submittedAt,
      },
      review,
    });
  } catch (error) {
    console.error('Error fetching participant review:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve participant review.' });
  }
};
