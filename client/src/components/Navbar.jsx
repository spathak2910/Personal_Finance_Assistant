import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="flex justify-between bg-gray-800 text-white p-4">
      <h1 className="font-bold">Personal Finance</h1>
      <div>
        {!isLoggedIn && <Link to="/login" className="mx-2">Login</Link>}
        {!isLoggedIn && <Link to="/signup" className="mx-2">Signup</Link>}
        {isLoggedIn && <button onClick={handleLogout} className="mx-2">Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
