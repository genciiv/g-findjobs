import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/auth.css";
import { saveAuthData } from "../utils/auth";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      setLoading(true);

      const response = await API.post("/auth/register", formData);

      saveAuthData(response.data.token, response.data.user);

      setMessage({
        text: "Regjistrimi u krye me sukses. Po kaloni në dashboard...",
        type: "success",
      });

      setFormData({
        fullName: "",
        email: "",
        password: "",
        role: "candidate",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message || "Ndodhi një gabim gjatë regjistrimit",
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
          <span className="auth-badge">Krijo llogarinë tënde</span>
          <h1>Regjistrohuni</h1>
          <p>
            Plotëso të dhënat për të krijuar një llogari si kandidat ose kompani.
          </p>

          {message.text && (
            <div className={`auth-message ${message.type}`}>
              {message.text}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label>Emri i plotë</label>
              <input
                type="text"
                name="fullName"
                placeholder="Shkruaj emrin e plotë"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

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

            <div className="auth-form-group">
              <label>Roli</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="candidate">Kandidat</option>
                <option value="company">Kompani</option>
              </select>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Duke u regjistruar..." : "Regjistrohu"}
            </button>
          </form>

          <div className="auth-footer-text">
            Ke tashmë një llogari? <Link to="/login">Identifikohu</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;