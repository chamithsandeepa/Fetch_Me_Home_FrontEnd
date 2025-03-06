import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, Star, ArrowUp, ArrowDown, Heart } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

interface User {
  id: number;
  name: string;
  createdAt: string;
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
  userGrowth: number;
  ratings: number;
  monthlyStats: {
    month: string;
    users: number;
    adoptions: number;
  }[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

      const totalUsers = users.length;
      const totalPets = pets.length;
      const adoptedPets = pets.filter((pet) => pet.adopted).length;
      const adoptionRate =
        totalPets > 0 ? Math.round((adoptedPets / totalPets) * 100) : 0;

      const previousUsers = totalUsers > 10 ? totalUsers - 10 : 1;
      const userGrowth = Math.round((totalUsers / previousUsers - 1) * 100);

      const ratings = Math.random() * 5; // Simulated average rating

      const monthlyStats = Array.from({ length: 12 }, (_, i) => ({
        month: new Date(0, i).toLocaleString("default", { month: "short" }),
        users: users.filter((user) => new Date(user.createdAt).getMonth() === i)
          .length,
        adoptions: pets.filter(
          (pet) => new Date(pet.addedAt).getMonth() === i && pet.adopted
        ).length,
      }));

      setStats({
        totalUsers,
        totalPets,
        adoptionRate,
        userGrowth,
        ratings,
        monthlyStats,
      });
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
            growth: stats.userGrowth,
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
            title: "Average Rating",
            value: stats.ratings.toFixed(1),
            icon: <Star size={24} />,
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
              {stat.growth !== undefined && (
                <span
                  className={`flex items-center text-sm font-semibold mt-2 ${
                    stat.growth >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.growth >= 0 ? (
                    <ArrowUp size={16} />
                  ) : (
                    <ArrowDown size={16} />
                  )}
                  {Math.abs(stat.growth)}%
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="bg-white backdrop-blur-sm rounded-lg p-6 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Monthly Statistics
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#8884d8"
                name="Users"
              />
              <Line
                type="monotone"
                dataKey="adoptions"
                stroke="#82ca9d"
                name="Adoptions"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="bg-white backdrop-blur-sm rounded-lg p-6 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Quick Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
              <span className="text-gray-600">Active Users Today</span>
              <span className="font-semibold text-gray-900">156</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
              <span className="text-gray-600">Pending Adoptions</span>
              <span className="font-semibold text-gray-900">23</span>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="text-gray-600">New Pets Today</span>
              <span className="font-semibold text-gray-900">12</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
