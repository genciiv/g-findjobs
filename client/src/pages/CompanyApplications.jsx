import { useEffect, useState } from "react";
import API from "../api";
import "../styles/applications.css";

const CompanyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await API.get("/applications/company-applications");
        setApplications(response.data.applications || []);
      } catch (error) {
        setMessage({
          text:
            error.response?.data?.message ||
            "Nuk u arrit të merren aplikimet e kompanisë",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (applicationId, status) => {
    try {
      const response = await API.put(`/applications/${applicationId}/status`, {
        status,
      });

      setApplications((prev) =>
        prev.map((item) =>
          item._id === applicationId
            ? { ...item, status: response.data.application.status }
            : item
        )
      );
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          "Ndodhi një gabim gjatë përditësimit të statusit",
        type: "error",
      });
    }
  };

  return (
    <section className="applications-page">
      <div className="applications-container">
        <div className="applications-header">
          <span className="applications-badge">Aplikimet e kompanisë</span>
          <h1>Menaxho kandidatët që kanë aplikuar</h1>
          <p>Shiko aplikimet për punët e publikuara dhe ndrysho statusin e tyre.</p>
        </div>

        {loading ? (
          <div className="applications-state">Duke ngarkuar aplikimet...</div>
        ) : message.text && applications.length === 0 ? (
          <div className={`applications-message ${message.type}`}>{message.text}</div>
        ) : applications.length === 0 ? (
          <div className="applications-state">Nuk ka ende aplikime për punët e tua.</div>
        ) : (
          <div className="applications-grid">
            {applications.map((item) => (
              <div className="application-card" key={item._id}>
                <div className="application-top">
                  <span className={`application-status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </div>

                <h2>{item.job?.title || "Job not available"}</h2>
                <p className="application-company">{item.job?.companyName || "-"}</p>
                <p className="application-meta">
                  Kandidati: {item.applicant?.fullName || "-"}
                </p>
                <p className="application-meta">
                  Email: {item.applicant?.email || "-"}
                </p>
                <p className="application-meta">
                  Telefoni: {item.phone || "-"}
                </p>
                <p className="application-meta">
                  CV: {item.cvLink || "-"}
                </p>
                <p className="application-meta">
                  Cover Letter: {item.coverLetter || "-"}
                </p>
                <p className="application-date">
                  Aplikuar më: {new Date(item.createdAt).toLocaleString()}
                </p>

                <div className="application-actions">
                  <button onClick={() => handleStatusChange(item._id, "Reviewed")}>
                    Reviewed
                  </button>
                  <button onClick={() => handleStatusChange(item._id, "Accepted")}>
                    Accepted
                  </button>
                  <button onClick={() => handleStatusChange(item._id, "Rejected")}>
                    Rejected
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {message.text && applications.length > 0 && (
          <div className={`applications-message ${message.type}`} style={{ marginTop: "20px" }}>
            {message.text}
          </div>
        )}
      </div>
    </section>
  );
};

export default CompanyApplications;