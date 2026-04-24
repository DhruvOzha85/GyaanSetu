import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Module from '../models/Module.js';
import Lab from '../models/Lab.js';
import Project from '../models/Project.js';
import { courses, labs, projects, courseModules } from '../data/mock.js';

export const seedDatabase = async (req, res) => {
  try {
    // Clear existing data
    await Course.deleteMany();
    await Module.deleteMany();
    await Lab.deleteMany();
    await Project.deleteMany();
    await User.deleteMany();

    // Insert Courses
    const createdCourses = await Course.insertMany(courses);

    // Insert Modules for each course
    for (const course of createdCourses) {
      const modulesToInsert = courseModules.map(mod => ({
        courseId: course._id,
        title: mod.title,
        lessons: mod.lessons.map(l => ({
          title: l.title,
          duration: l.duration,
          type: l.type,
          completed: l.completed
        }))
      }));
      await Module.insertMany(modulesToInsert);
    }

    // Insert Labs & Projects
    await Lab.insertMany(labs);
    await Project.insertMany(projects);

    // Create Admin and Student Users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@1234', salt);
    
    await User.create({
      name: 'Admin User',
      email: 'admin@gyaansetu.in',
      password: hashedPassword,
      role: 'admin'
    });

    const studentPassword = await bcrypt.hash('Student@1234', salt);
    await User.create({
      name: 'Arjun Sharma',
      email: 'arjun@gyaansetu.in',
      password: studentPassword,
      role: 'student'
    });

    res.json({ message: 'Database seeded successfully on Render!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
