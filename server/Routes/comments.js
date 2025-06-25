import express from 'express';
import { body } from 'express-validator';
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  likeComment
} from '../controllers/comments.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const commentValidation = [
  body('content').trim().isLength({ min: 1, max: 500 }).withMessage('Comment must be between 1 and 500 characters')
];

// Public routes
router.get('/post/:postId', getComments);

// Protected routes
router.use(protect);
router.post('/', commentValidation, createComment);
router.put('/:id', commentValidation, updateComment);
router.delete('/:id', deleteComment);
router.put('/:id/like', likeComment);

export default router;