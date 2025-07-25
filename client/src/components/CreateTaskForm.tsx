// import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const CreateTask = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    // console.log(token);


    try {
      const response = await axios.post("/api/tasks/create", {
        ...formData,
        userId: user?._id, // 🔑 Your current AuthContext has this
      }, { headers: { Authorization: `Bearer ${token}` } });

      console.log("Task Created:", response.data);
      window.location.reload(); // Reload to fetch new tasks
      // Optionally clear form or redirect
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 border rounded">
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        name="description"
        placeholder="Task Description"
        value={formData.description}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
      >
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Create Task
      </button>
    </form>
  );
};

export default CreateTask;
