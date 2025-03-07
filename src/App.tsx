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
import AdminNavBar from "./Components/AdminNavBar/AdminNavBar";
import AdoptPet from "./Components/AdoptPet/AdoptPet";
import PetProfilePage from "./Components/PetProfile/PetProfile";
import ApplyToAdoptPage from "./Components/ApplyToAdopt/ApplyToAdopt";
import PetListPage from "./Components/PetList/PetList";
import AddPetForm from "./Components/AddPet/AddPet";
import Fetch from "./assets/Fetch.png";
import Blogs from "./Components/BlogPage/Blogs";
import UserAccounts from "./Components/UserAccounts/UserAccounts";
import AdminHomePage from "./Components/AdminHome/AdminHomePage";
import AdoptionAcc from "./Components/AdoptionAcc/AdoptionAcc";
import BlogRequestPage from "./Components/BlogRequests/BlogRqst";

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

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

  const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(false);
    }, [userRole]);

    if (loading) return <div>Loading...</div>;

    if (userRole !== "admin") {
      return <Navigate to="/login" />;
    }

    return <>{children}</>;
  };


  return (
    <Router>
      <div className="app-container">
        {/* Dynamically render correct Navbar based on user role */}
        {userRole === "admin" ? (
          <AdminNavBar />
        ) : (
          <NavBar
            logoSrc={Fetch}
            navLinks={[
              { label: "Home", path: "/" },
              { label: "About Us", path: "/about" },
              { label: "Blogs", path: "/blogs" },
              { label: "Contact Us", path: "/contact" },
            ]}
          />
        )}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<ContactUs />} />

          {userRole === "user" && (
            <>
              <Route path="/adopt" element={<AdoptPet />} />
              <Route path="/pet-profile/:petId" element={<PetProfilePage />} />
              <Route path="/adopt-to-pet" element={<ApplyToAdoptPage />} />
            </>
          )}

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <Navigate to="/admin/home" replace />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/home"
            element={
              <ProtectedAdminRoute>
                <AdminHomePage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/pets"
            element={
              <ProtectedAdminRoute>
                <PetListPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/add-pet"
            element={
              <ProtectedAdminRoute>
                <AddPetForm />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/user-accounts"
            element={
              <ProtectedAdminRoute>
                <UserAccounts />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/adoption-requests"
            element={
              <ProtectedAdminRoute>
                <AdoptionAcc />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/blog-requests"
            element={
              <ProtectedAdminRoute>
                <BlogRequestPage />
              </ProtectedAdminRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Render Footer only if the user is not an admin */}
        {userRole !== "admin" && <Footer />}
      </div>
    </Router>
  );
};

export default App;
