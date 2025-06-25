import express from 'express';
import { getUsers, getUser } from '../controllers/users.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.use(protect);
router.get('/', authorize('admin'), getUsers);
router.get('/:id', getUser);

export default router;