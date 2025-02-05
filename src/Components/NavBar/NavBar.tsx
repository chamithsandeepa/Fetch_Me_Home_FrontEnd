import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Fetch from "../../assets/Fetch.png";
import "./NavBar.css";

interface NavLink {
  label: string;
  path: string;
}

interface NavBarProps {
  logoSrc: string;
  navLinks: NavLink[];
}

const NavBar: React.FC<NavBarProps> = ({ logoSrc, navLinks }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path

  const updateAuthState = () => {
    const roleFromStorage = localStorage.getItem("role");
    setRole(roleFromStorage);
    setIsLoggedIn(!!roleFromStorage);
  };

  useEffect(() => {
    updateAuthState();
    const handleAuthChange = () => updateAuthState();
    window.addEventListener("authChange", handleAuthChange);
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    setRole(null);
    setIsLoggedIn(false);
    window.dispatchEvent(new CustomEvent("authChange"));
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="logo-container">
          <Link to="/">
            <img src={Fetch} alt="Fetch Me Home" className="logo" />
          </Link>
        </div>
        <nav className="nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${
                location.pathname === link.path ? "active" : ""
              }`} // Add active class
            >
              {link.label}
            </Link>
          ))}
          {role === "user" && (
            <Link
              to="/adopt"
              className={`nav-link ${
                location.pathname === "/adopt" ? "active" : ""
              }`}
            >
              Adopt a Pet
            </Link>
          )}
        </nav>
        <div className="auth-buttons">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="register-btn">
              Logout
            </button>
          ) : (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
