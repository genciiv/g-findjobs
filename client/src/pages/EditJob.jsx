import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import "../styles/post-job.css";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    jobType: "Full Time",
    category: "",
    salary: "",
    description: "",
    requirements: "",
  });

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await API.get(`/jobs/${id}`);
        const job = response.data.job;

        setFormData({
          title: job.title || "",
          companyName: job.companyName || "",
          location: job.location || "",
          jobType: job.jobType || "Full Time",
          category: job.category || "",
          salary: job.salary || "",
          description: job.description || "",
          requirements: job.requirements || "",
        });
      } catch (error) {
        setMessage({
          text:
            error.response?.data?.message ||
            "Nuk u arrit të merret puna për editim",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

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
      setSubmitLoading(true);

      const response = await API.put(`/jobs/${id}`, formData);

      setMessage({
        text: response.data.message || "Puna u përditësua me sukses",
        type: "success",
      });

      setTimeout(() => {
        navigate("/my-posted-jobs");
      }, 1200);
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          "Ndodhi një gabim gjatë përditësimit të punës",
        type: "error",
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <section className="post-job-page">
      <div className="post-job-container">
        <div className="post-job-card">
          <span className="post-job-badge">Edito njoftimin</span>
          <h1>Përditëso punën</h1>
          <p>
            Ndrysho të dhënat e punës dhe ruaj versionin e përditësuar.
          </p>

          {message.text && (
            <div className={`post-job-message ${message.type}`}>
              {message.text}
            </div>
          )}

          {loading ? (
            <div className="post-job-message">Duke ngarkuar të dhënat...</div>
          ) : (
            <form className="post-job-form" onSubmit={handleSubmit}>
              <div className="post-job-grid">
                <div className="post-job-group">
                  <label>Titulli i punës</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="post-job-group">
                  <label>Emri i kompanisë</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>

                <div className="post-job-group">
                  <label>Vendndodhja</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
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
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  />
                </div>

                <div className="post-job-group">
                  <label>Paga</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="post-job-group">
                <label>Përshkrimi</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                />
              </div>

              <div className="post-job-group">
                <label>Kërkesat</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows="5"
                />
              </div>

              <button type="submit" className="post-job-btn" disabled={submitLoading}>
                {submitLoading ? "Duke ruajtur..." : "Ruaj Ndryshimet"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default EditJob;