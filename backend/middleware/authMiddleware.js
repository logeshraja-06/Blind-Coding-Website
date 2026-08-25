import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { memoryStore } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'TECH_FORCE_BLIND_CODING_2026_SECRET_KEY';

export const protectAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      // Check Mongoose model first, fallback to memoryStore
      let admin = null;
      try {
        admin = await Admin.findById(decoded.id).select('-password');
      } catch (err) {
        // memory fallback
      }

      if (!admin) {
        admin = memoryStore.admins.get(decoded.id) || {
          id: decoded.id,
          name: decoded.name || 'TECH FORCE Admin',
          email: decoded.email,
          role: decoded.role || 'EVENT_ADMIN',
        };
      }

      req.admin = admin;
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, invalid or expired admin session token.',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Administrator authentication token required.',
    });
  }
};
