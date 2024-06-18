import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { setAuthToken } from "../../api/axiosConfig";

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onLogin(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1
          style={{ marginLeft: "60px", fontSize: "25px" }}
          className="mb-5 font-bold"
        >
          Start managaging staff
        </h1>
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
          <div>
            <TextInput
              id="email1"
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <TextInput
              id="password1"
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="remember">Remember me</Label>
            <Checkbox id="remember" />
            <p style={{ fontSize: "12px", paddingLeft: "90px" }}>
              <Link to="/register">
                Don't have a staffify account?{" "}
                <span
                  className={styles.span}
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  Register here
                </span>
              </Link>
            </p>
          </div>
          <Button typeof="submit" gradientMonochrome="failure" type="submit">
            Log in
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
