import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { registerUser, loginUser } from '../controllers/userController.js';

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});

export default router;
