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
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/staff" element={<StaffPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
