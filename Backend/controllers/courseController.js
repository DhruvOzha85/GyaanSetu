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

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Admin
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (course) {
      Object.assign(course, req.body);
      const updatedCourse = await course.save();
      res.json(updatedCourse);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (course) {
      await course.deleteOne();
      // Also delete modules
      await Module.deleteMany({ courseId: course._id });
      res.json({ message: 'Course and its modules removed' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update course modules
// @route   PUT /api/courses/:id/modules
// @access  Private/Admin
export const updateModules = async (req, res) => {
  try {
    const courseId = req.params.id;
    // For simplicity, we'll replace all modules with the provided list
    // In a real app, you might want more granular updates
    await Module.deleteMany({ courseId });
    
    const modulesData = req.body.modules.map(m => ({
      ...m,
      courseId
    }));
    
    const createdModules = await Module.insertMany(modulesData);
    res.json(createdModules);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Fetch user's courses
// @route   GET /api/me/courses
// @access  Private
export const getMyCourses = async (req, res) => {
  try {
    // This is now handled by enrollmentController.getMyEnrollments
    // But keeping it for backward compatibility or direct access if needed
    res.json([]); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
