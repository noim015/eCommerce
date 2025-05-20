import express from 'express';
const router = express.Router();

import { protect } from '../middleware/authMiddleware.js';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js';

router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);


export default router;
