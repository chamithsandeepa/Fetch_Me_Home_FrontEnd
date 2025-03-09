import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Validation Function
  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;

    if (name.length < 3) {
      toast.error("Name must be at least 3 characters long.");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return false;
    }

    return true;
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(response.data.message || "Registration successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error("Email is already registered. Try a different email.");
      } else {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      navigate(role === "admin" ? "/admin" : "/");
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-100 via-blue-200 to-sky-300 p-4">
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg max-w-sm w-full transform transition duration-300 ease-in-out hover:scale-105">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 text-lg rounded-md border-2 border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-indigo-800 placeholder-indigo-300 transition duration-300"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Yourname@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 text-lg rounded-md border-2 border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-indigo-800 placeholder-indigo-300 transition duration-300"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-4 text-lg rounded-md border-2 border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-indigo-800 placeholder-indigo-300 transition duration-300"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-4 text-lg rounded-md border-2 border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-indigo-800 placeholder-indigo-300 transition duration-300"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 text-white rounded-lg transform transition duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 hover:translate-y-1"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>

      {/* ToastContainer for displaying toasts */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Register;
