import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Welcome</h2>
        <p className="dashboard-subtext">
          You’re logged in. Let’s run the world.
        </p>

        <div className="dashboard-links">
          <Link to="/agents" className="dashboard-button">
            Manage Agents
          </Link>
          <Link to="/upload" className="dashboard-button">
            Upload CSV
          </Link>
          <button onClick={handleLogout} className="dashboard-button logout">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
