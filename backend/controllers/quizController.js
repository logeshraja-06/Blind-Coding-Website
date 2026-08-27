import { Question } from '../models/Question.js';
import { QuizAttempt } from '../models/QuizAttempt.js';
import { EventConfig } from '../models/EventConfig.js';
import { fisherYatesShuffle } from '../utils/shuffle.js';

const DEFAULT_QUIZ_DURATION_SECONDS = 60 * 60; // 60 minutes
const DEFAULT_TOTAL_QUESTIONS = 25;

// Helper to get active event configuration from MongoDB
export const getActiveConfig = async () => {
  let config = await EventConfig.findOne({ eventId: 'BLIND_CODING_2026' });
  if (!config) {
    config = await EventConfig.create({
      eventId: 'BLIND_CODING_2026',
      eventTitle: 'BLIND CODING',
      quizDurationMinutes: 60,
      totalQuestions: 25,
      eventStartAt: null,
      eventEndAt: null,
      quizAvailability: 'ACTIVE',
      maxActivityWarnings: 2,
      autoSubmitOnWarningLimit: true,
      fullscreenRequired: true,
      tabSwitchMonitoring: true,
      passingPercentage: 50,
      allowAnswerChange: true,
    });
  }
  return config;
};

// 1. Start Quiz with Fisher-Yates Question & Option Shuffling (Set Once in MongoDB)
export const startQuiz = async (req, res) => {
  try {
    const { registerNumber } = req.body;
    if (!registerNumber) {
      return res.status(400).json({ success: false, message: 'Register Number required to start challenge.' });
    }

    const config = await getActiveConfig();
    const now = new Date();

    // Event Availability Check
    if (config.quizAvailability === 'INACTIVE') {
      return res.status(403).json({
        success: false,
        message: 'The quiz is currently inactive. Please contact the department coordinators.',
        availabilityStatus: 'INACTIVE',
      });
    }

    if (config.eventStartAt && now < new Date(config.eventStartAt)) {
      return res.status(403).json({
        success: false,
        message: `The event has not started yet. Starts at: ${new Date(config.eventStartAt).toLocaleString()}`,
        availabilityStatus: 'NOT_STARTED',
      });
    }

    if (config.eventEndAt && now > new Date(config.eventEndAt)) {
      return res.status(403).json({
        success: false,
        message: `The event has ended. Submissions are closed.`,
        availabilityStatus: 'ENDED',
      });
    }

    const regNoClean = registerNumber.trim().toUpperCase();
    const eventId = 'BLIND_CODING_2026';
    const attempt = await QuizAttempt.findOne({ registerNumber: regNoClean, eventId });

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Student registration not found. Please register first.' });
    }

    if (attempt.status === 'COMPLETED') {
      return res.status(403).json({
        success: false,
        message: 'You have already submitted your Blind Coding assessment. Multiple attempts are prohibited.',
        status: 'COMPLETED',
        score: attempt.score,
        total: attempt.totalQuestions,
        percentage: attempt.percentage,
        submittedAt: attempt.submittedAt,
      });
    }

    const durationSeconds = (config.quizDurationMinutes || 60) * 60;
    const allQuestions = await Question.find().sort({ questionId: 1 });
    const questionMap = new Map();
    allQuestions.forEach((q) => questionMap.set(String(q.questionId), q));

    // Case A: Continuing existing ongoing session
    if (attempt.status === 'IN_PROGRESS' && attempt.startedAt) {
      const elapsedSeconds = Math.floor((now.getTime() - new Date(attempt.startedAt).getTime()) / 1000);
      const remainingSeconds = Math.max(0, durationSeconds - elapsedSeconds);

      // Reconstruct assigned questions in saved randomized order
      const clientQuestions = (attempt.assignedQuestions || [])
        .map((assigned, idx) => {
          const original = questionMap.get(String(assigned.questionId));
          if (!original) return null;

          const optionsMap = new Map(original.options.map((o) => [o.id, o]));
          const orderedOptions = assigned.optionOrder
            .map((optId) => optionsMap.get(optId))
            .filter(Boolean)
            .map((o) => ({ id: o.id, text: o.text }));

          return {
            id: original.questionId,
            questionId: original.questionId,
            displayOrder: idx + 1,
            category: original.category,
            difficulty: original.difficulty,
            question: original.question,
            codeSnippet: original.codeSnippet,
            options: orderedOptions,
          };
        })
        .filter(Boolean);

      const savedAnswersObj = attempt.answers instanceof Map
        ? Object.fromEntries(attempt.answers)
        : attempt.answers || {};

      return res.json({
        success: true,
        message: 'Resuming ongoing assessment.',
        startedAt: attempt.startedAt,
        expiresAt: attempt.expiresAt,
        durationSeconds,
        remainingSeconds,
        questions: clientQuestions,
        totalQuestions: clientQuestions.length,
        savedAnswers: savedAnswersObj,
        tabSwitchCount: attempt.tabSwitchCount || 0,
        fullscreenExitCount: attempt.fullscreenExitCount || 0,
        totalWarnings: attempt.totalWarnings || 0,
        maxWarnings: config.maxActivityWarnings || 2,
        isResume: true,
      });
    }

    // Case B: First Time Starting Assessment
    const startedAt = now;
    const expiresAt = new Date(startedAt.getTime() + durationSeconds * 1000);

    // Shuffle questions with Fisher-Yates
    const shuffledQuestions = fisherYatesShuffle([...allQuestions]);

    const assignedQuestions = [];
    const clientQuestions = [];

    shuffledQuestions.forEach((q, idx) => {
      // Shuffle options for this candidate
      const shuffledOptions = fisherYatesShuffle([...q.options]);
      const optionOrder = shuffledOptions.map((o) => o.id);

      assignedQuestions.push({
        questionId: q.questionId,
        displayOrder: idx + 1,
        optionOrder,
      });

      clientQuestions.push({
        id: q.questionId,
        questionId: q.questionId,
        displayOrder: idx + 1,
        category: q.category,
        difficulty: q.difficulty,
        question: q.question,
        questionText: q.questionText || q.question,
        codeSnippet: q.codeSnippet,
        tableName: q.tableName,
        tableData: q.tableData,
        outputBlock: q.outputBlock,
        options: shuffledOptions.map((o) => ({ id: o.id, text: o.text })),
      });
    });

    attempt.status = 'IN_PROGRESS';
    attempt.startedAt = startedAt;
    attempt.expiresAt = expiresAt;
    attempt.assignedQuestions = assignedQuestions;
    if (!attempt.activityLogs) attempt.activityLogs = [];
    attempt.activityLogs.push({
      type: 'QUIZ_STARTED',
      timestamp: startedAt,
      details: 'Candidate initiated official assessment timer',
    });

    await attempt.save();

    return res.json({
      success: true,
      message: 'Assessment countdown started.',
      startedAt: attempt.startedAt,
      expiresAt: attempt.expiresAt,
      durationSeconds,
      remainingSeconds: durationSeconds,
      questions: clientQuestions,
      totalQuestions: clientQuestions.length,
      savedAnswers: {},
      tabSwitchCount: 0,
      fullscreenExitCount: 0,
      totalWarnings: 0,
      maxWarnings: config.maxActivityWarnings || 2,
      isResume: false,
    });
  } catch (error) {
    console.error('Error starting quiz in MongoDB:', error);
    return res.status(500).json({ success: false, message: 'Internal server error initializing assessment.' });
  }
};

// 2. Fetch Questions (Sanitized: NO answers or explanations leaked to candidate)
export const getQuestions = async (req, res) => {
  try {
    const { registerNumber } = req.query;
    const allQuestions = await Question.find().sort({ questionId: 1 });

    if (registerNumber) {
      const regNoClean = registerNumber.trim().toUpperCase();
      const eventId = 'BLIND_CODING_2026';
      const attempt = await QuizAttempt.findOne({ registerNumber: regNoClean, eventId });

      if (attempt && attempt.assignedQuestions && attempt.assignedQuestions.length > 0) {
        const questionMap = new Map();
        allQuestions.forEach((q) => questionMap.set(String(q.questionId), q));

        const ordered = attempt.assignedQuestions
          .map((assigned, idx) => {
            const original = questionMap.get(String(assigned.questionId));
            if (!original) return null;

            const optionsMap = new Map(original.options.map((o) => [o.id, o]));
            const orderedOptions = assigned.optionOrder
              .map((optId) => optionsMap.get(optId))
              .filter(Boolean)
              .map((o) => ({ id: o.id, text: o.text }));

            return {
              id: original.questionId,
              questionId: original.questionId,
              displayOrder: idx + 1,
              category: original.category,
              difficulty: original.difficulty,
              question: original.question,
              questionText: original.questionText || original.question,
              codeSnippet: original.codeSnippet,
              tableName: original.tableName,
              tableData: original.tableData,
              outputBlock: original.outputBlock,
              options: orderedOptions,
            };
          })
          .filter(Boolean);

        return res.json({ success: true, questions: ordered, total: ordered.length });
      }
    }

    // Default sanitized question list
    const sanitized = allQuestions.map((q, idx) => ({
      id: q.questionId,
      questionId: q.questionId,
      displayOrder: idx + 1,
      category: q.category,
      difficulty: q.difficulty,
      question: q.question,
      questionText: q.questionText || q.question,
      codeSnippet: q.codeSnippet,
      tableName: q.tableName,
      tableData: q.tableData,
      outputBlock: q.outputBlock,
      options: q.options.map((o) => ({ id: o.id, text: o.text })),
    }));

    return res.json({ success: true, questions: sanitized, total: sanitized.length });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve assessment questions.' });
  }
};

// 3. Save Single Answer (MongoDB Map persistence with grace period defense)
export const saveAnswer = async (req, res) => {
  try {
    const { registerNumber, questionId, selectedOption, selectedOptionId } = req.body;
    const finalOption = selectedOption !== undefined ? selectedOption : selectedOptionId;

    if (!registerNumber || questionId === undefined || finalOption === undefined) {
      return res.status(400).json({
        success: false,
        message: 'registerNumber, questionId, and selectedOption (or selectedOptionId) are required.',
      });
    }

    const regNoClean = registerNumber.trim().toUpperCase();
    const eventId = 'BLIND_CODING_2026';
    const attempt = await QuizAttempt.findOne({ registerNumber: regNoClean, eventId });

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Quiz attempt not found.' });
    }

    // Grace Window Defense for race conditions
    if (attempt.status === 'COMPLETED') {
      const now = Date.now();
      const submittedTime = attempt.submittedAt ? new Date(attempt.submittedAt).getTime() : 0;
      const elapsedSinceSubmit = now - submittedTime;

      if (elapsedSinceSubmit <= 2000) {
        if (!attempt.answers) attempt.answers = new Map();
        attempt.answers.set(String(questionId), String(finalOption));

        // Recalculate score with late answer
        const allQuestions = await Question.find();
        let correctCount = 0;
        allQuestions.forEach((q) => {
          const studentAns = attempt.answers.get(String(q.questionId));
          if (studentAns === (q.correctOptionId || q.correctAnswer)) correctCount++;
        });

        attempt.score = correctCount;
        attempt.percentage = Math.round((correctCount / 25) * 100);
        await attempt.save();

        return res.json({
          success: true,
          lateGraceAccepted: true,
          message: 'Answer saved within grace window and score updated.',
          savedCount: attempt.answers.size,
        });
      }

      return res.status(403).json({ success: false, message: 'Quiz is completed and locked.' });
    }

    if (!attempt.answers) {
      attempt.answers = new Map();
    }
    if (finalOption === null || finalOption === '') {
      attempt.answers.delete(String(questionId));
    } else {
      attempt.answers.set(String(questionId), String(finalOption));
    }
    await attempt.save();

    return res.json({
      success: true,
      message: 'Answer saved.',
      questionId,
      selectedOption,
      savedCount: attempt.answers.size,
    });
  } catch (error) {
    console.error('Error saving answer to MongoDB:', error);
    return res.status(500).json({ success: false, message: 'Failed to save answer.' });
  }
};

// 4. Log Activity Event (Tab Switch / Fullscreen Exit) with 2s Server Guard
export const logActivity = async (req, res) => {
  try {
    const { registerNumber, activityType } = req.body;

    if (!registerNumber || !activityType) {
      return res.status(400).json({ success: false, message: 'Register Number and Activity Type are required.' });
    }

    const validTypes = ['TAB_SWITCH', 'FULLSCREEN_EXIT'];
    if (!validTypes.includes(activityType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid activityType. Must be one of: ${validTypes.join(', ')}`,
      });
    }

    const regNoClean = registerNumber.trim().toUpperCase();
    const eventId = 'BLIND_CODING_2026';
    const attempt = await QuizAttempt.findOne({ registerNumber: regNoClean, eventId });

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Quiz attempt not found.' });
    }

    if (attempt.status === 'COMPLETED') {
      return res.status(403).json({ success: false, message: 'Quiz attempt already completed.' });
    }

    const config = await getActiveConfig();
    const maxWarnings = config.maxActivityWarnings || 2;
    const now = new Date();

    if (!attempt.activityLogs) {
      attempt.activityLogs = [];
    }

    // Server-side debouncing: Ignore any activity event within 2.0 seconds
    const lastActivityLog = [...attempt.activityLogs]
      .reverse()
      .find((log) => ['TAB_SWITCH', 'FULLSCREEN_EXIT'].includes(log.type));

    if (lastActivityLog) {
      const diffMs = now.getTime() - new Date(lastActivityLog.timestamp).getTime();
      if (diffMs < 2000) {
        const total = (attempt.tabSwitchCount || 0) + (attempt.fullscreenExitCount || 0);
        return res.json({
          success: true,
          debounced: true,
          tabSwitchCount: attempt.tabSwitchCount || 0,
          fullscreenExitCount: attempt.fullscreenExitCount || 0,
          totalWarnings: total,
          maxWarnings,
          maxActivityWarnings: maxWarnings,
          autoSubmitRequired: Boolean(config.autoSubmitOnWarningLimit && total >= maxWarnings),
          shouldAutoSubmit: Boolean(config.autoSubmitOnWarningLimit && total >= maxWarnings),
          message: 'Duplicate activity event debounced.',
        });
      }
    }

    // Increment matching counter
    if (activityType === 'TAB_SWITCH') {
      attempt.tabSwitchCount = (attempt.tabSwitchCount || 0) + 1;
    } else if (activityType === 'FULLSCREEN_EXIT') {
      attempt.fullscreenExitCount = (attempt.fullscreenExitCount || 0) + 1;
    }

    attempt.totalWarnings = (attempt.tabSwitchCount || 0) + (attempt.fullscreenExitCount || 0);

    attempt.activityLogs.push({
      type: activityType,
      timestamp: now,
      details:
        activityType === 'TAB_SWITCH'
          ? `Tab switch or window focus loss (Warning #${attempt.totalWarnings})`
          : `Exited fullscreen mode (Warning #${attempt.totalWarnings})`,
    });

    await attempt.save();

    const autoSubmitRequired = Boolean(config.autoSubmitOnWarningLimit && attempt.totalWarnings >= maxWarnings);

    return res.json({
      success: true,
      activityType,
      tabSwitchCount: attempt.tabSwitchCount,
      fullscreenExitCount: attempt.fullscreenExitCount,
      totalWarnings: attempt.totalWarnings,
      maxWarnings,
      maxActivityWarnings: maxWarnings,
      autoSubmitRequired,
      shouldAutoSubmit: autoSubmitRequired,
      message: `Activity logged: ${activityType}. Total warnings: ${attempt.totalWarnings}/${maxWarnings}`,
    });
  } catch (error) {
    console.error('Error logging quiz activity in MongoDB:', error);
    return res.status(500).json({ success: false, message: 'Failed to record quiz activity.' });
  }
};

// 5. Submit Assessment (Server computes score comparing stable option IDs — NO FAKE FALLBACKS)
export const submitQuiz = async (req, res) => {
  try {
    const { registerNumber, isAutoSubmit } = req.body;

    if (!registerNumber) {
      return res.status(400).json({ success: false, message: 'Register number is required to submit.' });
    }

    const regNoClean = registerNumber.trim().toUpperCase();
    const eventId = 'BLIND_CODING_2026';
    const attempt = await QuizAttempt.findOne({ registerNumber: regNoClean, eventId });

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Assessment attempt not found.' });
    }

    const config = await getActiveConfig();
    const totalQuestionsConfig = config.totalQuestions || 25;

    // Idempotent: If already completed, safely return finalized result
    if (attempt.status === 'COMPLETED') {
      let tier = 'KEEP LEARNING';
      if (attempt.percentage >= 90) tier = 'EXCELLENT PERFORMANCE';
      else if (attempt.percentage >= 70) tier = 'GREAT WORK';
      else if (attempt.percentage >= 50) tier = 'GOOD ATTEMPT';

      return res.json({
        success: true,
        message: 'Quiz was already finalized.',
        result: {
          studentName: attempt.studentName,
          registerNumber: attempt.registerNumber,
          score: attempt.score,
          total: totalQuestionsConfig,
          percentage: attempt.percentage,
          performanceTier: tier,
          timeFormatted: attempt.timeFormatted,
          submittedAt: attempt.submittedAt,
          isAutoSubmit: Boolean(isAutoSubmit),
        },
      });
    }

    const now = new Date();
    const studentAnswers = attempt.answers instanceof Map
      ? attempt.answers
      : new Map(Object.entries(attempt.answers || {}));

    const allQuestions = await Question.find().sort({ questionId: 1 });
    let score = 0;
    const answerDetails = [];

    allQuestions.forEach((q) => {
      const qIdStr = String(q.questionId);
      const studentChoice = studentAnswers.get(qIdStr) || null;
      const correctId = q.correctOptionId || q.correctAnswer;
      const isCorrect = Boolean(studentChoice && studentChoice === correctId);

      if (isCorrect) {
        score++;
      }

      answerDetails.push({
        questionId: q.questionId,
        selectedOptionId: studentChoice,
        isCorrect,
        answeredAt: studentChoice ? (attempt.updatedAt || now) : null,
      });
    });

    attempt.answerDetails = answerDetails;

    const percentage = Math.round((score / totalQuestionsConfig) * 100);

    const startedTime = attempt.startedAt ? new Date(attempt.startedAt).getTime() : now.getTime();
    const durationSeconds = (config.quizDurationMinutes || 60) * 60;
    const timeTakenSeconds = Math.min(
      durationSeconds,
      Math.max(1, Math.floor((now.getTime() - startedTime) / 1000))
    );

    const mins = Math.floor(timeTakenSeconds / 60);
    const secs = timeTakenSeconds % 60;
    const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    let performanceTier = 'KEEP LEARNING';
    if (percentage >= 90) performanceTier = 'EXCELLENT PERFORMANCE';
    else if (percentage >= 70) performanceTier = 'GREAT WORK';
    else if (percentage >= 50) performanceTier = 'GOOD ATTEMPT';

    attempt.score = score;
    attempt.totalQuestions = totalQuestionsConfig;
    attempt.percentage = percentage;
    attempt.timeTakenSeconds = timeTakenSeconds;
    attempt.timeFormatted = timeFormatted;
    attempt.status = 'COMPLETED';
    attempt.submittedAt = now;

    if (!attempt.activityLogs) attempt.activityLogs = [];
    attempt.activityLogs.push({
      type: 'QUIZ_SUBMITTED',
      timestamp: now,
      details: isAutoSubmit
        ? 'Automatic submission triggered due to warning limit or timeout'
        : 'Manual final submission confirmed by candidate',
    });

    await attempt.save();

    return res.json({
      success: true,
      message: 'Assessment completed and scored.',
      result: {
        studentName: attempt.studentName,
        registerNumber: attempt.registerNumber,
        score,
        total: totalQuestionsConfig,
        percentage,
        performanceTier,
        timeFormatted,
        submittedAt: now.toISOString(),
        isAutoSubmit: Boolean(isAutoSubmit),
      },
    });
  } catch (error) {
    console.error('Error submitting quiz in MongoDB:', error);
    return res.status(500).json({ success: false, message: 'Server error processing quiz submission.' });
  }
};

// 6. Get Candidate Result (Strictly score and performance tier — NO answers or review exposed)
export const getStudentResult = async (req, res) => {
  try {
    const { registerNumber } = req.params;
    if (!registerNumber) {
      return res.status(400).json({ success: false, message: 'Register Number required.' });
    }

    const regNoClean = registerNumber.trim().toUpperCase();
    const eventId = 'BLIND_CODING_2026';
    const attempt = await QuizAttempt.findOne({ registerNumber: regNoClean, eventId });

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'No assessment record found.' });
    }

    if (attempt.status !== 'COMPLETED') {
      return res.status(400).json({
        success: false,
        message: 'Assessment has not been finalized yet.',
        status: attempt.status,
      });
    }

    const pct = attempt.percentage || 0;
    let performanceTier = 'KEEP LEARNING';
    if (pct >= 90) performanceTier = 'EXCELLENT PERFORMANCE';
    else if (pct >= 70) performanceTier = 'GREAT WORK';
    else if (pct >= 50) performanceTier = 'GOOD ATTEMPT';

    return res.json({
      success: true,
      result: {
        studentName: attempt.studentName,
        registerNumber: attempt.registerNumber,
        department: attempt.department,
        year: attempt.year,
        class: attempt.class,
        section: attempt.section,
        score: attempt.score,
        total: attempt.totalQuestions || 25,
        percentage: pct,
        performanceTier,
        timeFormatted: attempt.timeFormatted,
        submittedAt: attempt.submittedAt,
      },
    });
  } catch (error) {
    console.error('Error getting student result:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve assessment result.' });
  }
};

// 7. Public Configuration API
export const getPublicConfig = async (req, res) => {
  try {
    const config = await getActiveConfig();
    return res.json({
      success: true,
      config: {
        eventTitle: config.eventTitle,
        quizDurationMinutes: config.quizDurationMinutes,
        totalQuestions: config.totalQuestions,
        quizAvailability: config.quizAvailability,
        maxActivityWarnings: config.maxActivityWarnings,
        fullscreenRequired: config.fullscreenRequired,
        tabSwitchMonitoring: config.tabSwitchMonitoring,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch public configuration.' });
  }
};

export const getPublicQuizConfig = getPublicConfig;
