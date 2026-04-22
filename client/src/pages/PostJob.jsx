import { useState } from "react";
import API from "../api";
import { getStoredUser } from "../utils/auth";
import DashboardLayout from "../components/DashboardLayout";
import "../styles/post-job.css";

const categories = [
  "IT & Software",
  "Marketing & Media",
  "Graphic Design",
  "Sales & Business",
  "Finance",
  "Administration",
  "Education",
  "Remote Jobs",
];

const PostJob = () => {
  const currentUser = getStoredUser();

  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    jobType: "Full Time",
    category: "IT & Software",
    salary: "",
    description: "",
    requirements: "",
  });

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);

  const isCompanyOrAdmin =
    currentUser?.role === "company" || currentUser?.role === "admin";

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

      const response = await API.post("/jobs", formData);

      setMessage({
        text: response.data.message || "Puna u publikua me sukses",
        type: "success",
      });

      setFormData({
        title: "",
        companyName: "",
        location: "",
        jobType: "Full Time",
        category: "IT & Software",
        salary: "",
        description: "",
        requirements: "",
      });
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          "Ndodhi një gabim gjatë publikimit të punës",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isCompanyOrAdmin) {
    return (
      <DashboardLayout title="Post Job">
        <div className="post-job-card">
          <span className="post-job-badge">Akses i kufizuar</span>
          <h1>Vetëm kompanitë mund të publikojnë punë</h1>
          <p>
            Duhet të jesh i regjistruar si kompani ose admin për të postuar një
            njoftim të ri pune.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Post Job">
      <div className="post-job-card">
        <span className="post-job-badge">Publiko një punë të re</span>
        <h1>Krijo njoftim pune</h1>
        <p>
          Plotëso të dhënat më poshtë për të publikuar një mundësi të re pune
          në G-FindJobs.
        </p>

        {message.text && (
          <div className={`post-job-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form className="post-job-form" onSubmit={handleSubmit}>
          <div className="post-job-grid">
            <div className="post-job-group">
              <label>Titulli i punës</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="p.sh. Frontend Developer"
              />
            </div>

            <div className="post-job-group">
              <label>Emri i kompanisë</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="p.sh. G-FindJobs Agency"
              />
            </div>

            <div className="post-job-group">
              <label>Vendndodhja</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="p.sh. Tirane"
              />
            </div>

            <div className="post-job-group">
              <label>Tipi i punës</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div className="post-job-group">
              <label>Kategoria</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="post-job-group">
              <label>Paga</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="p.sh. 80,000 - 120,000 ALL"
              />
            </div>
          </div>

          <div className="post-job-group">
            <label>Përshkrimi</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Shkruaj përshkrimin e punës"
              rows="6"
            />
          </div>

          <div className="post-job-group">
            <label>Kërkesat</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Shkruaj kërkesat për kandidatin"
              rows="5"
            />
          </div>

          <button type="submit" className="post-job-btn" disabled={loading}>
            {loading ? "Duke publikuar..." : "Publiko Punën"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default PostJob;