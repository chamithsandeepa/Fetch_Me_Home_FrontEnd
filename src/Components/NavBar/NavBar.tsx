import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    <>
      {/* Navbar */}
      <header className="bg-white bg-opacity-90 backdrop-blur-lg shadow-md fixed top-0 left-0 w-full z-50 h-20">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logoSrc}
              alt="Logo"
              className="h-12 transition-transform duration-300 hover:scale-110"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-lg font-medium transition-all px-3 py-2 rounded-lg ${
                  location.pathname === link.path
                    ? "text-indigo-700 bg-indigo-100 font-semibold"
                    : "text-gray-700 hover:text-indigo-700 hover:bg-indigo-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {role === "user" && (
              <Link
                to="/adopt"
                className={`text-lg font-medium transition-all px-3 py-2 rounded-lg ${
                  location.pathname === "/adopt"
                    ? "text-indigo-700 bg-indigo-100 font-semibold"
                    : "text-gray-700 hover:text-indigo-700 hover:bg-indigo-50"
                }`}
              >
                Adopt a Pet
              </Link>
            )}
          </nav>

          {/* User Auth Buttons / Dropdown */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg transition hover:bg-indigo-700"
                >
                  <span>Account</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg transition hover:bg-indigo-700"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
          >
            {menuOpen ? (
              <X size={28} className="text-indigo-600" />
            ) : (
              <Menu size={28} className="text-indigo-600" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu (Now Working on All Pages) */}
      <nav
        className={`md:hidden bg-white shadow-md absolute top-16 left-0 w-full px-6 py-4 transition-all duration-300 ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setMenuOpen(false)}
            className={`block text-lg font-medium py-3 px-4 rounded-lg ${
              location.pathname === link.path
                ? "text-indigo-700 bg-indigo-100 font-semibold"
                : "text-gray-700 hover:text-indigo-700 hover:bg-indigo-50"
            }`}
          >
            {link.label}
          </Link>
        ))}
        {role === "user" && (
          <Link
            to="/adopt"
            onClick={() => setMenuOpen(false)}
            className="block text-lg font-medium py-3 px-4 rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-indigo-50"
          >
            Adopt a Pet
          </Link>
        )}
        {isLoggedIn ? (
          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="w-full text-left py-3 px-4 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block text-lg font-medium py-3 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Login
          </Link>
        )}
      </nav>

      {/* Ensuring Content Starts Immediately Below Navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default NavBar;
