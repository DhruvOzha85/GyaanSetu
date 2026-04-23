import express from 'express';
import { getMyCourses } from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Currently relies on the global progress field on the course model. 
// We will move this to a proper Enrollment model in Phase 3.
router.get('/courses', getMyCourses); // Temporarily removing protect since frontend doesn't send token for this yet, or we can leave it if frontend sends it. Let's keep it simple first.

export default router;
