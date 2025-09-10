import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
  if (!adminInfo) {
    navigate("/admin-login"); 
    return null; // Prevent rendering if not logged in
  }

  const cards = [
    {
      title: "Manage Students",
      desc: "edit student details, mark fees ",
      route: "/manage-students",
      bg: "bg-blue",
    },
    // {
    //   title: "View Fees",
    //   desc: "See payment status and history",
    //   route: "/view-fees",
    //   bg: "bg-green",
    // },
    {
      title: "Alerts ",
      desc: "View and manage alerts",
      route: "/admin-alerts",
      bg: "bg-orange",
    },
    {
      title: "Analytics",
      desc: "Analyze fee trends and statistics",
      route: "/analytics",
      bg: "bg-purple",
    },
  ];

  return (
    <div className="admin-dashboard" style={{  background: "linear-gradient(to right, #e3f2fd, #bbdefb)" }}>
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`dashboard-card ${card.bg}`}
            onClick={() => navigate(card.route)}
          >
            <h4>{card.title}</h4>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
