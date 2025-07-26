import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface EditTaskFormProps {
  task: Task;
  onCancel: () => void;
}


const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onCancel }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `/api/tasks/${task._id}`,
        { title, description, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Task updated successfully!");
      setTimeout(() => {
        window.location.reload(); // reload to get updated task list
        // navigate("/dashboard"); // redirect to dashboard
      }, 1000);
    } catch (err:string | any) {
      setMessage("Failed to update task.");
      console.log(err.message);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="bg-white p-6 rounded shadow-md max-w-md"
    >
      <div className="mb-4">
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Status</label>
        <select
          className="w-full border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {message && (
        <p className="mb-4 text-sm text-green-600 font-medium">{message}</p>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Updating..." : "Update Task"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
