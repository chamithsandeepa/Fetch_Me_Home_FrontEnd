import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import home from "../../assets/home.jpg";
import { SignInFormData } from "../../types/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications

const Login: React.FC = () => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );
      localStorage.setItem("role", response.data.role);

      // Dispatch event to update NavBar
      window.dispatchEvent(
        new CustomEvent("authChange", { detail: { role: response.data.role } })
      );

      toast.success("Login successful! Redirecting...");

      // Delay navigation to allow the toast to display
      setTimeout(() => {
        navigate(response.data.role === "admin" ? "/admin" : "/");
      }, 2000);

      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data || "Login failed. Please try again."
      );
      toast.error(error.response?.data || "Login failed. Please try again.");
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      navigate(role === "admin" ? "/admin" : "/");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-indigo-100 via-blue-200 to-sky-300">
      <div className="w-1/2 overflow-hidden relative">
        <img
          src={home}
          alt="Dog and cat together"
          className="w-full h-full object-cover filter brightness-75"
        />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-b from-blue-200 to-indigo-100 shadow-xl">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-4">
            Sign In
          </h1>
          <p className="text-center text-gray-500 italic mb-8">
            Sign in with email address and password
          </p>
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Yourname@gmail.com"
                className="w-full p-4 text-lg rounded-md border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-4 text-lg rounded-md border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transform transition duration-200 ease-in-out hover:translate-y-1"
            >
              Sign In
            </button>
          </form>
          <div className="text-center mt-6">
            <span className="text-gray-600 text-sm">Not a member? </span>
            <Link
              to="/register"
              className="text-indigo-600 text-sm font-semibold hover:underline"
            >
              Sign up Now
            </Link>
          </div>
          <h2 className="mt-6 text-center text-indigo-600 text-lg font-bold">
            Sign in to your adventure!
          </h2>
        </div>
      </div>

      {/* ToastContainer placed here */}
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

export default Login;
