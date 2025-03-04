import React, { useState } from "react";
import axios from "axios";

const AddNotification = () => {
  const [formData, setFormData] = useState({
    userID: "",
    message: "",
    date: "",
    isRead: false,
    type: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }

    try {
      await axios.post("https://localhost:7058/api/Notification", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Notification added successfully!");
      setFormData({
        userID: "",
        message: "",
        date: "",
        isRead: false,
        type: "",
      });
    } catch (error) {
      console.error("Error adding notification:", error);
      setMessage("Failed to add notification. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Notification</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              name="userID"
              value={formData.userID}
              onChange={handleChange}
              placeholder="User ID"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Type"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <div className="form-check">
              <input
                type="checkbox"
                name="isRead"
                checked={formData.isRead}
                onChange={handleChange}
                className="form-check-input"
                id="isRead"
              />
              <label htmlFor="isRead" className="form-check-label">
                Is Read
              </label>
            </div>
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Notification
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNotification;
