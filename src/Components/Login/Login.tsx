import React, { useState } from 'react';
import './Login.css';
import home from '../../assets/home.jpg';
import { loginUser } from '../../api'; // Adjust the path to your Axios file

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      console.log(response); // Handle successful login (e.g., save token, navigate)
      alert('Login successful!');
      setErrorMessage(null); // Clear any previous errors
    } catch (error: any) {
      setErrorMessage(error.message); // Display error to the user
    }
  };

  return (
    <div className="signin-container">
      {/* Left side - Image */}
      <div className="image-section">
        <img src={home} alt="Dog and cat together" className="feature-image" />
      </div>

      {/* Right side - Sign In Form */}
      <div className="form-section">
        <div className="form-container">
          <h1>SIGN IN</h1>
          <p className="subtitle">Sign in with email address and password</p>

          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display errors */}

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

export default SignIn;
