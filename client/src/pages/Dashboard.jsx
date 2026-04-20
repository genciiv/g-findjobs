import { Link } from "react-router-dom";
import { getStoredUser } from "../utils/auth";
import "../styles/dashboard.css";

const Dashboard = () => {
  const user = getStoredUser();
  const isCompanyOrAdmin = user?.role === "company" || user?.role === "admin";
  const isCandidate = user?.role === "candidate";

  return (
    <section className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <span className="dashboard-badge">Paneli i përdoruesit</span>
          <h1>Mirë se erdhe, {user?.fullName || "Përdorues"}!</h1>
          <p>
            Këtu do të menaxhosh profilin, aplikimet, punët e publikuara dhe të
            dhënat e llogarisë.
          </p>
        </div>

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
            <h2>Profili im</h2>
            <p>
              Shiko të dhënat e ruajtura në server dhe verifiko që token-i po
              funksionon si duhet.
            </p>
            <Link to="/profile" className="dashboard-link-btn">
              Hap Profilin
            </Link>
          </div>

          <div className="dashboard-box">
            <h2>Punët</h2>
            <p>
              Eksploro njoftimet e publikuara ose posto një punë të re nëse je kompani.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link to="/jobs" className="dashboard-link-btn">
                Shiko Punët
              </Link>

              {isCompanyOrAdmin && (
                <Link to="/post-job" className="dashboard-link-btn">
                  Posto Punë
                </Link>
              )}
            </div>
          </div>

          {isCandidate && (
            <>
              <div className="dashboard-box">
                <h2>Aplikimet e mia</h2>
                <p>
                  Shiko të gjitha punët ku ke aplikuar dhe statusin e secilit aplikim.
                </p>
                <Link to="/my-applications" className="dashboard-link-btn">
                  Hap Aplikimet
                </Link>
              </div>

              <div className="dashboard-box">
                <h2>Favorite Jobs</h2>
                <p>
                  Ruaj punët që të pëlqejnë dhe kthehu t’i shohësh më vonë.
                </p>
                <Link to="/my-favorites" className="dashboard-link-btn">
                  Hap Favorites
                </Link>
              </div>
            </>
          )}

          {isCompanyOrAdmin && (
            <>
              <div className="dashboard-box">
                <h2>Punët e publikuara</h2>
                <p>
                  Menaxho njoftimet e publikuara nga kompania jote, editoji ose fshiji.
                </p>
                <Link to="/my-posted-jobs" className="dashboard-link-btn">
                  Menaxho Punët
                </Link>
              </div>

              <div className="dashboard-box">
                <h2>Aplikimet e kandidatëve</h2>
                <p>
                  Shiko kandidatët që kanë aplikuar në punët e tua dhe përditëso statusin.
                </p>
                <Link to="/company-applications" className="dashboard-link-btn">
                  Shiko Aplikimet
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;