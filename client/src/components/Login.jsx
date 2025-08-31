import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/transactions");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2" required />
        <button className="bg-green-500 text-white p-2 mt-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
