import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import meRoutes from './routes/meRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/me', meRoutes);
app.use('/api/enroll', enrollmentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
