import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/auth.css";
import { saveAuthData } from "../utils/auth";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      setLoading(true);

      const response = await API.post("/auth/login", formData);

      saveAuthData(response.data.token, response.data.user);

      setMessage({
        text: "Identifikimi u krye me sukses. Po kaloni në dashboard...",
        type: "success",
      });

      setFormData({
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message || "Ndodhi një gabim gjatë identifikimit",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <span className="auth-badge">Mirë se u rikthyet</span>
          <h1>Identifikohuni</h1>
          <p>
            Hyni në llogarinë tuaj për të aplikuar për punë ose për të menaxhuar njoftimet.
          </p>

          {message.text && (
            <div className={`auth-message ${message.type}`}>
              {message.text}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Shkruaj email-in"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="auth-form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Shkruaj password-in"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Duke u identifikuar..." : "Identifikohu"}
            </button>
          </form>

          <div className="auth-footer-text">
            Nuk ke ende një llogari? <Link to="/register">Regjistrohu</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;