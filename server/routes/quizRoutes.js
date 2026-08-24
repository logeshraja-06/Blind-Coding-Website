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

const router = express.Router();

router.get('/config', getPublicQuizConfig);
router.post('/start', startQuiz);
router.get('/questions', getQuestions);
router.patch('/save-answer', saveAnswer);
router.post('/activity', logActivity);
router.post('/submit', submitQuiz);
router.get('/result/:registerNumber', getStudentResult);

export default router;
