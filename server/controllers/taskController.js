import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Basic validation
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = await Task.create({
      title,
      description,
      status: status || "Pending",
      userId: req.user.userId, // Comes from authMiddleware
    });

    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error while creating task" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 }); // recent first

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// GET /api/tasks/all
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("userId", "username email"); // Populate user info
    res.status(200).json( {tasks} );
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to update this task" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    const updatedTask = await task.save();

    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
    console.log(error);
    
  }
};

// DELETE /api/tasks/delete/:id
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user._id; // assuming you set req.user in authMiddleware

    const deletedTask = await Task.findOneAndDelete({
      _id: taskId,
      user: userId, // ensures users can only delete their own tasks
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found or not authorized" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error while deleting task" });
  }
};
