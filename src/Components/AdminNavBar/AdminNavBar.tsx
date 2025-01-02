import React from "react";
import "./AdminNavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { Home, List, Users, BookOpen, Settings, LogOut } from "lucide-react";

const AdminNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem("role");

    // Dispatch auth change event
    window.dispatchEvent(new CustomEvent("authChange"));

    // Navigate to home page
    navigate("/");

    // Force reload to reset all states
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
            <NavLink icon={<Home size={20} />} text="Home" to="/admin/home" />
            <NavLink
              icon={<List size={20} />}
              text="Pet Listing"
              to="/admin/pets"
            />
            <NavLink
              icon={<Users size={20} />}
              text="User Accounts"
              to="/admin/users"
            />
            <NavLink
              icon={<BookOpen size={20} />}
              text="Blogs"
              to="/admin/blogs"
            />
          </div>

          {/* Right side - Admin Controls */}
          <div className="navbar-controls">
            <button className="navbar-control-btn">
              <Settings size={20} />
              <span>Settings</span>
            </button>
            <button
              className="navbar-control-btn navbar-control-btn-logout"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Optional: Secondary Navigation or Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="breadcrumbs-container">
          <p className="breadcrumbs-text">Dashboard / Current Page</p>
        </div>
      </div>
    </div>
  );
};

// NavLink component for consistent styling
const NavLink = ({
  icon,
  text,
  to,
}: {
  icon: React.ReactNode;
  text: string;
  to: string;
}) => (
  <Link
    to={to}
    className="flex items-center space-x-1 px-3 py-2 rounded-md text-purple-700 hover:bg-purple-200 hover:text-purple-900 transition-colors duration-200"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default AdminNavBar;
