import express from 'express';
import { createTask, deleteTask, getAllTasks, getTasks, updateTask } from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createTask);
router.get("/get", authMiddleware, getTasks);
router.get("/all", authMiddleware, getAllTasks);
router.put("/:id", authMiddleware, updateTask); 
router.delete("/delete/:id", authMiddleware, deleteTask);

export default router;
