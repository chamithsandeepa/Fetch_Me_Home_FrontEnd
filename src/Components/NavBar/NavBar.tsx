// NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/logos.jpg'; // Update with your logo path

const NavBar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Fetch Me Home" className="logo" />
          </Link>
        </div>

        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About us</Link>
          <Link to="/blogs" className="nav-link">Blogs</Link>
          <Link to="/contact" className="nav-link">Contact us</Link>
        </nav>

        <div className="auth-buttons">
          <Link to="/register" className="register-btn">Register</Link>
          <Link to="/login" className="login-btn">Login</Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;