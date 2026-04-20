import { useEffect, useState } from "react";
import API from "../api";
import AdminLayout from "../components/AdminLayout";
import "../styles/admin.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await API.get("/admin/stats");
        setStats(response.data);
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Nuk u arrit të merren statistikat"
        );
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout title="Dashboard">
      {message ? (
        <div className="admin-message error">{message}</div>
      ) : !stats ? (
        <div className="admin-message">Duke ngarkuar dashboard...</div>
      ) : (
        <div className="admin-grid">
          <div className="admin-card">
            <h2>{stats.totalUsers}</h2>
            <p>Total Users</p>
          </div>

          <div className="admin-card">
            <h2>{stats.totalJobs}</h2>
            <p>Total Jobs</p>
          </div>

          <div className="admin-card">
            <h2>{stats.totalApplications}</h2>
            <p>Total Applications</p>
          </div>

          <div className="admin-card">
            <h2>{stats.totalFavorites}</h2>
            <p>Total Favorites</p>
          </div>

          <div className="admin-card">
            <h2>{stats.candidates}</h2>
            <p>Candidates</p>
          </div>

          <div className="admin-card">
            <h2>{stats.companies}</h2>
            <p>Companies</p>
          </div>

          <div className="admin-card">
            <h2>{stats.admins}</h2>
            <p>Admins</p>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;