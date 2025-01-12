import React from "react";
import "./AdminNavBar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

const AdminNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("role");
    window.dispatchEvent(new CustomEvent("authChange"));
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <nav className="navbar-container">
        <div className="navbar-inner">
          {/* Logo/Brand */}
          <div className="navbar-logo">
            <span className="navbar-logo-text">Pet Adoption Admin</span>
          </div>

          {/* Navigation Links */}
          <div className="navbar-links">
            <NavLink
              icon={null}
              text="Home"
              to="/admin/home"
              isActive={location.pathname === "/admin/home"}
            />
            <NavLink
              icon={null}
              text="Pet Listing"
              to="/admin/pets"
              isActive={location.pathname === "/admin/pets"}
            />
            <NavLink
              icon={null}
              text="Add a Pet"
              to="/admin/add-pet"
              isActive={location.pathname === "/admin/add-pet"}
            />
            <NavLink
              icon={null}
              text="User Accounts"
              to="/admin/user-accounts"
              isActive={location.pathname === "/admin/user-accounts"}
            />
          </div>

          {/* Right side - Admin Controls */}
          <div className="navbar-controls">
            <button
              className="navbar-control-btn-logout"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

// NavLink component with active state
const NavLink = ({
  icon,
  text,
  to,
  isActive,
}: {
  icon: React.ReactNode;
  text: string;
  to: string;
  isActive: boolean;
}) => (
  <Link to={to} className={`nav-link ${isActive ? "active" : ""}`}>
    {icon}
    <span>{text}</span>
  </Link>
);

export default AdminNavBar;
