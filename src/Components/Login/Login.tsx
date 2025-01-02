import React, { useState } from "react";
import "./Login.css";
import home from "../../assets/home.jpg";
import { loginUser } from "../../api";
import { useNavigate } from "react-router-dom";

interface SignInFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);

      localStorage.setItem("role", response.role);
      // Dispatch custom event for NavBar update
      window.dispatchEvent(
        new CustomEvent("authChange", {
          detail: { role: response.role },
        })
      );

      if (response.role === "admin") {
        navigate("/admin");
      } else if (response.role === "user") {
        navigate("/");
      } else {
        throw new Error("Invalid role.");
      }

      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.message);
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
            <div className="input-group">
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
            </div>
            <button type="submit" className="signin-button">
              Sign in
            </button>
          </form>
          <h2 className="adventure-text">SIGN IN TO YOUR ADVENTURE!</h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
