import express from 'express';
import { registerStudent, checkRegisterNumber } from '../controllers/studentController.js';

const router = express.Router();

router.post('/register', registerStudent);
router.get('/check/:registerNumber', checkRegisterNumber);

export default router;
