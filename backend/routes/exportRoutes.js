import express from 'express';
import { exportPdf, exportExcel } from '../controllers/exportController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected Export Endpoints
router.get('/pdf', exportPdf);
router.get('/xlsx', exportExcel);
router.get('/csv', exportExcel);

export default router;
