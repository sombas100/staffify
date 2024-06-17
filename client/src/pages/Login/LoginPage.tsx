import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
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
        <form onSubmit={handleLogin} className="flex max-w-md flex-col gap-4">
          <div>
            <TextInput
              id="email1"
              type="email"
              placeholder="Email"
              required
              onChange={(e) => e.target.value}
            />
          </div>
          <div>
            <TextInput
              id="password1"
              type="password"
              placeholder="Password"
              required
              onChange={(e) => e.target.value}
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
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
