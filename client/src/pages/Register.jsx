import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { saveAuthData } from "../utils/auth";
import "../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      setLoading(true);

      const response = await API.post("/auth/register", formData);

      saveAuthData(response.data.token, response.data.user);

      setMessage({
        text: response.data.message || "Regjistrim me sukses",
        type: "success",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 700);
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Regjistrimi dështoi",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page premium-auth">
      <div className="auth-shell">
        <div className="auth-side-info">
          <span className="auth-badge">Start Now</span>
          <h1>Krijo llogarinë tënde</h1>
          <p>
            Regjistrohu si kandidat për të aplikuar për punë ose si kompani për
            të publikuar pozicione të reja dhe për të menaxhuar kandidatët.
          </p>
        </div>

        <div className="auth-card premium-card">
          <h2>Regjistrohuni</h2>
          <p className="auth-subtext">
            Plotëso të dhënat për të hyrë në platformë.
          </p>

          {message.text && (
            <div className={`auth-message ${message.type}`}>{message.text}</div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-group">
              <label>Emri i plotë</label>
              <input
                type="text"
                name="fullName"
                placeholder="Vendos emrin e plotë"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="auth-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Vendos email-in"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="auth-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Vendos password-in"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="auth-group">
              <label>Roli</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="candidate">Candidate</option>
                <option value="company">Company</option>
              </select>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Duke u regjistruar..." : "Regjistrohu"}
            </button>
          </form>

          <div className="auth-divider">
            <span>ose</span>
          </div>

          <button
            type="button"
            className="google-auth-btn"
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </button>

          <p className="auth-switch">
            Ke llogari? <Link to="/login">Identifikohu</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;