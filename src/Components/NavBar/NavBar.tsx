import React from 'react';
import './NavBar.css';

interface NavLink {
  label: string;
  path: string;
}

interface HeaderProps {
  logoSrc: string; // Logo image path
  navLinks: NavLink[]; // Array of navigation links
  activeLink: string; // Active link path
}

const Header: React.FC<HeaderProps> = ({ logoSrc, navLinks, activeLink }) => {
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
    </header>
  );
};

export default Header;
