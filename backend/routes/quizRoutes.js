import express from 'express';
import {
  startQuiz,
  getQuestions,
  saveAnswer,
  submitQuiz,
  getStudentResult,
  logActivity,
  getPublicQuizConfig,
} from '../controllers/quizController.js';
import { quizActivityLimiter, saveAnswerLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.get('/config', getPublicQuizConfig);
router.post('/start', startQuiz);
router.get('/questions', getQuestions);
router.post('/save-answer', saveAnswerLimiter, saveAnswer);
router.patch('/save-answer', saveAnswerLimiter, saveAnswer);
router.post('/activity', quizActivityLimiter, logActivity);
router.post('/submit', submitQuiz);
router.get('/result/:registerNumber', getStudentResult);

export default router;
