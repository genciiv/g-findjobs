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
  const [contactMessage, setContactMessage] = useState({
    text: "",
    type: "",
  });
  const [loading, setLoading] = useState(true);
  const [applyLoading, setApplyLoading] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    phone: "",
    cvLink: "",
  });

  const [contactData, setContactData] = useState({
    name: currentUser?.fullName || "",
    email: currentUser?.email || "",
    message: "",
  });

  useEffect(() => {
    if (!id) {
      setMessage({
        text: "ID e punës mungon ose është e pavlefshme.",
        type: "error",
      });
      setLoading(false);
      return;
    }

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

  useEffect(() => {
    if (!id) return;
    if (!isAuthenticated()) return;
    if (currentUser?.role !== "candidate") return;

    const checkFavorite = async () => {
      try {
        const response = await API.get(`/favorites/check/${id}`);
        setIsFavorite(response.data.isFavorite);
      } catch {
        // silent
      }
    };

    checkFavorite();
  }, [id, currentUser?.role]);

  const handleChange = (e) => {
    setApplicationData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleContactChange = (e) => {
    setContactData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!id) {
      setMessage({
        text: "ID e punës mungon.",
        type: "error",
      });
      return;
    }

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

  const handleToggleFavorite = async () => {
    if (!id) {
      setMessage({
        text: "ID e punës mungon.",
        type: "error",
      });
      return;
    }

    try {
      setFavoriteLoading(true);

      const response = await API.post(`/favorites/toggle/${id}`);

      setIsFavorite(response.data.isFavorite);

      setMessage({
        text: response.data.message,
        type: "success",
      });
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          "Ndodhi një gabim gjatë ruajtjes së punës",
        type: "error",
      });
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();

    if (!contactData.name || !contactData.email || !contactData.message) {
      setContactMessage({
        text: "Ju lutem plotësoni të gjitha fushat e kontaktit.",
        type: "error",
      });
      return;
    }

    setContactMessage({
      text: `Mesazhi u përgatit për ${job?.postedBy?.email || "kompaninë"}. Për ta bërë realisht funksional, më pas lidhet me email service.`,
      type: "success",
    });

    setContactData((prev) => ({
      ...prev,
      message: "",
    }));
  };

  const canApply = isAuthenticated() && currentUser?.role === "candidate";
  const canFavorite = isAuthenticated() && currentUser?.role === "candidate";

  return (
    <section className="single-job-page">
      <div className="jobs-container">
        {loading ? (
          <div className="jobs-loading">Duke ngarkuar detajet e punës...</div>
        ) : message.text && !job ? (
          <div className={`jobs-message ${message.type}`}>{message.text}</div>
        ) : job ? (
          <div className="single-job-layout modern">
            <div className="single-job-card modern-card">
              <div className="single-job-top">
                <span className="job-list-type">{job.jobType}</span>
                <span className="job-list-location">{job.location}</span>
              </div>

              <h1>{job.title}</h1>
              <p className="single-job-company">{job.companyName}</p>

              {canFavorite && (
                <div className="single-job-favorite-wrap">
                  <button
                    className={`favorite-toggle-btn ${isFavorite ? "saved" : ""}`}
                    onClick={handleToggleFavorite}
                    disabled={favoriteLoading}
                    type="button"
                  >
                    {favoriteLoading
                      ? "Duke ruajtur..."
                      : isFavorite
                      ? "★ E ruajtur"
                      : "☆ Ruaje këtë punë"}
                  </button>
                </div>
              )}

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

            <div className="job-sidebar-stack">
              <div className="apply-card modern-card">
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

              <div className="apply-card modern-card">
                <span className="jobs-badge">Kontakto Kompaninë</span>
                <h2>Dërgo interesin tënd</h2>

                {contactMessage.text && (
                  <div className={`jobs-message ${contactMessage.type}`} style={{ textAlign: "left" }}>
                    {contactMessage.text}
                  </div>
                )}

                <form className="apply-form" onSubmit={handleContactSubmit}>
                  <div className="apply-group">
                    <label>Emri</label>
                    <input
                      type="text"
                      name="name"
                      value={contactData.name}
                      onChange={handleContactChange}
                      placeholder="Emri juaj"
                    />
                  </div>

                  <div className="apply-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={contactData.email}
                      onChange={handleContactChange}
                      placeholder="Email juaj"
                    />
                  </div>

                  <div className="apply-group">
                    <label>Mesazhi</label>
                    <textarea
                      name="message"
                      value={contactData.message}
                      onChange={handleContactChange}
                      placeholder={`Përshëndetje ${job.companyName}, jam i interesuar për këtë pozicion...`}
                      rows="5"
                    />
                  </div>

                  <button type="submit" className="job-apply-btn">
                    Kontakto
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default SingleJob;