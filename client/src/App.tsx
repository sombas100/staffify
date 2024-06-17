import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import LoginPage from "./pages/Login/LoginPage";
import { RegisterPage } from "./pages/Register/RegisterPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import StaffPage from "./pages/Staff/StaffPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/staff" element={<StaffPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
