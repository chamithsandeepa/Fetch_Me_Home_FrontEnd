import React from "react";
import { ChevronRight } from "lucide-react";
import "./AdminHomePage.css";

interface Admin {
  id: number;
  name: string;
  role: string;
  amount: number;
  imageUrl: string;
}

interface DashboardStats {
  totalDonations: number;
  today: number;
}

const AdminDashboard: React.FC = () => {
  const admins: Admin[] = [
    {
      id: 1,
      name: "Monica Katz",
      role: "Senior Admin",
      amount: 4200,
      imageUrl: "/chamith.jpg",
    },
    {
      id: 2,
      name: "Mathias Benson",
      role: "Admin",
      amount: 4000,
      imageUrl: "/mathias.jpg",
    },
    {
      id: 3,
      name: "John Carter",
      role: "Admin",
      amount: 4000,
      imageUrl: "/john.jpg",
    },
  ];

  const stats: DashboardStats = {
    totalDonations: 6000000,
    today: 4000,
  };

  return (
    <div className="dashboard-container">
      <div className="admin-section">
        <h2 className="section-title">Top Donations</h2>
        <div className="admin-cards">
          {admins.map((admin) => (
            <div key={admin.id} className="admin-card">
              <div className="admin-info">
                <img
                  src={admin.imageUrl}
                  alt={admin.name}
                  className="admin-image"
                />
                <div className="admin-details">
                  <h3>{admin.name}</h3>
                  <p className="admin-role">{admin.role}</p>
                  <p className="admin-amount">${admin.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-section">
        <h2 className="section-title">Total Donations</h2>
        <div className="stats-cards">
          <div className="stats-card all-time">
            <div className="stats-info">
              <div>
                <h3>All Time</h3>
                <p className="stats-amount">
                  ${stats.totalDonations.toLocaleString()}
                </p>
              </div>
              <ChevronRight className="stats-icon" />
            </div>
          </div>
          <div className="stats-card today">
            <div className="stats-info">
              <div>
                <h3>Today</h3>
                <p className="stats-amount">${stats.today.toLocaleString()}</p>
              </div>
              <ChevronRight className="stats-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
