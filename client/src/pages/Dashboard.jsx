import { Link } from "react-router-dom";
import { getStoredUser } from "../utils/auth";
import DashboardLayout from "../components/DashboardLayout";
import "../styles/dashboard.css";

const Dashboard = () => {
  const user = getStoredUser();
  const isCompanyOrAdmin = user?.role === "company" || user?.role === "admin";
  const isCandidate = user?.role === "candidate";

  return (
    <DashboardLayout title="Overview">
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Emri i plotë</h3>
          <p>{user?.fullName || "-"}</p>
        </div>

        <div className="dashboard-card">
          <h3>Email</h3>
          <p>{user?.email || "-"}</p>
        </div>

        <div className="dashboard-card">
          <h3>Roli</h3>
          <p>{user?.role || "-"}</p>
        </div>

        <div className="dashboard-card">
          <h3>Statusi</h3>
          <p>Aktiv</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-box">
          <h2>Quick Actions</h2>
          <p>Përdor rrugët më të shpejta për të lëvizur në platformë.</p>

          <div className="dashboard-actions-grid">
            <Link to="/profile" className="dashboard-action-card">
              <h4>Profile</h4>
              <span>Shiko të dhënat e llogarisë</span>
            </Link>

            <Link to="/jobs" className="dashboard-action-card">
              <h4>Browse Jobs</h4>
              <span>Eksploro punët e publikuara</span>
            </Link>

            {isCandidate && (
              <Link to="/my-applications" className="dashboard-action-card">
                <h4>My Applications</h4>
                <span>Kontrollo statuset e aplikimeve</span>
              </Link>
            )}

            {isCandidate && (
              <Link to="/my-favorites" className="dashboard-action-card">
                <h4>Favorites</h4>
                <span>Ruaj dhe rishiko punët e preferuara</span>
              </Link>
            )}

            {isCompanyOrAdmin && (
              <Link to="/post-job" className="dashboard-action-card">
                <h4>Post Job</h4>
                <span>Krijo njoftim të ri pune</span>
              </Link>
            )}

            {isCompanyOrAdmin && (
              <Link to="/my-posted-jobs" className="dashboard-action-card">
                <h4>Manage Jobs</h4>
                <span>Menaxho punët e publikuara</span>
              </Link>
            )}

            {isCompanyOrAdmin && (
              <Link to="/company-applications" className="dashboard-action-card">
                <h4>Candidates</h4>
                <span>Shiko aplikimet e kandidatëve</span>
              </Link>
            )}
          </div>
        </div>

        <div className="dashboard-box">
          <h2>Panel Summary</h2>
          <p>
            Ky panel është krijuar për të të dhënë qasje të shpejtë te veprimet
            më të rëndësishme sipas rolit tënd në G-FindJobs.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;