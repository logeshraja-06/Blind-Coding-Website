import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

const JWT_SECRET = process.env.JWT_SECRET || 'TECH_FORCE_BLIND_CODING_2026_SECRET_KEY';

export const protectAdmin = async (req, res, next) => {
  let token;

  // Check Authorization Header: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    // Check query parameter (used for secure browser stream downloads like PDF/XLSX)
    token = req.query.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Administrator authentication token required.',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin account not found or has been revoked.',
      });
    }

    req.admin = admin;
    return next();
  } catch (error) {
    const isExpired = error.name === 'TokenExpiredError';
    return res.status(401).json({
      success: false,
      message: isExpired
        ? 'Session expired. Please log in again to renew administrator session.'
        : 'Not authorized, invalid admin authentication token.',
    });
  }
};
