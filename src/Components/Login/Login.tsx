import React, { useState } from 'react';
import './Login.css';
import home from '../../assets/home.jpg';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log('Sign in attempted with:', formData);
  };

  return (
    <div className="signin-container">
      {/* Left side - Image */}
      <div className="image-section">
        <img 
          src={home} 
          alt="Dog and cat together"
          className="feature-image"
        />
      </div>

      {/* Right side - Sign In Form */}
      <div className="form-section">
        <div className="form-container">
          <h1>SIGN IN</h1>
          <p className="subtitle">Sign in with email address and password</p>

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

          <h2 className="adventure-text">
            SIGN IN TO YOUR ADVENTURE!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SignIn;