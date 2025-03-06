import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FormData } from "../../types/user";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        formData
      );
      setMessage({ type: "success", text: response.data });

      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.response?.data || "Something went wrong.",
      });
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      navigate(role === "admin" ? "/admin" : "/");
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-100 via-blue-200 to-sky-300 p-4">
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg max-w-sm w-full transform transition duration-300 ease-in-out hover:scale-105">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
          Register
        </h1>
        {message && (
          <div
            className={`text-center py-2 px-4 rounded-md mb-6 ${
              message.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {message.text}
          </div>
        )}
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
            className="w-full py-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transform transition duration-200 hover:translate-y-1"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
