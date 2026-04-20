import { NavLink } from "react-router-dom";
import { getStoredUser } from "../utils/auth";
import "../styles/dashboard-layout.css";

const DashboardLayout = ({ title, children }) => {
  const user = getStoredUser();

  const isCandidate = user?.role === "candidate";
  const isCompany = user?.role === "company";
  const isAdmin = user?.role === "admin";

  return (
    <section className="dashboard-layout-page">
      <div className="dashboard-layout-container">
        <aside className="dashboard-sidebar">
          <div className="dashboard-sidebar-top">
            <h2>{isAdmin ? "Admin Panel" : "Dashboard"}</h2>
            <p>{user?.fullName || "User"}</p>
            <span className="dashboard-role-badge">{user?.role || "user"}</span>
          </div>

          <nav className="dashboard-sidebar-nav">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                isActive ? "dashboard-side-link active" : "dashboard-side-link"
              }
            >
              Overview
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "dashboard-side-link active" : "dashboard-side-link"
              }
            >
              Profile
            </NavLink>

            {isCandidate && (
              <>
                <NavLink
                  to="/jobs"
                  className={({ isActive }) =>
                    isActive ? "dashboard-side-link active" : "dashboard-side-link"
                  }
                >
                  Browse Jobs
                </NavLink>

                <NavLink
                  to="/my-applications"
                  className={({ isActive }) =>
                    isActive ? "dashboard-side-link active" : "dashboard-side-link"
                  }
                >
                  My Applications
                </NavLink>

                <NavLink
                  to="/my-favorites"
                  className={({ isActive }) =>
                    isActive ? "dashboard-side-link active" : "dashboard-side-link"
                  }
                >
                  Favorite Jobs
                </NavLink>
              </>
            )}

            {(isCompany || isAdmin) && (
              <>
                <NavLink
                  to="/post-job"
                  className={({ isActive }) =>
                    isActive ? "dashboard-side-link active" : "dashboard-side-link"
                  }
                >
                  Post Job
                </NavLink>

                <NavLink
                  to="/my-posted-jobs"
                  className={({ isActive }) =>
                    isActive ? "dashboard-side-link active" : "dashboard-side-link"
                  }
                >
                  My Posted Jobs
                </NavLink>

                <NavLink
                  to="/company-applications"
                  className={({ isActive }) =>
                    isActive ? "dashboard-side-link active" : "dashboard-side-link"
                  }
                >
                  Candidate Applications
                </NavLink>
              </>
            )}

            {isAdmin && (
              <>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? "dashboard-side-link active" : "dashboard-side-link"
                  }
                >
                  Admin Dashboard
                </NavLink>

                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    isActive ? "dashboard-side-link active" : "dashboard-side-link"
                  }
                >
                  Manage Users
                </NavLink>

                <NavLink
                  to="/admin/jobs"
                  className={({ isActive }) =>
                    isActive ? "dashboard-side-link active" : "dashboard-side-link"
                  }
                >
                  Manage Jobs
                </NavLink>
              </>
            )}
          </nav>
        </aside>

        <div className="dashboard-main-content">
          <div className="dashboard-main-topbar">
            <div>
              <p className="dashboard-topbar-label">Workspace</p>
              <h1>{title}</h1>
            </div>

            <div className="dashboard-topbar-user">
              <div className="dashboard-user-avatar">
                {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <strong>{user?.fullName || "User"}</strong>
                <p>{user?.email || "No email"}</p>
              </div>
            </div>
          </div>

          <div className="dashboard-main-body">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;