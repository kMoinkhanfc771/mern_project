import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if it's an admin token
    if (decoded.role === 'admin') {
      req.user = { role: 'admin' };
      return next();
    }
    
    // For regular users
    req.user = await User.findById(decoded.user.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Not authorized, token failed'
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized as admin'
      });
    }
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Admin authorization failed'
    });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    // Get token from header or cookie
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      // If no token, continue without authentication
      return next();
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    // If token verification fails, continue without authentication
    next();
  }
};
