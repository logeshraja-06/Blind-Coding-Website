import express from 'express';
import { registerStudent, checkRegisterNumber } from '../controllers/studentController.js';
import { registrationLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', registrationLimiter, registerStudent);
router.get('/check/:registerNumber', checkRegisterNumber);

export default router;
