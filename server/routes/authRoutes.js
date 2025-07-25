import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { createTask, getTasks } from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post("/create", authMiddleware, createTask);
router.get("/get", authMiddleware, getTasks);

export default router;
