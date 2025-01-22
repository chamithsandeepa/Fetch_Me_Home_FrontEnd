import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/users"; // Backend base URL

// Function to register a user
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data);
    } else {
      throw new Error("Something went wrong.");
    }
  }
};

// Function to log in a user
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data; // Return success message or user data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data);
    } else {
      throw new Error("Login failed. Please try again.");
    }
  }
};
