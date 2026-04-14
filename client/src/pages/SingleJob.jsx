import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { getStoredUser, isAuthenticated } from "../utils/auth";
import "../styles/jobs.css";

const SingleJob = () => {
  const { id } = useParams();
  const currentUser = getStoredUser();

  const [job, setJob] = useState(null);
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });
  const [loading, setLoading] = useState(true);
  const [applyLoading, setApplyLoading] = useState(false);

  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    phone: "",
    cvLink: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await API.get(`/jobs/${id}`);
        setJob(response.data.job);
      } catch (error) {
        setMessage({
          text:
            error.response?.data?.message ||
            "Nuk u arrit të merret njoftimi i punës",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setApplicationData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      setApplyLoading(true);

      const response = await API.post(`/applications/apply/${id}`, applicationData);

      setMessage({
        text: response.data.message || "Aplikimi u dërgua me sukses",
        type: "success",
      });

      setApplicationData({
        coverLetter: "",
        phone: "",
        cvLink: "",
      });
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          "Ndodhi një gabim gjatë aplikimit",
        type: "error",
      });
    } finally {
      setApplyLoading(false);
    }
  };

  const canApply =
    isAuthenticated() && currentUser?.role === "candidate";

  return (
    <section className="single-job-page">
      <div className="jobs-container">
        {loading ? (
          <div className="jobs-loading">Duke ngarkuar detajet e punës...</div>
        ) : message.text && !job ? (
          <div className={`jobs-message ${message.type}`}>{message.text}</div>
        ) : job ? (
          <div className="single-job-layout">
            <div className="single-job-card">
              <div className="single-job-top">
                <span className="job-list-type">{job.jobType}</span>
                <span className="job-list-location">{job.location}</span>
              </div>

              <h1>{job.title}</h1>
              <p className="single-job-company">{job.companyName}</p>

              <div className="single-job-meta">
                <div>
                  <h3>Kategoria</h3>
                  <p>{job.category}</p>
                </div>
                <div>
                  <h3>Paga</h3>
                  <p>{job.salary}</p>
                </div>
                <div>
                  <h3>Publikuar nga</h3>
                  <p>{job.postedBy?.fullName || "Unknown"}</p>
                </div>
                <div>
                  <h3>Email</h3>
                  <p>{job.postedBy?.email || "Unknown"}</p>
                </div>
              </div>

              <div className="single-job-section">
                <h2>Përshkrimi</h2>
                <p>{job.description}</p>
              </div>

              <div className="single-job-section">
                <h2>Kërkesat</h2>
                <p>{job.requirements || "Nuk janë shtuar ende kërkesa specifike."}</p>
              </div>
            </div>

            <div className="apply-card">
              <span className="jobs-badge">Aplikim</span>
              <h2>Apliko për këtë punë</h2>

              {message.text && (
                <div className={`jobs-message ${message.type}`} style={{ textAlign: "left" }}>
                  {message.text}
                </div>
              )}

              {!isAuthenticated() ? (
                <p className="apply-note">
                  Duhet të identifikohesh si kandidat për të aplikuar.
                </p>
              ) : currentUser?.role !== "candidate" ? (
                <p className="apply-note">
                  Vetëm përdoruesit me rolin kandidat mund të aplikojnë për punë.
                </p>
              ) : (
                <form className="apply-form" onSubmit={handleApply}>
                  <div className="apply-group">
                    <label>Numri i telefonit</label>
                    <input
                      type="text"
                      name="phone"
                      value={applicationData.phone}
                      onChange={handleChange}
                      placeholder="p.sh. +355 69 123 4567"
                    />
                  </div>

                  <div className="apply-group">
                    <label>Link CV</label>
                    <input
                      type="text"
                      name="cvLink"
                      value={applicationData.cvLink}
                      onChange={handleChange}
                      placeholder="p.sh. https://..."
                    />
                  </div>

                  <div className="apply-group">
                    <label>Cover Letter</label>
                    <textarea
                      name="coverLetter"
                      value={applicationData.coverLetter}
                      onChange={handleChange}
                      placeholder="Shkruaj një prezantim të shkurtër"
                      rows="6"
                    />
                  </div>

                  <button type="submit" className="job-apply-btn" disabled={applyLoading || !canApply}>
                    {applyLoading ? "Duke aplikuar..." : "Dërgo Aplikimin"}
                  </button>
                </form>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default SingleJob;