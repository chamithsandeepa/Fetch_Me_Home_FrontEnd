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
import "./AdminHomePage.css";

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

      // Validate data
      if (!Array.isArray(users) || !Array.isArray(pets)) {
        throw new Error("Invalid data format from API");
      }

      // Calculate stats
      const totalUsers = users.length;
      const totalPets = pets.length;
      const adoptedPets = pets.filter((pet) => pet.adopted).length;
      const adoptionRate =
        totalPets > 0 ? Math.round((adoptedPets / totalPets) * 100) : 0;

      // Handle small user counts to avoid division errors
      const previousUsers = totalUsers > 10 ? totalUsers - 10 : 1;
      const userGrowth = Math.round((totalUsers / previousUsers - 1) * 100);

      const ratings = Math.random() * 5; // Simulated average rating

      // Monthly stats (grouping by month)
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
      setStats(null); // Set stats to null to show an error message
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    // Real-time updates every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  if (!stats) {
    return <div>Error loading stats. Please try again later.</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="dashboard-stats-grid">
        {[
          {
            title: "Total Users",
            value: stats.totalUsers,
            growth: stats.userGrowth,
            icon: <Users size={24} />,
            colorClass: "stat-users",
          },
          {
            title: "Total Pets",
            value: stats.totalPets,
            icon: <Heart size={24} />,
            colorClass: "stat-pets",
          },
          {
            title: "Adoption Rate",
            value: `${stats.adoptionRate}%`,
            icon: <ArrowUp size={24} />,
            colorClass: "stat-adoption",
          },
          {
            title: "Average Rating",
            value: stats.ratings.toFixed(1),
            icon: <Star size={24} />,
            colorClass: "stat-rating",
          },
        ].map((stat, index) => (
          <div key={index} className="dashboard-stat-card">
            <div className={`dashboard-stat-icon ${stat.colorClass}`}>
              {stat.icon}
            </div>
            <div className="dashboard-stat-info">
              <h3 className="stat-title">{stat.title}</h3>
              <p className="stat-number">{stat.value}</p>
              {stat.growth !== undefined && (
                <span
                  className={`stat-growth ${
                    stat.growth >= 0 ? "growth-positive" : "growth-negative"
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
          </div>
        ))}
      </div>

      <div className="dashboard-charts-grid">
        <div className="dashboard-chart-card">
          <h3 className="chart-title">Monthly Statistics</h3>
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
        </div>

        <div className="dashboard-summary-card">
          <h3 className="chart-title">Quick Summary</h3>
          <div className="summary-stats">
            <div className="summary-item">
              <span className="summary-label">Active Users Today</span>
              <span className="summary-number">156</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Pending Adoptions</span>
              <span className="summary-number">23</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">New Pets Today</span>
              <span className="summary-number">12</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
