import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  userId: {
    _id: string;
    username: string;
    email: string;
  };
}

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token"); // or from context
      const res = await axios.get("/api/tasks/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
      });

      setTasks(res.data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Welcome to Task Manager
      </h1>

      <h2 className="text-2xl text-center   font-thin mb-4">Public Task Feed</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.(Login First)</p>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-700">{task.description}</p>
              <p className="text-sm text-blue-600 mt-1">
                Status: <span className="font-medium">{task.status}</span>
              </p>
              <p className="text-sm text-green-700 mt-1">
                Created by:{" "}
                <span className="font-medium">{task.userId?.username}</span> (
                <span className="text-blue-700">{task.userId?.email}</span>)
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Created at: {new Date(task.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
