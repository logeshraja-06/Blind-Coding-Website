import express from 'express';
import { exportPdf, exportExcel } from '../controllers/exportController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// All Export Endpoints strictly protected by Admin Authentication
router.get('/pdf', protectAdmin, exportPdf);
router.get('/xlsx', protectAdmin, exportExcel);
router.get('/csv', protectAdmin, exportExcel);

export default router;
