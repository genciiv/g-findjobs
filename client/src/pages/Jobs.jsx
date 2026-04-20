import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../api";
import "../styles/jobs.css";

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({
    totalJobs: 0,
    totalPages: 1,
    currentPage: 1,
    perPage: 6,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    location: searchParams.get("location") || "",
    jobType: searchParams.get("jobType") || "",
    sortBy: searchParams.get("sortBy") || "latest",
  });

  const fetchJobs = async (customFilters = filters, pageNumber = 1) => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams();

      if (customFilters.search.trim()) {
        queryParams.set("search", customFilters.search.trim());
      }

      if (customFilters.category.trim()) {
        queryParams.set("category", customFilters.category.trim());
      }

      if (customFilters.location.trim()) {
        queryParams.set("location", customFilters.location.trim());
      }

      if (customFilters.jobType.trim()) {
        queryParams.set("jobType", customFilters.jobType.trim());
      }

      if (customFilters.sortBy.trim()) {
        queryParams.set("sortBy", customFilters.sortBy.trim());
      }

      queryParams.set("page", pageNumber);
      queryParams.set("limit", 6);

      setSearchParams(queryParams);

      const response = await API.get(`/jobs?${queryParams.toString()}`);

      setJobs(response.data.jobs || []);
      setPagination(
        response.data.pagination || {
          totalJobs: 0,
          totalPages: 1,
          currentPage: 1,
          perPage: 6,
          hasNextPage: false,
          hasPrevPage: false,
        }
      );
      setMessage({ text: "", type: "" });
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          "Nuk u arrit të merren njoftimet e punës",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialFilters = {
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "",
      location: searchParams.get("location") || "",
      jobType: searchParams.get("jobType") || "",
      sortBy: searchParams.get("sortBy") || "latest",
    };

    const initialPage = Number(searchParams.get("page")) || 1;

    setFilters(initialFilters);
    fetchJobs(initialFilters, initialPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchJobs(filters, 1);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      search: "",
      category: "",
      location: "",
      jobType: "",
      sortBy: "latest",
    };

    setFilters(resetFilters);
    fetchJobs(resetFilters, 1);
  };

  const handlePageChange = (pageNumber) => {
    fetchJobs(filters, pageNumber);
  };

  return (
    <section className="jobs-page">
      <div className="jobs-container">
        <div className="jobs-header">
          <span className="jobs-badge">Të gjitha punët</span>
          <h1>Eksploro mundësitë më të mira të punës</h1>
          <p>
            Gjej pozicione të reja sipas aftësive, qytetit dhe kategorisë që të
            intereson.
          </p>
        </div>

        <div className="jobs-filter-box">
          <form className="jobs-filter-form" onSubmit={handleFilterSubmit}>
            <div className="jobs-filter-grid">
              <div className="jobs-filter-group">
                <label>Kërko sipas titullit</label>
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleChange}
                  placeholder="p.sh. Frontend Developer"
                />
              </div>

              <div className="jobs-filter-group">
                <label>Kategoria</label>
                <input
                  type="text"
                  name="category"
                  value={filters.category}
                  onChange={handleChange}
                  placeholder="p.sh. IT & Software"
                />
              </div>

              <div className="jobs-filter-group">
                <label>Lokacioni</label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleChange}
                  placeholder="p.sh. Tirane"
                />
              </div>

              <div className="jobs-filter-group">
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

              <div className="jobs-filter-group">
                <label>Renditja</label>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleChange}
                >
                  <option value="latest">Më të rejat</option>
                  <option value="oldest">Më të vjetrat</option>
                  <option value="title-asc">Titulli A-Z</option>
                  <option value="title-desc">Titulli Z-A</option>
                  <option value="location-asc">Lokacioni A-Z</option>
                  <option value="location-desc">Lokacioni Z-A</option>
                </select>
              </div>
            </div>

            <div className="jobs-filter-actions">
              <button type="submit" className="jobs-search-btn">
                Kërko
              </button>
              <button
                type="button"
                className="jobs-reset-btn"
                onClick={handleResetFilters}
              >
                Pastro Filtrat
              </button>
            </div>
          </form>
        </div>

        {message.text && (
          <div className={`jobs-message ${message.type}`}>{message.text}</div>
        )}

        {!loading && !message.text && (
          <div className="jobs-results-info">
            U gjetën <strong>{pagination.totalJobs}</strong> punë.
          </div>
        )}

        {loading ? (
          <div className="jobs-loading">Duke ngarkuar punët...</div>
        ) : jobs.length === 0 ? (
          <div className="jobs-empty">Nuk u gjet asnjë punë me këta filtra.</div>
        ) : (
          <>
            <div className="jobs-grid-page">
              {jobs.map((job) => (
                <div className="job-list-card" key={job._id}>
                  <div className="job-list-top">
                    <span className="job-list-type">{job.jobType}</span>
                    <span className="job-list-location">{job.location}</span>
                  </div>

                  <h2>{job.title}</h2>
                  <p className="job-list-company">{job.companyName}</p>
                  <p className="job-list-category">{job.category}</p>
                  <p className="job-list-salary">{job.salary}</p>
                  <p className="job-list-desc">
                    {job.description?.length > 120
                      ? `${job.description.slice(0, 120)}...`
                      : job.description}
                  </p>

                  <Link to={`/jobs/${job._id}`} className="job-view-btn">
                    Shiko Detajet
                  </Link>
                </div>
              ))}
            </div>

            <div className="pagination-box">
              <button
                className="pagination-btn"
                disabled={!pagination.hasPrevPage}
                onClick={() => handlePageChange(pagination.currentPage - 1)}
              >
                ← Previous
              </button>

              <div className="pagination-info">
                Faqja {pagination.currentPage} nga {pagination.totalPages || 1}
              </div>

              <button
                className="pagination-btn"
                disabled={!pagination.hasNextPage}
                onClick={() => handlePageChange(pagination.currentPage + 1)}
              >
                Next →
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Jobs;