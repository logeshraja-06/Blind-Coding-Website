import { memoryStore } from '../config/db.js';
import { INITIAL_QUESTIONS } from '../utils/seedData.js';

const DEFAULT_QUIZ_DURATION_SECONDS = 60 * 60; // 60 minutes
const DEFAULT_TOTAL_QUESTIONS = 25;

// Helper to get active event configuration
export const getActiveConfig = () => {
  const config = memoryStore.eventConfig || {
    eventTitle: 'BLIND CODING',
    quizDurationMinutes: 60,
    totalQuestions: 25,
    eventStartAt: null,
    eventEndAt: null,
    quizAvailability: 'ACTIVE',
    maxActivityWarnings: 3,
    autoSubmitOnWarningLimit: true,
    fullscreenRequired: true,
    tabSwitchMonitoring: true,
    passingPercentage: 50,
    allowAnswerChange: true,
  };
  return config;
};

// 1. Start Quiz with Event Availability Enforcement & Activity Init
export const startQuiz = async (req, res) => {
  try {
    const { registerNumber } = req.body;
    if (!registerNumber) {
      return res.status(400).json({ success: false, message: 'Register Number required to start challenge.' });
    }

    const config = getActiveConfig();
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

    const regNoClean = registerNumber.trim();
    const attempt = memoryStore.quizAttempts.get(regNoClean);

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Student registration not found. Please register first.' });
    }

    if (attempt.status === 'COMPLETED') {
      return res.status(403).json({
        success: false,
        message: 'This attempt has already been submitted and finalized.',
        status: 'COMPLETED',
      });
    }

    const durationSeconds = (config.quizDurationMinutes || 60) * 60;

    if (!attempt.startedAt) {
      attempt.startedAt = now.toISOString();
      if (!attempt.activityLogs) attempt.activityLogs = [];
      attempt.activityLogs.push({
        type: 'QUIZ_STARTED',
        timestamp: now.toISOString(),
        details: 'Quiz session initiated by candidate',
      });
    }

    attempt.status = 'IN_PROGRESS';
    attempt.tabSwitchCount = attempt.tabSwitchCount || 0;
    attempt.fullscreenExitCount = attempt.fullscreenExitCount || 0;
    attempt.totalWarnings = (attempt.tabSwitchCount || 0) + (attempt.fullscreenExitCount || 0);

    memoryStore.quizAttempts.set(regNoClean, attempt);

    // Calculate remaining seconds based on server startedAt
    const elapsedSeconds = Math.floor((Date.now() - new Date(attempt.startedAt).getTime()) / 1000);
    const remainingSeconds = Math.max(0, durationSeconds - elapsedSeconds);

    return res.json({
      success: true,
      message: 'Assessment countdown started.',
      startedAt: attempt.startedAt,
      remainingSeconds,
      durationSeconds,
      savedAnswers: attempt.answers || {},
      tabSwitchCount: attempt.tabSwitchCount,
      fullscreenExitCount: attempt.fullscreenExitCount,
      totalWarnings: attempt.totalWarnings,
      maxWarnings: config.maxActivityWarnings || 3,
      config: {
        eventTitle: config.eventTitle,
        totalQuestions: config.totalQuestions || DEFAULT_TOTAL_QUESTIONS,
        fullscreenRequired: config.fullscreenRequired !== false,
        tabSwitchMonitoring: config.tabSwitchMonitoring !== false,
        maxActivityWarnings: config.maxActivityWarnings || 3,
      },
    });
  } catch (error) {
    console.error('Error starting quiz:', error);
    return res.status(500).json({ success: false, message: 'Failed to initiate quiz countdown on server.' });
  }
};

// 2. Return Sanitized Questions WITHOUT correctAnswer or explanation
export const getQuestions = async (req, res) => {
  try {
    const config = getActiveConfig();
    const questionsList = [];

    // Extract questions and strip security-sensitive fields
    const masterList = Array.from(memoryStore.questions.values());
    const source = masterList.length > 0 ? masterList : INITIAL_QUESTIONS;

    source.forEach((q) => {
      questionsList.push({
        id: q.questionId || q.id,
        questionId: q.questionId || q.id,
        category: q.category,
        difficulty: q.difficulty,
        question: q.question,
        codeSnippet: q.codeSnippet,
        options: q.options.map((opt) => ({
          id: opt.id,
          text: opt.text,
        })),
        // NOTE: correctAnswer and explanation are explicitly EXCLUDED for student integrity
      });
    });

    // Ensure sorted by ID
    questionsList.sort((a, b) => a.questionId - b.questionId);

    const limit = config.totalQuestions || DEFAULT_TOTAL_QUESTIONS;
    const finalQuestions = questionsList.slice(0, limit);

    return res.json({
      success: true,
      total: finalQuestions.length,
      questions: finalQuestions,
      config: {
        eventTitle: config.eventTitle,
        durationMinutes: config.quizDurationMinutes,
        maxWarnings: config.maxActivityWarnings || 3,
        fullscreenRequired: config.fullscreenRequired !== false,
        tabSwitchMonitoring: config.tabSwitchMonitoring !== false,
      },
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve assessment questions.' });
  }
};

// 3. Save Candidate Single Answer
export const saveAnswer = async (req, res) => {
  try {
    const { registerNumber, questionId, selectedOption } = req.body;
    if (!registerNumber || !questionId) {
      return res.status(400).json({ success: false, message: 'Register Number and Question ID are required.' });
    }

    const regNoClean = registerNumber.trim();
    const attempt = memoryStore.quizAttempts.get(regNoClean);

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Quiz attempt not found.' });
    }

    if (attempt.status === 'COMPLETED') {
      return res.status(403).json({ success: false, message: 'Assessment already completed. Modifications disallowed.' });
    }

    if (!attempt.answers) {
      attempt.answers = {};
    }

    if (selectedOption) {
      attempt.answers[String(questionId)] = selectedOption.toUpperCase();
    } else {
      delete attempt.answers[String(questionId)];
    }

    memoryStore.quizAttempts.set(regNoClean, attempt);

    return res.json({
      success: true,
      message: 'Answer recorded successfully on server.',
      savedCount: Object.keys(attempt.answers).length,
    });
  } catch (error) {
    console.error('Error saving answer:', error);
    return res.status(500).json({ success: false, message: 'Failed to save answer state on server.' });
  }
};

// 4. Log Activity Event (Tab Switch / Fullscreen Exit) with Server-Side Guard
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

    const regNoClean = registerNumber.trim();
    const attempt = memoryStore.quizAttempts.get(regNoClean);

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Quiz attempt not found.' });
    }

    if (attempt.status === 'COMPLETED') {
      return res.status(403).json({ success: false, message: 'Quiz attempt already completed.' });
    }

    const config = getActiveConfig();
    const now = new Date();

    if (!attempt.activityLogs) {
      attempt.activityLogs = [];
    }

    // Server-side debouncing: Ignore duplicate event of the same type within 1.5 seconds
    const lastMatchingLog = [...attempt.activityLogs]
      .reverse()
      .find((log) => log.type === activityType);

    if (lastMatchingLog) {
      const diffMs = now.getTime() - new Date(lastMatchingLog.timestamp).getTime();
      if (diffMs < 1500) {
        // Return existing counters without double incrementing
        const total = (attempt.tabSwitchCount || 0) + (attempt.fullscreenExitCount || 0);
        return res.json({
          success: true,
          debounced: true,
          tabSwitchCount: attempt.tabSwitchCount || 0,
          fullscreenExitCount: attempt.fullscreenExitCount || 0,
          totalWarnings: total,
          maxWarnings: config.maxActivityWarnings || 3,
          shouldAutoSubmit: Boolean(config.autoSubmitOnWarningLimit && total >= (config.maxActivityWarnings || 3)),
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

    // Record chronological log entry
    attempt.activityLogs.push({
      type: activityType,
      timestamp: now.toISOString(),
      details:
        activityType === 'TAB_SWITCH'
          ? `Tab switch or window focus loss (Warning #${attempt.totalWarnings})`
          : `Exited fullscreen mode (Warning #${attempt.totalWarnings})`,
    });

    memoryStore.quizAttempts.set(regNoClean, attempt);

    const maxWarnings = config.maxActivityWarnings || 3;
    const shouldAutoSubmit = Boolean(config.autoSubmitOnWarningLimit && attempt.totalWarnings >= maxWarnings);

    return res.json({
      success: true,
      activityType,
      tabSwitchCount: attempt.tabSwitchCount,
      fullscreenExitCount: attempt.fullscreenExitCount,
      totalWarnings: attempt.totalWarnings,
      maxWarnings,
      shouldAutoSubmit,
      message: `Activity logged: ${activityType}. Total warnings: ${attempt.totalWarnings}/${maxWarnings}`,
    });
  } catch (error) {
    console.error('Error logging quiz activity:', error);
    return res.status(500).json({ success: false, message: 'Failed to record quiz activity on server.' });
  }
};

// 5. Submit Assessment (Server computes score & marks final status)
export const submitQuiz = async (req, res) => {
  try {
    const { registerNumber, isAutoSubmit } = req.body;
    if (!registerNumber) {
      return res.status(400).json({ success: false, message: 'Register Number required for submission.' });
    }

    const regNoClean = registerNumber.trim();
    const attempt = memoryStore.quizAttempts.get(regNoClean);
    const config = getActiveConfig();
    const totalQuestionsConfig = config.totalQuestions || DEFAULT_TOTAL_QUESTIONS;
    const durationSeconds = (config.quizDurationMinutes || 60) * 60;

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Quiz attempt not found.' });
    }

    if (attempt.status === 'COMPLETED') {
      return res.json({
        success: true,
        message: 'Quiz was already finalized.',
        result: {
          studentName: attempt.studentName,
          registerNumber: attempt.registerNumber,
          score: attempt.score,
          total: totalQuestionsConfig,
          percentage: attempt.percentage,
          timeFormatted: attempt.timeFormatted,
          submittedAt: attempt.submittedAt,
        },
      });
    }

    const startTime = attempt.startedAt ? new Date(attempt.startedAt).getTime() : Date.now();
    const endTime = Date.now();
    const elapsedSeconds = Math.min(durationSeconds, Math.floor((endTime - startTime) / 1000));

    // SERVER-SIDE SCORE COMPUTATION (Secure)
    let correctCount = 0;
    const studentAnswers = attempt.answers || {};

    const masterQuestions = Array.from(memoryStore.questions.values());
    const sourceQuestions = masterQuestions.length > 0 ? masterQuestions : INITIAL_QUESTIONS;

    sourceQuestions.slice(0, totalQuestionsConfig).forEach((q) => {
      const qId = String(q.questionId || q.id);
      const studentChoice = studentAnswers[qId];
      if (studentChoice && studentChoice === q.correctAnswer) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / totalQuestionsConfig) * 100);

    let performanceTier = 'KEEP LEARNING';
    if (percentage >= 90) performanceTier = 'EXCELLENT PERFORMANCE';
    else if (percentage >= 70) performanceTier = 'GREAT WORK';
    else if (percentage >= 50) performanceTier = 'GOOD ATTEMPT';

    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    // Update attempt in memory store
    attempt.status = 'COMPLETED';
    attempt.submittedAt = new Date().toISOString();
    attempt.timeTakenSeconds = elapsedSeconds;
    attempt.timeFormatted = timeFormatted;
    attempt.score = correctCount;
    attempt.totalQuestions = totalQuestionsConfig;
    attempt.percentage = percentage;

    if (!attempt.activityLogs) attempt.activityLogs = [];
    attempt.activityLogs.push({
      type: 'QUIZ_SUBMITTED',
      timestamp: attempt.submittedAt,
      details: isAutoSubmit
        ? 'Quiz submitted automatically due to timeout or warning limit reached'
        : 'Quiz submitted normally by candidate',
    });

    memoryStore.quizAttempts.set(regNoClean, attempt);

    // RETURN STRICTLY PRIVATE SUMMARY
    return res.json({
      success: true,
      message: isAutoSubmit ? 'Assessment submitted automatically.' : 'Assessment submitted successfully.',
      result: {
        studentName: attempt.studentName,
        registerNumber: attempt.registerNumber,
        score: correctCount,
        total: totalQuestionsConfig,
        percentage,
        performanceTier,
        timeFormatted,
        submittedAt: attempt.submittedAt,
        isAutoSubmit: Boolean(isAutoSubmit),
      },
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return res.status(500).json({ success: false, message: 'Server error calculating final score.' });
  }
};

// 6. Get Candidate Result (Private Only)
export const getStudentResult = async (req, res) => {
  try {
    const { registerNumber } = req.params;
    if (!registerNumber) {
      return res.status(400).json({ success: false, message: 'Register Number required.' });
    }

    const regNoClean = registerNumber.trim();
    const attempt = memoryStore.quizAttempts.get(regNoClean);
    const config = getActiveConfig();

    if (!attempt || attempt.status !== 'COMPLETED') {
      return res.status(404).json({ success: false, message: 'Completed result not found for this candidate.' });
    }

    let performanceTier = 'KEEP LEARNING';
    if (attempt.percentage >= 90) performanceTier = 'EXCELLENT PERFORMANCE';
    else if (attempt.percentage >= 70) performanceTier = 'GREAT WORK';
    else if (attempt.percentage >= 50) performanceTier = 'GOOD ATTEMPT';

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
        total: attempt.totalQuestions || config.totalQuestions || DEFAULT_TOTAL_QUESTIONS,
        percentage: attempt.percentage,
        performanceTier,
        timeFormatted: attempt.timeFormatted,
        submittedAt: attempt.submittedAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve candidate score.' });
  }
};

// 7. Get Public Event Configuration for Student Flow
export const getPublicQuizConfig = async (req, res) => {
  try {
    const config = getActiveConfig();
    return res.json({
      success: true,
      config: {
        eventTitle: config.eventTitle,
        quizDurationMinutes: config.quizDurationMinutes,
        totalQuestions: config.totalQuestions,
        eventStartAt: config.eventStartAt,
        eventEndAt: config.eventEndAt,
        quizAvailability: config.quizAvailability,
        maxActivityWarnings: config.maxActivityWarnings,
        autoSubmitOnWarningLimit: config.autoSubmitOnWarningLimit,
        fullscreenRequired: config.fullscreenRequired,
        tabSwitchMonitoring: config.tabSwitchMonitoring,
        passingPercentage: config.passingPercentage,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve event configuration.' });
  }
};
