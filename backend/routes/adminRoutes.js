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
  getParticipantReview,
} from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { adminLoginLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public Admin Login with brute force defense
router.post('/login', adminLoginLimiter, adminLogin);

// Protected Admin Endpoints (Student Access Strictly Blocked)
router.get('/dashboard', protectAdmin, getDashboardStats);
router.get('/participants', protectAdmin, getParticipants);
router.get('/participants/:id/review', protectAdmin, getParticipantReview);
router.get('/participants/:id', protectAdmin, getParticipantReview);
router.get('/activity', protectAdmin, getAdminActivity);
router.get('/leaderboard', protectAdmin, getLeaderboard);
router.get('/questions', protectAdmin, getQuestionsBank);
router.post('/questions', protectAdmin, addQuestion);
router.get('/settings', protectAdmin, getAdminSettings);
router.put('/settings', protectAdmin, updateAdminSettings);

export default router;
