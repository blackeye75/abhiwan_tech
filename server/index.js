import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import taskRoutes from './routes/taskRoutes.js';
import path from 'path';

dotenv.config();
const app = express();
const __dirname = path.resolve();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());



connectDB(); // MongoDB connect


app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
console.log(process.env.NODE_ENV);


if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "../client/dist");
  app.use(express.static(clientBuildPath));

  // use wildcard properly
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname,"../client","dist", "index.html"));
  });
}
app.use(errorHandler); // custom error handler

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
