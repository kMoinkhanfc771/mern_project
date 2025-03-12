import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
  addToCart, 
  removeFromCart, 
  getCart, 
  clearCart 
} from '../controllers/cartController.js';

const router = express.Router();

router.use(protect); // All cart routes require authentication

router.post('/add', addToCart);
router.delete('/remove/:productId', removeFromCart);
router.get('/', getCart);
router.post('/clear', clearCart);

export default router;
