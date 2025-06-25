import express from 'express';
import { body } from 'express-validator';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getMyPosts
} from '../controllers/posts.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const postValidation = [
  body('title').trim().isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  body('content').trim().isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
  body('category').isIn(['Technology', 'Lifestyle', 'Travel', 'Food', 'Health', 'Business', 'Other']).withMessage('Invalid category')
];

// Public routes
router.get('/', getPosts);
router.get('/:id', getPost);

// Protected routes
router.use(protect);
router.get('/user/my-posts', getMyPosts);
router.post('/', postValidation, createPost);
router.put('/:id', postValidation, updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like', likePost);

export default router;