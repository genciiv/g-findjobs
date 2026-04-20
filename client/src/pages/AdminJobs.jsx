import { useEffect, useState } from "react";
import API from "../api";
import AdminLayout from "../components/AdminLayout";
import "../styles/admin.css";

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    jobType: "",
  });
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchJobs = async (customFilters = filters) => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams();

      if (customFilters.search.trim()) {
        queryParams.set("search", customFilters.search.trim());
      }

      if (customFilters.location.trim()) {
        queryParams.set("location", customFilters.location.trim());
      }

      if (customFilters.jobType.trim()) {
        queryParams.set("jobType", customFilters.jobType.trim());
      }

      const response = await API.get(`/admin/jobs?${queryParams.toString()}`);
      setJobs(response.data.jobs || []);
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Nuk u arrit të merren jobs",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchJobs(filters);
  };

  const handleDeleteJob = async (id) => {
    const confirmDelete = window.confirm(
      "A je i sigurt që dëshiron ta fshish këtë job?"
    );

    if (!confirmDelete) return;

    try {
      const response = await API.delete(`/admin/jobs/${id}`);

      setMessage({
        text: response.data.message || "Job u fshi me sukses",
        type: "success",
      });

      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          "Ndodhi një gabim gjatë fshirjes së job",
        type: "error",
      });
    }
  };

  return (
    <AdminLayout title="Jobs">
      <div className="admin-filter-box">
        <form className="admin-filter-form" onSubmit={handleFilterSubmit}>
          <div className="admin-filter-grid admin-filter-grid-3">
            <div className="admin-filter-group">
              <label>Kërko job</label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleChange}
                placeholder="Titull, kompani ose kategori"
              />
            </div>

            <div className="admin-filter-group">
              <label>Lokacioni</label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleChange}
                placeholder="p.sh. Tirane"
              />
            </div>

            <div className="admin-filter-group">
              <label>Tipi i punës</label>
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleChange}
              >
                <option value="">Të gjitha</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>

          <div className="admin-filter-actions">
            <button type="submit">Kërko</button>
          </div>
        </form>
      </div>

      {message.text && (
        <div className={`admin-message ${message.type}`}>{message.text}</div>
      )}

      {loading ? (
        <div className="admin-message">Duke ngarkuar jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="admin-message">Nuk ka jobs.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Titulli</th>
                <th>Kompania</th>
                <th>Lokacioni</th>
                <th>Tipi</th>
                <th>Posted by</th>
                <th>Veprime</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.companyName}</td>
                  <td>{job.location}</td>
                  <td>{job.jobType}</td>
                  <td>
                    {job.postedBy?.fullName || "Unknown"}
                    <br />
                    <small>{job.postedBy?.email || "Unknown"}</small>
                  </td>
                  <td>
                    <button
                      className="admin-delete-btn"
                      onClick={() => handleDeleteJob(job._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminJobs;