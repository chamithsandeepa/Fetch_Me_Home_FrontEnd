import React from 'react';
import './NavBar.css';

interface NavLink {
  label: string;
  path: string;
}

interface HeaderProps {
  logoSrc: string;          // Logo image path
  navLinks: NavLink[];      // Array of navigation links
  activeLink: string;       // Active link path
  showAuthButtons?: boolean; // Optional prop to show Register/Login buttons
}

const Header: React.FC<HeaderProps> = ({ logoSrc, navLinks, activeLink, showAuthButtons }) => {
  return (
    <header className="header">
      <img src={logoSrc} alt="Fetch Me Home" className="logo" />
      <nav className="nav-links">
        {navLinks.map((link) => (
          <a
            key={link.path}
            href={link.path}
            className={`nav-link ${activeLink === link.path ? 'active' : ''}`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Conditionally show Register/Login buttons */}
      {showAuthButtons && (
        <div className="header-cta">
          <button className="register-btn">Register</button>
          <button className="login-btn">Login</button>
        </div>
      )}
    </header>
  );
};

export default Header;
