import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const AdminNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAdminLogout = () => {
    localStorage.removeItem("role");
    window.dispatchEvent(new CustomEvent("authChange"));
    navigate("/");
    window.location.reload();
  };

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Add smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-purple-100 transition-all duration-300 h-20">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo/Brand */}
          <div className="shrink-0">
            <span className="text-xl font-semibold text-purple-700 hover:text-purple-800 transition-colors duration-300 cursor-pointer">
              Pet Adoption Admin
            </span>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-purple-700 hover:bg-purple-50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between flex-grow ml-6">
            <div className="flex items-center space-x-4 lg:space-x-6">
              <AdminNavLink
                text="Home"
                to="/admin/home"
                isActive={location.pathname === "/admin/home"}
              />
              <AdminNavLink
                text="Pet Listing"
                to="/admin/pets"
                isActive={location.pathname === "/admin/pets"}
              />
              <AdminNavLink
                text="Add a Pet"
                to="/admin/add-pet"
                isActive={location.pathname === "/admin/add-pet"}
              />
              <AdminNavLink
                text="User Accounts"
                to="/admin/user-accounts"
                isActive={location.pathname === "/admin/user-accounts"}
              />
              <AdminNavLink
                text="Adoption Requests"
                to="/admin/adoption-requests"
                isActive={location.pathname === "/admin/adoption-requests"}
              />
              <AdminNavLink
                text="Blog Requests"
                to="/admin/blog-requests"
                isActive={location.pathname === "/admin/blog-requests"}
              />
            </div>

            {/* Desktop Logout Button */}
            <div className="flex items-center">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm text-white bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-0.5"
                onClick={handleAdminLogout}
              >
                <LogOut size={20} className="opacity-90" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-purple-100">
            <span className="font-semibold text-purple-700">Menu</span>
            <button
              className="p-2 rounded-lg text-purple-700 hover:bg-purple-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-1 p-4 overflow-y-auto flex-grow">
            <MobileNavLink
              text="Home"
              to="/admin/home"
              isActive={location.pathname === "/admin/home"}
            />
            <MobileNavLink
              text="Pet Listing"
              to="/admin/pets"
              isActive={location.pathname === "/admin/pets"}
            />
            <MobileNavLink
              text="Add a Pet"
              to="/admin/add-pet"
              isActive={location.pathname === "/admin/add-pet"}
            />
            <MobileNavLink
              text="User Accounts"
              to="/admin/user-accounts"
              isActive={location.pathname === "/admin/user-accounts"}
            />
            <MobileNavLink
              text="Adoption Requests"
              to="/admin/adoption-requests"
              isActive={location.pathname === "/admin/adoption-requests"}
            />
            <MobileNavLink
              text="Blog Requests"
              to="/admin/blog-requests"
              isActive={location.pathname === "/admin/blog-requests"}
            />
          </div>

          {/* Mobile Logout Button */}
          <div className="p-4 border-t border-purple-100">
            <button
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm text-white bg-purple-600 hover:bg-purple-700 w-full transition-colors duration-200"
              onClick={handleAdminLogout}
            >
              <LogOut size={20} className="opacity-90" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Desktop NavLink component
const AdminNavLink = ({
  text,
  to,
  isActive,
}: {
  text: string;
  to: string;
  isActive: boolean;
}) => (
  <Link
    to={to}
    className={`px-3 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
      isActive
        ? "text-purple-800 bg-purple-100/80 font-semibold"
        : "text-purple-600 hover:text-purple-800 hover:bg-purple-50"
    }`}
  >
    <span>{text}</span>
  </Link>
);

// Mobile NavLink component
const MobileNavLink = ({
  text,
  to,
  isActive,
}: {
  text: string;
  to: string;
  isActive: boolean;
}) => (
  <Link
    to={to}
    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
      isActive
        ? "text-purple-800 bg-purple-100 font-semibold"
        : "text-purple-600 hover:text-purple-800 hover:bg-purple-50"
    }`}
  >
    <span>{text}</span>
  </Link>
);

export default AdminNavigation;
