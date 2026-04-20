import { NavLink } from "react-router-dom";
import "../styles/admin-layout.css";

const AdminLayout = ({ title, children }) => {
  return (
    <section className="admin-layout-page">
      <div className="admin-layout-container">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-top">
            <h2>Admin Panel</h2>
            <p>G-FindJobs</p>
          </div>

          <nav className="admin-sidebar-nav">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                isActive ? "admin-side-link active" : "admin-side-link"
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive ? "admin-side-link active" : "admin-side-link"
              }
            >
              Users
            </NavLink>

            <NavLink
              to="/admin/jobs"
              className={({ isActive }) =>
                isActive ? "admin-side-link active" : "admin-side-link"
              }
            >
              Jobs
            </NavLink>
          </nav>
        </aside>

        <div className="admin-main-content">
          <div className="admin-main-header">
            <h1>{title}</h1>
          </div>

          <div className="admin-main-body">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default AdminLayout;