import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import LoginPage from "./pages/Login/LoginPage";
import { RegisterPage } from "./pages/Register/RegisterPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import StaffPage from "./pages/Staff/StaffPage";

import { axiosInstance, setAuthToken } from "./api/axiosConfig";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      const token = res.data.token;
      localStorage.setItem("token", token); // Store token in localStorage
      setAuthToken(token); // Set token in Axios headers
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/staff"
          element={
            isAuthenticated ? <StaffPage /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
