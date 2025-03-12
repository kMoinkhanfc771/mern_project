import express from 'express';
import { protect, isAdmin, optionalAuth } from '../middleware/authMiddleware.js';
import { 
  createOrder, 
  getUserOrders, 
  getAllOrders,
  updateOrderStatus,
  deleteOrder 
} from '../controllers/orderController.js';

const router = express.Router();

// User routes
router.post('/create', optionalAuth, createOrder);
router.get('/user-orders', protect, getUserOrders);

// Admin routes
router.get('/all', protect, isAdmin, getAllOrders);
router.put('/:orderId', protect, isAdmin, updateOrderStatus);
router.delete('/:orderId', protect, isAdmin, deleteOrder);

export default router;
