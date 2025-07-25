// src/pages/Signup.tsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(form.name, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-fit flex flex-col mx-auto">
      <input className="bg-gray-200 rounded-lg p-2" name="name" type="text" placeholder="Name" onChange={handleChange} required />
      <input className="bg-gray-200 rounded-lg p-2" name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input className="bg-gray-200 rounded-lg p-2" name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button className="bg-blue-500 rounded-lg px-3 py-1 font-medium uppercase"  type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
