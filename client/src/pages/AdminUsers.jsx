import { useEffect, useState } from "react";
import API from "../api";
import AdminLayout from "../components/AdminLayout";
import "../styles/admin.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    role: "",
  });
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchUsers = async (customFilters = filters) => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams();

      if (customFilters.search.trim()) {
        queryParams.set("search", customFilters.search.trim());
      }

      if (customFilters.role.trim()) {
        queryParams.set("role", customFilters.role.trim());
      }

      const response = await API.get(`/admin/users?${queryParams.toString()}`);
      setUsers(response.data.users || []);
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Nuk u arrit të merren users",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchUsers(filters);
  };

  const handleRoleChange = async (id, role) => {
    try {
      const response = await API.put(`/admin/users/${id}/role`, { role });

      setMessage({
        text: response.data.message || "Role u përditësua me sukses",
        type: "success",
      });

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, role: response.data.user.role } : user
        )
      );
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message || "Ndodhi një gabim gjatë ndryshimit të rolit",
        type: "error",
      });
    }
  };

  const handleDeleteUser = async (id, role) => {
    if (role === "admin") {
      setMessage({
        text: "Admin user nuk mund të fshihet",
        type: "error",
      });
      return;
    }

    const confirmDelete = window.confirm(
      "A je i sigurt që dëshiron ta fshish këtë user?"
    );

    if (!confirmDelete) return;

    try {
      const response = await API.delete(`/admin/users/${id}`);

      setMessage({
        text: response.data.message || "User u fshi me sukses",
        type: "success",
      });

      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Ndodhi një gabim gjatë fshirjes",
        type: "error",
      });
    }
  };

  return (
    <AdminLayout title="Users">
      <div className="admin-filter-box">
        <form className="admin-filter-form" onSubmit={handleFilterSubmit}>
          <div className="admin-filter-grid">
            <div className="admin-filter-group">
              <label>Kërko user</label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleChange}
                placeholder="Emër ose email"
              />
            </div>

            <div className="admin-filter-group">
              <label>Roli</label>
              <select name="role" value={filters.role} onChange={handleChange}>
                <option value="">Të gjithë</option>
                <option value="candidate">Candidate</option>
                <option value="company">Company</option>
                <option value="admin">Admin</option>
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
        <div className="admin-message">Duke ngarkuar users...</div>
      ) : users.length === 0 ? (
        <div className="admin-message">Nuk ka users.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Emri</th>
                <th>Email</th>
                <th>Roli</th>
                <th>Krijuar më</th>
                <th>Veprime</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    >
                      <option value="candidate">candidate</option>
                      <option value="company">company</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="admin-delete-btn"
                      onClick={() => handleDeleteUser(user._id, user.role)}
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

export default AdminUsers;