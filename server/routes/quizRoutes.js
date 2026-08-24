import express from 'express';
import {
  startQuiz,
  getQuestions,
  saveAnswer,
  submitQuiz,
  getStudentResult,
} from '../controllers/quizController.js';

const router = express.Router();

router.post('/start', startQuiz);
router.get('/questions', getQuestions);
router.patch('/save-answer', saveAnswer);
router.post('/submit', submitQuiz);
router.get('/result/:registerNumber', getStudentResult);

export default router;
