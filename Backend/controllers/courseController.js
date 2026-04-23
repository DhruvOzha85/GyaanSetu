import Course from '../models/Course.js';
import Module from '../models/Module.js';

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single course
// @route   GET /api/courses/:id
// @access  Public
export const getCourseById = async (req, res) => {
  try {
    // Attempt to find by ID, or if it's a slug, find by slug
    // We can use a simple regex to check if it's a valid ObjectId
    const isObjectId = req.params.id.match(/^[0-9a-fA-F]{24}$/);
    
    let course;
    if (isObjectId) {
      course = await Course.findById(req.params.id);
    } else {
      // Find by slug (e.g. for /courses/python-for-data-science) or legacy c_1 IDs
      course = await Course.findOne({ $or: [{ slug: req.params.id }, { id: req.params.id }] });
    }

    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch course modules
// @route   GET /api/courses/:id/modules
// @access  Public
export const getCourseModules = async (req, res) => {
  try {
    const isObjectId = req.params.id.match(/^[0-9a-fA-F]{24}$/);
    let course;
    if (isObjectId) {
      course = await Course.findById(req.params.id);
    } else {
      course = await Course.findOne({ $or: [{ slug: req.params.id }, { id: req.params.id }] });
    }

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const modules = await Module.find({ courseId: course._id });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Admin
export const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Fetch user's courses
// @route   GET /api/me/courses
// @access  Private (Currently public mock)
export const getMyCourses = async (req, res) => {
  try {
    const myCourses = await Course.find({ progress: { $gt: 0 } });
    res.json(myCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
