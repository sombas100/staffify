import { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import styles from "./RegisterPage.module.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });
      navigate("/login");
      setPassword("");
      setEmail("");
    } catch (error) {
      setError("Failed to register user");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1
          style={{ marginLeft: "60px", fontSize: "25px" }}
          className="mb-5 font-bold"
        >
          Start managaging your staff
        </h1>
        <form
          onSubmit={handleRegister}
          className="flex max-w-md flex-col gap-4"
        >
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
              <Link to="/login">
                Already have a staffify account?{" "}
                <span
                  className={styles.span}
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  Login here
                </span>
              </Link>
            </p>
          </div>
          <Button typeof="submit" gradientMonochrome="failure" type="submit">
            Register
          </Button>
          <div>{error}</div>
        </form>
      </div>
    </div>
  );
};
