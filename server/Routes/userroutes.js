import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', protect, authorize('ADMIN'), async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

export default router;
