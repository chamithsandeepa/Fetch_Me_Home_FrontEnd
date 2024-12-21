// NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
//import logos from '../../assets/logos.jpg'; // Correct the import path

interface NavBarProps {
  logoSrc: string;
  navLinks: { label: string; path: string; }[];
}

const NavBar: React.FC<NavBarProps> = ({ logoSrc, navLinks }) => {
  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="logo-container">
          <Link to="/">
            <img src={logoSrc} alt="Fetch Me Home" className="logo" />
          </Link>
        </div>

        <nav className="nav-links">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} className="nav-link">
              {link.label}
            </Link>
          ))}
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
