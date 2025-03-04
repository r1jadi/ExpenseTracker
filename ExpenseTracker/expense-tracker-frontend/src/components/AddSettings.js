import React, { useState } from "react";
import axios from "axios";

const AddSettings = () => {
  const [formData, setFormData] = useState({
    userID: "",
    preferenceName: "",
    value: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
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
      await axios.post("https://localhost:7058/api/Settings", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Settings added successfully!");
      setFormData({
        userID: "",
        preferenceName: "",
        value: "",
      });
    } catch (error) {
      console.error("Error adding settings:", error);
      setMessage("Failed to add settings. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Settings</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
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
          <div className="col-md-4">
            <input
              type="text"
              name="preferenceName"
              value={formData.preferenceName}
              onChange={handleChange}
              placeholder="Preference Name"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder="Value"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Settings
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSettings;
