import { useEffect, useState } from "react";
import { Users, Heart, ArrowUp, CheckCircle } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

interface User {
  id: number;
  name: string;
  createdAt: string;
  role: "user" | "admin";
}

interface Pet {
  id: number;
  type: string;
  adopted: boolean;
  addedAt: string;
}

interface DashboardStats {
  totalUsers: number;
  totalPets: number;
  adoptionRate: number;
  adoptedPets: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activityLog, setActivityLog] = useState<string[]>([]);

  const fetchStats = async () => {
    try {
      const [usersResponse, petsResponse] = await Promise.all([
        axios.get<User[]>("http://localhost:8080/api/users/all"),
        axios.get<Pet[]>("http://localhost:8080/api/pets"),
      ]);

      const users = usersResponse.data || [];
      const pets = petsResponse.data || [];

      if (!Array.isArray(users) || !Array.isArray(pets)) {
        throw new Error("Invalid data format from API");
      }

      const regularUsers = users.filter((user) => user.role === "user");
      const totalUsers = regularUsers.length;
      const totalPets = pets.length;
      const adoptedPets = pets.filter((pet) => pet.adopted).length;
      const adoptionRate = Math.round((adoptedPets / totalPets) * 100);

      setStats({
        totalUsers,
        totalPets,
        adoptionRate,
        adoptedPets,
      });

      // Update activity log
      setActivityLog((prevLog) => [
        `📅 ${new Date().toLocaleString()}: Updated dashboard data.`,
        `👤 Total Users: ${totalUsers}`,
        `🐶 Total Pets: ${totalPets}`,
        `❤️ Adopted Pets: ${adoptedPets}`,
        `📈 Adoption Rate: ${adoptionRate}%`,
        ...prevLog.slice(0, 4), // Keep only the last 5 entries
      ]);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
      setStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-5"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center text-red-600">
        Error loading stats. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-b from-purple-50 to-blue-100 min-h-screen font-inter">
      <motion.h1
        className="text-4xl font-extrabold text-gray-900 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Admin Dashboard
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[
          {
            title: "Total Users",
            value: stats.totalUsers,
            icon: <Users size={24} />,
            colorClass: "bg-gradient-to-r from-blue-400 to-blue-600 text-white",
          },
          {
            title: "Total Pets",
            value: stats.totalPets,
            icon: <Heart size={24} />,
            colorClass:
              "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white",
          },
          {
            title: "Adoption Rate",
            value: `${stats.adoptionRate}%`,
            icon: <ArrowUp size={24} />,
            colorClass:
              "bg-gradient-to-r from-green-400 to-green-600 text-white",
          },
          {
            title: "Adopted Pets",
            value: stats.adoptedPets,
            icon: <CheckCircle size={24} />,
            colorClass: "bg-gradient-to-r from-red-400 to-red-600 text-white",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white backdrop-blur-sm rounded-lg p-6 shadow-lg flex items-center space-x-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
          >
            <div className={`p-4 rounded-full ${stat.colorClass}`}>
              {stat.icon}
            </div>
            <div>
              <h3 className="text-sm text-gray-600 uppercase font-semibold mb-2">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Unique Feature: Recent Activity Log */}
      <motion.div
        className="bg-white rounded-lg p-6 shadow-lg mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          📝 Recent Activity Log
        </h2>
        <ul className="space-y-2 text-gray-700 text-sm">
          {activityLog.map((log, index) => (
            <li key={index} className="border-l-4 border-blue-500 pl-2">
              {log}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
