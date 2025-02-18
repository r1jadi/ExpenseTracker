import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("Authentication required. Please log in.");
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get("https://localhost:7058/api/Users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userRole = response.data?.role;
      
      if (userRole !== "Admin") {
        setMessage("Access denied. Admins only.");
        return;
      }
      setUsers(response.data?.$values || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("Failed to load users. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Admin Dashboard</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
