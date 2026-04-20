import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import DashboardLayout from "../components/DashboardLayout";
import "../styles/favorites.css";

const MyFavoriteJobs = () => {
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const response = await API.get("/favorites/my-favorites");
      setFavorites(response.data.favorites || []);
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          "Nuk u arrit të merren punët favorite",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (jobId, favoriteId) => {
    if (!jobId) return;

    try {
      const response = await API.post(`/favorites/toggle/${jobId}`);

      setMessage({
        text: response.data.message || "Puna u hoq nga favorites",
        type: "success",
      });

      setFavorites((prev) => prev.filter((item) => item._id !== favoriteId));
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          "Ndodhi një gabim gjatë heqjes nga favorites",
        type: "error",
      });
    }
  };

  return (
    <DashboardLayout title="Favorite Jobs">
      {message.text && (
        <div className={`favorites-message ${message.type}`}>
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="favorites-state">Duke ngarkuar favorites...</div>
      ) : favorites.length === 0 ? (
        <div className="favorites-state">
          Nuk ke ende asnjë punë të ruajtur.
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((item) => (
            <div className="favorite-card" key={item._id}>
              <div className="favorite-top">
                <span className="favorite-type">{item.job?.jobType || "-"}</span>
                <span className="favorite-location">{item.job?.location || "-"}</span>
              </div>

              <h2>{item.job?.title || "Job not available"}</h2>
              <p className="favorite-company">{item.job?.companyName || "-"}</p>
              <p className="favorite-category">{item.job?.category || "-"}</p>
              <p className="favorite-salary">{item.job?.salary || "-"}</p>
              <p className="favorite-date">
                Ruajtur më: {new Date(item.savedAt).toLocaleString()}
              </p>

              <div className="favorite-actions">
                {item.job?._id && (
                  <Link to={`/jobs/${item.job._id}`} className="favorite-btn view-btn">
                    Shiko
                  </Link>
                )}

                <button
                  className="favorite-btn remove-btn"
                  onClick={() => handleRemoveFavorite(item.job?._id, item._id)}
                  disabled={!item.job?._id}
                >
                  Hiqe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyFavoriteJobs;