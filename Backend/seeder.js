import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Course from './models/Course.js';
import Module from './models/Module.js';
import Lab from './models/Lab.js';
import Project from './models/Project.js';
import { courses, labs, projects, courseModules } from './data/mock.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/GyaanSetu')
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch((err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });

const importData = async () => {
  try {
    await Course.deleteMany();
    await Module.deleteMany();
    await Lab.deleteMany();
    await Project.deleteMany();
    await User.deleteMany();

    // Insert Courses
    const createdCourses = await Course.insertMany(courses);

    // Insert Modules for each course (so every course has some content)
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

    console.log('Data Imported successfully! (Including Users)');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
