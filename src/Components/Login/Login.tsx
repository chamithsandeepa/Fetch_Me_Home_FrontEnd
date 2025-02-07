import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import home from "../../assets/home.jpg";
import { SignInFormData } from "../../types/user";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        formData
      );
      localStorage.setItem("role", response.data.role);

      // Dispatch event to update NavBar
      window.dispatchEvent(
        new CustomEvent("authChange", { detail: { role: response.data.role } })
      );

      navigate(response.data.role === "admin" ? "/admin" : "/");
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="signin-container">
      <div className="image-section">
        <img src={home} alt="Dog and cat together" className="feature-image" />
      </div>
      <div className="form-section">
        <div className="form-container">
          <h1>SIGN IN</h1>
          <p className="subtitle">Sign in with email address and password</p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Yourname@gmail.com"
                required
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="signin-button">
              Sign in
            </button>
          </form>
          <div className="signup-prompt">
            <span>Not a member? </span>
            <Link to="/register" className="signup-link">
              Sign up Now
            </Link>
          </div>
          <h2 className="adventure-text">SIGN IN TO YOUR ADVENTURE!</h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
