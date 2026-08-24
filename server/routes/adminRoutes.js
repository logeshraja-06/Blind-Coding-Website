import express from 'express';
import {
  adminLogin,
  getDashboardStats,
  getParticipants,
  getLeaderboard,
  getQuestionsBank,
  addQuestion,
  getAdminActivity,
  getAdminSettings,
  updateAdminSettings,
} from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Admin Login
router.post('/login', adminLogin);

// Protected Admin Endpoints
router.get('/dashboard', protectAdmin, getDashboardStats);
router.get('/participants', protectAdmin, getParticipants);
router.get('/activity', protectAdmin, getAdminActivity);
router.get('/leaderboard', protectAdmin, getLeaderboard);
router.get('/questions', protectAdmin, getQuestionsBank);
router.post('/questions', protectAdmin, addQuestion);
router.get('/settings', protectAdmin, getAdminSettings);
router.put('/settings', protectAdmin, updateAdminSettings);

export default router;
