import { useEffect, useState } from "react";
import API from "../api";
import "../styles/applications.css";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await API.get("/applications/my-applications");
        setApplications(response.data.applications || []);
      } catch (error) {
        setMessage({
          text:
            error.response?.data?.message ||
            "Nuk u arrit të merren aplikimet",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <section className="applications-page">
      <div className="applications-container">
        <div className="applications-header">
          <span className="applications-badge">Aplikimet e mia</span>
          <h1>Shiko historikun e aplikimeve</h1>
          <p>Monitoro punët ku ke aplikuar dhe statusin e secilit aplikim.</p>
        </div>

        {loading ? (
          <div className="applications-state">Duke ngarkuar aplikimet...</div>
        ) : message.text ? (
          <div className={`applications-message ${message.type}`}>{message.text}</div>
        ) : applications.length === 0 ? (
          <div className="applications-state">Nuk ke ende asnjë aplikim.</div>
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
                <p className="application-meta">Lokacioni: {item.job?.location || "-"}</p>
                <p className="application-meta">Tipi: {item.job?.jobType || "-"}</p>
                <p className="application-meta">Kategoria: {item.job?.category || "-"}</p>
                <p className="application-meta">Paga: {item.job?.salary || "-"}</p>
                <p className="application-date">
                  Aplikuar më: {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyApplications;