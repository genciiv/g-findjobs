import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { saveAuthData } from "../utils/auth";
import "../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

      const response = await API.post("/auth/login", formData);

      saveAuthData(response.data.token, response.data.user);

      setMessage({
        text: response.data.message || "Login me sukses",
        type: "success",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 700);
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Login dështoi",
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
          <span className="auth-badge">Welcome Back</span>
          <h1>Hyr në llogarinë tënde</h1>
          <p>
            Menaxho aplikimet, punët e publikuara, favorites dhe gjithë
            aktivitetin tënd në G-FindJobs nga një panel modern dhe profesional.
          </p>
        </div>

        <div className="auth-card premium-card">
          <h2>Identifikohuni</h2>
          <p className="auth-subtext">Hyni për të vazhduar në platformë.</p>

          {message.text && (
            <div className={`auth-message ${message.type}`}>{message.text}</div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
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

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Duke hyrë..." : "Hyr"}
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
            Nuk ke llogari? <Link to="/register">Regjistrohu</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;