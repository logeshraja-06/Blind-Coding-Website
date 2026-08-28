import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { Student } from '../models/Student.js';
import { QuizAttempt } from '../models/QuizAttempt.js';

dotenv.config();

/**
 * ============================================================================
 * TEST STUDENT CLEANUP UTILITY (ISOLATED & SAFE)
 * ============================================================================
 * Logesh: Add the register numbers or names of your test entries below.
 * Running `npm run cleanup:test-students` will perform a SAFE DRY RUN first.
 * Re-run with `node utils/removeTestStudents.js --confirm` to permanently delete.
 */

// 1. Array of test register numbers to delete (e.g., ["TEST001", "999999", "DEMO123"])
const TEST_REGISTER_NUMBERS = [
  // 👉 Fill in test register numbers here before running
];

// 2. Array of test student names to delete (case-insensitive exact match, e.g., ["Test User", "Demo Student", "asdf"])
const TEST_STUDENT_NAMES = [
  // 👉 Fill in test student names here before running
];

const runCleanup = async () => {
  // Clean inputs
  const cleanRegs = TEST_REGISTER_NUMBERS.map((r) => String(r).trim().toUpperCase()).filter(Boolean);
  const cleanNames = TEST_STUDENT_NAMES.map((n) => String(n).trim()).filter(Boolean);

  // Safety Guard: Refuse to run against empty filters
  if (cleanRegs.length === 0 && cleanNames.length === 0) {
    console.error('\n❌ [SAFETY GUARD TRIPPED] Both TEST_REGISTER_NUMBERS and TEST_STUDENT_NAMES are empty!');
    console.error('Please open backend/utils/removeTestStudents.js and add the test register numbers or student names you wish to clean up.');
    console.error('Example:\n  const TEST_REGISTER_NUMBERS = ["TEST001", "999999"];\n  const TEST_STUDENT_NAMES = ["Test User"];\n');
    process.exit(1);
  }

  try {
    await connectDB();

    // Construct Mongoose query filters
    const nameRegexes = cleanNames.map((n) => new RegExp(`^${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i'));

    const studentOrConditions = [];
    if (cleanRegs.length > 0) studentOrConditions.push({ registerNumber: { $in: cleanRegs } });
    if (nameRegexes.length > 0) {
      nameRegexes.forEach((regex) => studentOrConditions.push({ name: regex }));
    }
    const studentQuery = { $or: studentOrConditions };

    const attemptOrConditions = [];
    if (cleanRegs.length > 0) attemptOrConditions.push({ registerNumber: { $in: cleanRegs } });
    if (nameRegexes.length > 0) {
      nameRegexes.forEach((regex) => attemptOrConditions.push({ studentName: regex }));
    }
    const attemptQuery = {
      eventId: 'BLIND_CODING_2026',
      $or: attemptOrConditions,
    };

    // Find matching documents
    const [matchingStudents, matchingAttempts] = await Promise.all([
      Student.find(studentQuery),
      QuizAttempt.find(attemptQuery),
    ]);

    console.log('\n================================================================');
    console.log('📋 TEST STUDENT CLEANUP AUDIT SUMMARY');
    console.log('================================================================');
    console.log(`Filter Register Numbers : [ ${cleanRegs.join(', ') || 'None'} ]`);
    console.log(`Filter Student Names    : [ ${cleanNames.join(', ') || 'None'} ]`);
    console.log('----------------------------------------------------------------');

    if (matchingStudents.length === 0 && matchingAttempts.length === 0) {
      console.log('ℹ️ No matching Student or QuizAttempt records found in MongoDB.');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Build consolidated display list
    const combinedRecords = new Map();

    matchingStudents.forEach((st) => {
      combinedRecords.set(st.registerNumber, {
        name: st.name,
        registerNumber: st.registerNumber,
        class: `${st.year} ${st.class} ${st.section}`.trim(),
        status: 'STUDENT_RECORD',
        score: 'N/A',
      });
    });

    matchingAttempts.forEach((att) => {
      const existing = combinedRecords.get(att.registerNumber) || {};
      combinedRecords.set(att.registerNumber, {
        name: att.studentName || existing.name || 'Unknown',
        registerNumber: att.registerNumber,
        class: `${att.year || ''} ${att.class || ''} ${att.section || ''}`.trim() || existing.class || 'N/A',
        status: att.status || 'N/A',
        score: att.score !== null && att.score !== undefined ? `${att.score}/${att.totalQuestions}` : 'Not Scored',
      });
    });

    console.log(`Found ${matchingStudents.length} Student doc(s) and ${matchingAttempts.length} QuizAttempt doc(s):\n`);

    console.table(
      Array.from(combinedRecords.values()).map((rec) => ({
        Name: rec.name,
        'Register No': rec.registerNumber,
        Class: rec.class,
        Status: rec.status,
        Score: rec.score,
      }))
    );

    const isConfirm = process.argv.includes('--confirm');

    if (!isConfirm) {
      console.log('\n----------------------------------------------------------------');
      console.log('🔍 [DRY RUN COMPLETE] No database changes were made.');
      console.log('To permanently delete these matching test records from MongoDB, run:');
      console.log('👉 node utils/removeTestStudents.js --confirm\n');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Actual Deletion Mode (--confirm flag passed)
    console.log('\n⚠️ [CONFIRMATION RECEIVED] Deleting matched test records from MongoDB...');

    const [studentDelResult, attemptDelResult] = await Promise.all([
      Student.deleteMany(studentQuery),
      QuizAttempt.deleteMany(attemptQuery),
    ]);

    console.log('\n================================================================');
    console.log('✅ [CLEANUP COMPLETED SUCCESSFULLY]');
    console.log(`• Student documents deleted    : ${studentDelResult.deletedCount}`);
    console.log(`• QuizAttempt documents deleted: ${attemptDelResult.deletedCount}`);
    console.log('================================================================\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ [CLEANUP ERROR]:', error.message);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

runCleanup();
