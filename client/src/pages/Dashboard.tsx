
import CreateTask from "../components/CreateTaskForm";
import EditTaskForm from "../components/EditTaskForm";
import { useUserTasks } from "../components/useUserTasks";
import { useState } from "react";
import axios from "axios";

const Dashboard: React.FC = () => {
  const token = localStorage.getItem("token");
  const { tasks, loading, error, refetch } = useUserTasks(token); // make sure your hook supports refetch
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const handleEditClick = (taskId: string) => {
    setEditingTaskId(taskId);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(`/api/tasks/delete/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      refetch(); // fetch tasks again after delete
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const taskBeingEdited = tasks.find((task) => task._id === editingTaskId);

  return (
    <>
      <CreateTask />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
        {loading && <p>Loading tasks...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {tasks.length === 0 && !loading && <p>No tasks found.</p>}

        <ul className="grid gap-4">
          {tasks.map((task) => (
            <li key={task._id} className="p-4 border rounded shadow">
              <h2 className="font-semibold">{task.title}</h2>
              <p>{task.description}</p>
              <span className="text-sm text-gray-500">Status: {task.status}</span>
              <div className="mt-2 flex gap-2">
                <button
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                  onClick={() => handleEditClick(task._id)}
                >
                  Update
                </button>
                <button
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

      {editingTaskId && taskBeingEdited && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Edit Task</h2>
      <EditTaskForm task={taskBeingEdited} onCancel={handleCancelEdit} />
    </div>
  </div>
)}
      </div>
    </>
  );
};

export default Dashboard;
