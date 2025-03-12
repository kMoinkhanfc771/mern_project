import express from 'express';
import { loginUser, registerUser, getUser, logoutUser } from '../controllers/authController.js';
import { adminLogin } from '../controllers/adminController.js';

const router = express.Router();

// Block admin registration
router.post('/admin/register', (_, res) => {
    res.status(403).json({
        success: false,
        message: 'Admin registration is not allowed'
    });
});

router.post('/admin/login', adminLogin);

// Regular routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/user', getUser);

export default router;