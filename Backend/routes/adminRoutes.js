import express from 'express';
import { getUsers, updateUserRole, deleteUser } from '../controllers/userController.js';
import { createCourse, updateCourse, deleteCourse, updateModules } from '../controllers/courseController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected and admin only
router.use(protect);
router.use(admin);

// User management
router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

// Course management (Create is already in apiRoutes but we can put it here or keep it there)
// But for consistency let's define them
router.post('/courses', createCourse);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);
router.put('/courses/:id/modules', updateModules);

export default router;
