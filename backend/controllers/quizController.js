import { memoryStore } from '../config/db.js';
import { INITIAL_QUESTIONS } from '../utils/seedData.js';
import { fisherYatesShuffle } from '../utils/shuffle.js';

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
    maxActivityWarnings: 2,
    autoSubmitOnWarningLimit: true,
    fullscreenRequired: true,
    tabSwitchMonitoring: true,
    passingPercentage: 50,
    allowAnswerChange: true,
  };
  return config;
};

// Helper to get master question map
const getMasterQuestionMap = () => {
  const masterList = Array.from(memoryStore.questions.values());
  const source = masterList.length > 0 ? masterList : INITIAL_QUESTIONS;
  const map = new Map();
  source.forEach((q) => {
    const qId = String(q.questionId || q.id);
    map.set(qId, q);
  });
  return map;
};

// 1. Start Quiz with Fisher-Yates Question & Option Shuffling (Set Once)
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
    const totalQuestionsConfig = config.totalQuestions || DEFAULT_TOTAL_QUESTIONS;
    const masterQuestionMap = getMasterQuestionMap();

    // FEATURE 1: Generate Shuffled Question & Option Order ONCE per attempt
    if (!attempt.assignedQuestions || attempt.assignedQuestions.length === 0) {
      const allMasterQuestions = Array.from(masterQuestionMap.values());
      const selectedPool = allMasterQuestions.slice(0, totalQuestionsConfig);

      // Fisher-Yates Question Shuffle
      const shuffledPool = fisherYatesShuffle(selectedPool);

      // Fisher-Yates Option Shuffle per Question
      attempt.assignedQuestions = shuffledPool.map((q) => {
        const optionIds = q.options.map((opt) => opt.id);
        const shuffledOptionOrder = fisherYatesShuffle(optionIds);
        return {
          questionId: q.questionId || q.id,
          optionOrder: shuffledOptionOrder,
        };
      });
    }

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

    // Build the candidate-specific sanitized questions array in assigned order
    const candidateQuestions = attempt.assignedQuestions.map((aq) => {
      const q = masterQuestionMap.get(String(aq.questionId));
      const orderedOptions = aq.optionOrder.map((optId) => {
        const found = q.options.find((o) => String(o.id) === String(optId));
        return {
          id: found ? found.id : optId,
          text: found ? found.text : '',
        };
      });

      return {
        id: q.questionId || q.id,
        questionId: q.questionId || q.id,
        category: q.category,
        difficulty: q.difficulty,
        question: q.question,
        codeSnippet: q.codeSnippet,
        options: orderedOptions,
      };
    });

    const maxWarnings = config.maxActivityWarnings || 2;

    return res.json({
      success: true,
      message: 'Assessment countdown started.',
      startedAt: attempt.startedAt,
      remainingSeconds,
      durationSeconds,
      savedAnswers: attempt.answers || {},
      questions: candidateQuestions,
      tabSwitchCount: attempt.tabSwitchCount,
      fullscreenExitCount: attempt.fullscreenExitCount,
      totalWarnings: attempt.totalWarnings,
      maxWarnings,
      config: {
        eventTitle: config.eventTitle,
        totalQuestions: candidateQuestions.length,
        fullscreenRequired: config.fullscreenRequired !== false,
        tabSwitchMonitoring: config.tabSwitchMonitoring !== false,
        maxActivityWarnings: maxWarnings,
      },
    });
  } catch (error) {
    console.error('Error starting quiz:', error);
    return res.status(500).json({ success: false, message: 'Failed to initiate quiz countdown on server.' });
  }
};

// 2. Return Sanitized Questions (Ordered per student if registerNumber given)
export const getQuestions = async (req, res) => {
  try {
    const { registerNumber } = req.query;
    const config = getActiveConfig();
    const masterQuestionMap = getMasterQuestionMap();

    let finalQuestions = [];

    if (registerNumber) {
      const regNoClean = registerNumber.trim();
      const attempt = memoryStore.quizAttempts.get(regNoClean);

      if (attempt && attempt.assignedQuestions && attempt.assignedQuestions.length > 0) {
        finalQuestions = attempt.assignedQuestions.map((aq) => {
          const q = masterQuestionMap.get(String(aq.questionId));
          const orderedOptions = aq.optionOrder.map((optId) => {
            const found = q.options.find((o) => String(o.id) === String(optId));
            return {
              id: found ? found.id : optId,
              text: found ? found.text : '',
            };
          });

          return {
            id: q.questionId || q.id,
            questionId: q.questionId || q.id,
            category: q.category,
            difficulty: q.difficulty,
            question: q.question,
            codeSnippet: q.codeSnippet,
            options: orderedOptions,
          };
        });
      }
    }

    // Default fallback if no specific student attempt exists yet
    if (finalQuestions.length === 0) {
      const masterList = Array.from(masterQuestionMap.values());
      const limit = config.totalQuestions || DEFAULT_TOTAL_QUESTIONS;
      finalQuestions = masterList.slice(0, limit).map((q) => ({
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
      }));
    }

    return res.json({
      success: true,
      total: finalQuestions.length,
      questions: finalQuestions,
      config: {
        eventTitle: config.eventTitle,
        durationMinutes: config.quizDurationMinutes,
        maxWarnings: config.maxActivityWarnings || 2,
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
      attempt.answers[String(questionId)] = String(selectedOption).toUpperCase();
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

// 4. Log Activity Event (Tab Switch / Fullscreen Exit) with Server Guard
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
    const maxWarnings = config.maxActivityWarnings || 2;
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
    console.error('Error logging quiz activity:', error);
    return res.status(500).json({ success: false, message: 'Failed to record quiz activity on server.' });
  }
};

// 5. Submit Assessment (Server computes score comparing stable option IDs)
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
    const masterQuestionMap = getMasterQuestionMap();

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

    // SERVER-SIDE SCORE COMPUTATION (Compare stable selectedOption vs correctAnswer)
    let correctCount = 0;
    const studentAnswers = attempt.answers || {};

    const questionsToScore =
      attempt.assignedQuestions && attempt.assignedQuestions.length > 0
        ? attempt.assignedQuestions
        : Array.from(masterQuestionMap.values()).slice(0, totalQuestionsConfig);

    questionsToScore.forEach((aq) => {
      const qId = String(aq.questionId || aq.id);
      const q = masterQuestionMap.get(qId);
      if (q) {
        const studentChoice = studentAnswers[qId];
        if (studentChoice && String(studentChoice).toUpperCase() === String(q.correctAnswer).toUpperCase()) {
          correctCount++;
        }
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

// 7. Get Public Event Configuration
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
        maxActivityWarnings: config.maxActivityWarnings || 2,
        autoSubmitOnWarningLimit: config.autoSubmitOnWarningLimit !== false,
        fullscreenRequired: config.fullscreenRequired !== false,
        tabSwitchMonitoring: config.tabSwitchMonitoring !== false,
        passingPercentage: config.passingPercentage,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve event configuration.' });
  }
};
