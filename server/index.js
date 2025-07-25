import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB(); // MongoDB connect
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler); // custom error handler

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
