import mongoose from 'mongoose';

// High-speed In-Memory DB Store used when MongoDB is connecting or as zero-config local engine
export const memoryStore = {
  students: new Map(),
  questions: new Map(),
  quizAttempts: new Map(),
  admins: new Map(),
  eventConfig: {
    eventTitle: 'BLIND CODING',
    quizDurationMinutes: 60,
    totalQuestions: 25,
    eventStartAt: null,
    eventEndAt: null,
    quizAvailability: 'ACTIVE', // 'ACTIVE' | 'INACTIVE'
    maxActivityWarnings: 2,
    autoSubmitOnWarningLimit: true,
    fullscreenRequired: true,
    tabSwitchMonitoring: true,
    passingPercentage: 50,
    allowAnswerChange: true,
  },
};

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('⚡ [BLINDCODE SERVER] Running in High-Speed In-Memory & File Store Mode');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`✅ [MONGODB] Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ [MONGODB] Connection note: ${error.message}. Operating with in-memory persistence layer.`);
    return false;
  }
};
