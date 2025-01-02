import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/HomePage/Home";
import AboutUs from "./Components/AboutUs/AboutUs";
import Register from "./Components/UserRegister/UserRegister";
import ContactUs from "./Components/ContactUs/ContactUs";
import Login from "./Components/Login/Login";
import AdminDashboard from "./Components/AdminNavBar/AdminNavBar";
import AdoptPet from "./Components/AdoptPet/AdoptPet";
import PetProfilePage from "./Components/PetProfile/PetProfile";
import ApplyToAdoptPage from "./Components/ApplyToAdopt/ApplyToAdopt";
import logos from "./assets/logos.jpg";

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Blogs", path: "/blogs" },
    { label: "Contact Us", path: "/contact" },
  ];

  useEffect(() => {
    const checkRole = () => {
      const role = localStorage.getItem("role");
      setUserRole(role);
    };
    checkRole();

    const handleAuthChange = () => {
      checkRole();
    };
    window.addEventListener("authChange", handleAuthChange);
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  // Protected Route component
  const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
    if (userRole !== "admin") {
      return <Navigate to="/login" />;
    }
    return <>{children}</>;
  };

  return (
    <Router>
      <div className="app-container">
        {/* Show NavBar on all pages except admin dashboard */}
        {!window.location.pathname.startsWith("/admin") && (
          <NavBar logoSrc={logos} navLinks={navLinks} />
        )}

        <Routes>
          {/* Public routes always accessible */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blogs" element={<h1>Blogs Page</h1>} />
          <Route path="/contact" element={<ContactUs />} />

          {/* User-specific routes */}
          {userRole === "user" && (
            <>
              <Route path="/adopt" element={<AdoptPet />} />
              <Route path="/pet-profile/:petId" element={<PetProfilePage />} />
              <Route path="/adopt-to-pet" element={<ApplyToAdoptPage />} />
            </>
          )}

          {/* Admin route */}
          <Route
            path="/admin/*"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Show Footer on all pages except admin dashboard */}
        {!window.location.pathname.startsWith("/admin") && <Footer />}
      </div>
    </Router>
  );
};

export default App;
