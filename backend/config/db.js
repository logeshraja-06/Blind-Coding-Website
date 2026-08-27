import mongoose from 'mongoose';

/**
 * MongoDB Production Connection Manager
 * Strict rule: No silent fallback to in-memory store in production.
 * Fails safely with clear logs if MongoDB is unavailable.
 */
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.trim() === '') {
    console.error('\n❌ [MONGODB ERROR] MONGODB_URI is not configured in process.env!');
    console.error('Please verify your .env file contains a valid MongoDB Atlas connection string.\n');
    throw new Error('FATAL: MONGODB_URI environment variable is missing.');
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });

    console.log(`\n✅ [MONGODB CONNECTED] Host: ${conn.connection.host}`);
    console.log(`📂 [DATABASE] Using collection database: "${conn.connection.name}"`);
    return conn;
  } catch (error) {
    console.error('\n❌ [MONGODB CONNECTION FAILURE]');
    console.error(`Error details: ${error.message}`);
    console.error('The assessment platform requires an active MongoDB database for official records.');
    console.error('Halting server initialization to prevent unpersisted student data loss.\n');
    throw new Error(`FATAL: MongoDB connection failed: ${error.message}`);
  }
};
