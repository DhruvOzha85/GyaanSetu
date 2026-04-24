import express from 'express';
import { getCourses, getCourseById, getCourseModules } from '../controllers/courseController.js';
import { getLabs } from '../controllers/labController.js';
import { getProjects } from '../controllers/projectController.js';
import { seedDatabase } from '../controllers/seedController.js';

const router = express.Router();

router.get('/courses', getCourses);
router.get('/courses/:id', getCourseById);
router.get('/courses/:id/modules', getCourseModules);
router.get('/labs', getLabs);
router.get('/projects', getProjects);
router.get('/seed', seedDatabase);

export default router;
