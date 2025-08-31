import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully! Login now.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Error during signup");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="border p-2" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2" required />
        <button className="bg-blue-500 text-white p-2 mt-2 rounded">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
