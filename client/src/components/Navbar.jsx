import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { getStoredUser, isAuthenticated, logoutUser } from "../utils/auth";

const Navbar = () => {
  const [showServices, setShowServices] = useState(false);
  const [currentUser, setCurrentUser] = useState(getStoredUser());
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowServices(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setCurrentUser(getStoredUser());
  }, [location.pathname]);

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    navigate("/login");
  };

  const isCompanyOrAdmin =
    currentUser?.role === "company" || currentUser?.role === "admin";

  const isCandidate = currentUser?.role === "candidate";
  const isAdmin = currentUser?.role === "admin";

  return (
    <header className="site-header">
      <div className="container navbar">
        <Link to="/" className="logo">
          G-FindJobs
        </Link>

        <nav className="nav-center">
          <Link to="/" className="nav-link">Kryefaqja</Link>
          <Link to="/jobs" className="nav-link">Punët</Link>
          <Link to="/about" className="nav-link">Rreth Nesh</Link>

          <div className="dropdown-wrapper" ref={dropdownRef}>
            <button
              className="nav-link dropdown-toggle"
              onClick={() => setShowServices(!showServices)}
              type="button"
            >
              Sherbimet
              <span className={`arrow ${showServices ? "open" : ""}`}>▾</span>
            </button>

            {showServices && (
              <div className="dropdown-menu">
                <div className="dropdown-column">
                  <p className="dropdown-title">Web Design</p>
                  <Link to="/services/wordpress-website" onClick={() => setShowServices(false)}>
                    WordPress Website
                  </Link>
                  <Link to="/services/ecommerce-website" onClick={() => setShowServices(false)}>
                    Ecommerce Website
                  </Link>
                  <Link to="/services/custom-cms-website" onClick={() => setShowServices(false)}>
                    Custom CMS Website
                  </Link>
                </div>

                <div className="dropdown-column">
                  <p className="dropdown-title">Online Marketing</p>
                  <Link to="/services/digital-branding" onClick={() => setShowServices(false)}>
                    Digital Branding
                  </Link>
                  <Link to="/services/email-marketing" onClick={() => setShowServices(false)}>
                    E-mail Marketing
                  </Link>
                  <Link to="/services/social-media-marketing" onClick={() => setShowServices(false)}>
                    Social Media Marketing
                  </Link>
                  <Link to="/services/seo-optimizing" onClick={() => setShowServices(false)}>
                    SEO Optimizing
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link to="/contact" className="nav-link">Na Kontaktoni</Link>
        </nav>

        <div className="nav-actions">
          {isAuthenticated() ? (
            <>
              {isCompanyOrAdmin && (
                <Link to="/post-job" className="btn btn-light">
                  Post Job
                </Link>
              )}

              {isCompanyOrAdmin && (
                <Link to="/my-posted-jobs" className="btn btn-light">
                  My Jobs
                </Link>
              )}

              {isCandidate && (
                <Link to="/my-applications" className="btn btn-light">
                  Aplikimet
                </Link>
              )}

              {isCandidate && (
                <Link to="/my-favorites" className="btn btn-light">
                  Favorites
                </Link>
              )}

              {isCompanyOrAdmin && (
                <Link to="/company-applications" className="btn btn-light">
                  Kandidatët
                </Link>
              )}

              {isAdmin && (
                <>
                  <Link to="/admin" className="btn btn-light">
                    Admin
                  </Link>
                  <Link to="/admin/users" className="btn btn-light">
                    Users
                  </Link>
                  <Link to="/admin/jobs" className="btn btn-light">
                    Jobs
                  </Link>
                </>
              )}

              <Link to="/dashboard" className="btn btn-light">
                {currentUser?.fullName?.split(" ")[0] || "Dashboard"}
              </Link>

              <button className="btn btn-primary logout-btn" onClick={handleLogout}>
                Dilni
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-light">Identifikohuni</Link>
              <Link to="/register" className="btn btn-primary">Regjistrohuni</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;