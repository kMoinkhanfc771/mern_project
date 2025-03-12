import express from 'express';
import { adminLogin, adminLogout } from '../controllers/adminController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', adminLogin);
router.post('/logout', protect, isAdmin, adminLogout);

export default router;
