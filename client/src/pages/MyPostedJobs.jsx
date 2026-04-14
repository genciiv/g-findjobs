import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import "../styles/my-posted-jobs.css";

const MyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchMyJobs = async () => {
    try {
      const response = await API.get("/jobs/my-jobs");
      setJobs(response.data.jobs || []);
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          "Nuk u arrit të merren punët e publikuara",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "A je i sigurt që dëshiron ta fshish këtë punë?"
    );

    if (!confirmDelete) return;

    try {
      const response = await API.delete(`/jobs/${jobId}`);

      setMessage({
        text: response.data.message || "Puna u fshi me sukses",
        type: "success",
      });

      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          "Ndodhi një gabim gjatë fshirjes së punës",
        type: "error",
      });
    }
  };

  return (
    <section className="my-posted-jobs-page">
      <div className="my-posted-jobs-container">
        <div className="my-posted-jobs-header">
          <span className="my-posted-jobs-badge">Punët e mia</span>
          <h1>Menaxho njoftimet e publikuara</h1>
          <p>
            Këtu mund të shikosh, modifikosh dhe fshish punët që ke postuar.
          </p>
        </div>

        {message.text && (
          <div className={`my-posted-jobs-message ${message.type}`}>
            {message.text}
          </div>
        )}

        {loading ? (
          <div className="my-posted-jobs-state">Duke ngarkuar punët...</div>
        ) : jobs.length === 0 ? (
          <div className="my-posted-jobs-state">
            Nuk ke ende asnjë punë të publikuar.
          </div>
        ) : (
          <div className="my-posted-jobs-grid">
            {jobs.map((job) => (
              <div className="my-posted-job-card" key={job._id}>
                <div className="my-posted-job-top">
                  <span className="my-posted-job-type">{job.jobType}</span>
                  <span className="my-posted-job-location">{job.location}</span>
                </div>

                <h2>{job.title}</h2>
                <p className="my-posted-job-company">{job.companyName}</p>
                <p className="my-posted-job-category">{job.category}</p>
                <p className="my-posted-job-salary">{job.salary}</p>
                <p className="my-posted-job-desc">
                  {job.description.length > 120
                    ? `${job.description.slice(0, 120)}...`
                    : job.description}
                </p>

                <div className="my-posted-job-actions">
                  <Link to={`/jobs/${job._id}`} className="my-job-btn view-btn">
                    Shiko
                  </Link>

                  <Link
                    to={`/edit-job/${job._id}`}
                    className="my-job-btn edit-btn"
                  >
                    Edito
                  </Link>

                  <button
                    className="my-job-btn delete-btn"
                    onClick={() => handleDelete(job._id)}
                  >
                    Fshi
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyPostedJobs;