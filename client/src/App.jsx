import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Transactions"; // Dashboard page shows transactions
import ProtectedRoute from "./components/ProtectedRoute"; // import it

const App = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/signup"
          element={!isLoggedIn ? <Signup /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />}
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
