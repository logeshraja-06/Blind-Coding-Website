import { memoryStore } from '../config/db.js';
import { INITIAL_QUESTIONS } from '../utils/seedData.js';

const TOTAL_QUESTIONS = 25;
const QUIZ_DURATION_SECONDS = 60 * 60; // 60 minutes

export const startQuiz = async (req, res) => {
  try {
    const { registerNumber } = req.body;
    if (!registerNumber) {
      return res.status(400).json({ success: false, message: 'Register Number required to start challenge.' });
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

    const now = new Date();
    if (!attempt.startedAt) {
      attempt.startedAt = now.toISOString();
    }
    attempt.status = 'IN_PROGRESS';
    memoryStore.quizAttempts.set(regNoClean, attempt);

    // Calculate remaining seconds
    const elapsedSeconds = Math.floor((Date.now() - new Date(attempt.startedAt).getTime()) / 1000);
    const remainingSeconds = Math.max(0, QUIZ_DURATION_SECONDS - elapsedSeconds);

    return res.json({
      success: true,
      message: 'Assessment countdown started.',
      startedAt: attempt.startedAt,
      remainingSeconds,
      durationSeconds: QUIZ_DURATION_SECONDS,
      savedAnswers: attempt.answers || {},
    });
  } catch (error) {
    console.error('Error starting quiz:', error);
    return res.status(500).json({ success: false, message: 'Failed to initiate quiz countdown on server.' });
  }
};

// Return sanitized questions WITHOUT correctAnswer or explanation
export const getQuestions = async (req, res) => {
  try {
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

    return res.json({
      success: true,
      total: questionsList.length,
      questions: questionsList,
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve assessment questions.' });
  }
};

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

export const submitQuiz = async (req, res) => {
  try {
    const { registerNumber, isAutoSubmit } = req.body;
    if (!registerNumber) {
      return res.status(400).json({ success: false, message: 'Register Number required for submission.' });
    }

    const regNoClean = registerNumber.trim();
    const attempt = memoryStore.quizAttempts.get(regNoClean);

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Quiz attempt not found.' });
    }

    if (attempt.status === 'COMPLETED') {
      // Already submitted - return finalized private score
      return res.json({
        success: true,
        message: 'Quiz was already finalized.',
        result: {
          studentName: attempt.studentName,
          registerNumber: attempt.registerNumber,
          score: attempt.score,
          total: TOTAL_QUESTIONS,
          percentage: attempt.percentage,
          timeFormatted: attempt.timeFormatted,
          submittedAt: attempt.submittedAt,
        },
      });
    }

    const startTime = attempt.startedAt ? new Date(attempt.startedAt).getTime() : Date.now();
    const endTime = Date.now();
    const elapsedSeconds = Math.min(QUIZ_DURATION_SECONDS, Math.floor((endTime - startTime) / 1000));

    // SERVER-SIDE SCORE COMPUTATION (Secure)
    let correctCount = 0;
    const studentAnswers = attempt.answers || {};

    const masterQuestions = Array.from(memoryStore.questions.values());
    const sourceQuestions = masterQuestions.length > 0 ? masterQuestions : INITIAL_QUESTIONS;

    sourceQuestions.forEach((q) => {
      const qId = String(q.questionId || q.id);
      const studentChoice = studentAnswers[qId];
      if (studentChoice && studentChoice === q.correctAnswer) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / TOTAL_QUESTIONS) * 100);

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
    attempt.percentage = percentage;

    memoryStore.quizAttempts.set(regNoClean, attempt);

    // RETURN STRICTLY PRIVATE SUMMARY (No answers, no answer keys, no other students)
    return res.json({
      success: true,
      message: isAutoSubmit ? 'Time expired. Assessment submitted automatically.' : 'Assessment submitted successfully.',
      result: {
        studentName: attempt.studentName,
        registerNumber: attempt.registerNumber,
        score: correctCount,
        total: TOTAL_QUESTIONS,
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

export const getStudentResult = async (req, res) => {
  try {
    const { registerNumber } = req.params;
    if (!registerNumber) {
      return res.status(400).json({ success: false, message: 'Register Number required.' });
    }

    const regNoClean = registerNumber.trim();
    const attempt = memoryStore.quizAttempts.get(regNoClean);

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
        total: TOTAL_QUESTIONS,
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
