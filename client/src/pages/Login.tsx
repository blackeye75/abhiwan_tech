// src/pages/Login.tsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err);
      alert("Login failed",);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-10 w-full h-screen" >
    <h1 className="text-center text-3xl font-semibold">Start Creating Todos together and complete them as well Together!</h1>
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-full h-fit  flex sm:mx-auto justify-center flex-col">
      <input className="bg-gray-200 rounded-lg p-2 sm:w-xl " name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input className="bg-gray-200 rounded-lg p-2 sm:w-xl " name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button className="bg-blue-500 rounded-lg px-3 py-1 font-medium uppercase" type="submit">Login</button>
    </form>
    </div>
  );
};

export default Login;
