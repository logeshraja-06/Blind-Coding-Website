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

// 2. Student Registration Limiter: Supports shared lab networks (up to 500 candidates per window)
export const registrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Supports entire batch of 100+ candidates on shared lab IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many registration requests from this network. Please try again shortly.',
  },
});

// 3. Quiz Activity Telemetry Limiter: Supports shared lab networks
export const quizActivityLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Activity logging frequency exceeded limit.',
  },
});

// 4. Answer Save Limiter: High capacity for 100+ active candidates on shared lab NAT IP
export const saveAnswerLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5000, // 5000 answer pings per minute per IP to accommodate shared lab routers
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
  max: 5000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Request rate limit reached. Please try again later.',
  },
});
