import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedDatabase } from './utils/seedData.js';
import { generalLimiter } from './middleware/rateLimiter.js';

// Route Imports
import studentRoutes from './routes/studentRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import exportRoutes from './routes/exportRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security HTTP Headers
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
  })
);

// Restricted CORS Configuration (Using CLIENT_URL from environment)
const rawClientUrls = process.env.CLIENT_URL || 'http://localhost:5173,http://localhost:5174,http://localhost:5175';
const allowedOrigins = rawClientUrls
  .split(',')
  .map((url) => url.trim().replace(/\/$/, ''))
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser agents (Postman, curl, internal server calls)
    if (!origin) return callback(null, true);

    const isAllowed =
      allowedOrigins.includes(origin) ||
      (process.env.NODE_ENV !== 'production' && origin.startsWith('http://localhost:'));

    if (isAllowed) {
      return callback(null, true);
    }
    return callback(new Error(`CORS Error: Origin ${origin} not permitted by security policy.`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(generalLimiter);
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    database: 'MongoDB Atlas',
    security: 'Production Hardened',
    event: 'TECH FORCE presents BLIND CODING 2026',
    department: 'Department of Computer Science and Engineering',
    academicYear: '2025–2026',
    organizers: 'CSE Association & CSI Student Chapter',
    timestamp: new Date().toISOString(),
  });
});

// API Routes Mounting
app.use('/api/students', studentRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/export', exportRoutes);

// Global 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `API endpoint ${req.originalUrl} not found.` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  if (err.message && err.message.includes('CORS Error')) {
    return res.status(403).json({
      success: false,
      message: err.message,
    });
  }

  console.error('Server error:', err.message);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Server and Initialize Seeds (Fails safely if MongoDB is unreachable)
const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`\n======================================================`);
      console.log(`🚀 BLINDCODE SECURE SERVER RUNNING ON PORT: ${PORT}`);
      console.log(`🛡️ CORS Client Origins: ${allowedOrigins.join(' | ')}`);
      console.log(`📍 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`🦁 Organizers: CSE Association & CSI Student Chapter`);
      console.log(`======================================================\n`);
    });
  } catch (error) {
    console.error('❌ Server startup aborted due to critical database error:', error.message);
    process.exit(1);
  }
};

startServer();
