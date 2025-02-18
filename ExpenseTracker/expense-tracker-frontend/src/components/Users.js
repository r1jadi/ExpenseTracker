import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roles: "",
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("jwtToken"); // Retrieve token

    if (!token) {
      console.error("No token found! User is not authenticated.");
      setMessage("Authentication required. Please log in.");
      return;
    }

    try {
      const response = await axios.get("https://localhost:7058/api/Auth/GetAllUsers", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach JWT token
          "Content-Type": "application/json",
        },
      });

      const data = response.data.$values || response.data; // Handle possible wrapper

      if (Array.isArray(data)) {
        setUsers(data.map(user => ({
          ...user,
          roles: user.roles?.$values || [], // Ensure roles are extracted properly
        })));
      } else {
        console.error("Unexpected response format:", response.data);
        setMessage("Failed to load users. Unexpected data format.");
      }
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
      setMessage("Failed to load users. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.userName || user.name,
      email: user.email,
      password: "", // Leave blank for security
      roles: user.roles?.join(", ") || "", // Convert roles to string
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("jwtToken"); // Retrieve token
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }

    try {
      const rolesArray = formData.roles.split(",").map((role) => role.trim());

      if (editingUserId) {
        await axios.put(`https://localhost:7058/api/Auth/EditUser/${editingUserId}`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          roles: rolesArray,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMessage("User updated successfully!");
      } else {
        await axios.post("https://localhost:7058/api/Auth/AddUser", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          roles: rolesArray,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMessage("User added successfully!");
      }

      setFormData({ name: "", email: "", password: "", roles: "" });
      setEditingUserId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error submitting user:", error.response?.data || error.message);
      setMessage("Failed to submit user. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    setMessage("");

    const token = localStorage.getItem("jwtToken"); // Retrieve token
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }

    try {
      await axios.delete(`https://localhost:7058/api/Auth/DeleteUser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error.message);
      setMessage("Failed to delete user. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">User Management</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-control"
              required={!editingUserId}
            />
          </div>
          <div className="col-md-12">
            <input
              type="text"
              name="roles"
              value={formData.roles}
              onChange={handleChange}
              placeholder="Roles (comma-separated)"
              className="form-control"
            />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">
              {editingUserId ? "Update User" : "Add User"}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.userName || user.name}</td>
                <td>{user.email}</td>
                <td>{user.roles.length > 0 ? user.roles.join(", ") : "No roles"}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
