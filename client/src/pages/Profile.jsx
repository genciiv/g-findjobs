import { useEffect, useState } from "react";
import API from "../api";
import "../styles/profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await API.get("/auth/me");
        setUser(response.data.user);
      } catch (error) {
        setMessage({
          text:
            error.response?.data?.message ||
            "Nuk u arrit të merret profili i përdoruesit",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) {
    return (
      <section className="profile-page">
        <div className="profile-container">
          <div className="profile-card">
            <p>Duke ngarkuar profilin...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="profile-page">
      <div className="profile-container">
        <div className="profile-card">
          <span className="profile-badge">Profili i përdoruesit</span>
          <h1>Të dhënat e profilit</h1>

          {message.text && (
            <div className={`profile-message ${message.type}`}>
              {message.text}
            </div>
          )}

          {user && (
            <div className="profile-grid">
              <div className="profile-item">
                <h3>Emri i plotë</h3>
                <p>{user.fullName}</p>
              </div>

              <div className="profile-item">
                <h3>Email</h3>
                <p>{user.email}</p>
              </div>

              <div className="profile-item">
                <h3>Roli</h3>
                <p>{user.role}</p>
              </div>

              <div className="profile-item">
                <h3>Krijuar më</h3>
                <p>{new Date(user.createdAt).toLocaleString()}</p>
              </div>

              <div className="profile-item">
                <h3>Përditësuar më</h3>
                <p>{new Date(user.updatedAt).toLocaleString()}</p>
              </div>

              <div className="profile-item">
                <h3>ID</h3>
                <p>{user.id}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;