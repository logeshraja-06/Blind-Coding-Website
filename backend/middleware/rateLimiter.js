import rateLimit from 'express-rate-limit';

/**
 * Production Rate Limiter Configurations
 * Protects against brute-force attacks and abuse while preserving normal quiz interaction speed.
 */

// 1. Admin Login Limiter: Strict defense against credential brute-forcing
export const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 failed login attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many admin authentication attempts from this IP address. Please try again after 15 minutes.',
  },
});

// 2. Student Registration Limiter: Prevents bot registration spam
export const registrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 25, // Up to 25 registrations per 15 minutes per IP (supports shared lab networks)
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many registration requests from this network. Please try again shortly.',
  },
});

// 3. Quiz Activity Telemetry Limiter: Prevents event logging flood
export const quizActivityLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // Max 60 activity ping events per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Activity logging frequency exceeded limit.',
  },
});

// 4. Answer Save Limiter: Generous limit so legitimate fast candidates never drop answers!
export const saveAnswerLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 180, // 180 answer changes per minute (up to 3 clicks/second)
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Answer submission frequency exceeded rate threshold. Please pause briefly before clicking again.',
  },
});

// 5. General API Limiter
export const generalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 500, // 500 general API calls per 5 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Request rate limit reached. Please try again later.',
  },
});
