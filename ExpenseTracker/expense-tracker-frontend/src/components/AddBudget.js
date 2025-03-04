import React, { useState } from "react";
import axios from "axios";

const AddBudget = () => {
  const [formData, setFormData] = useState({
    userID: "",
    categoryID: 0,
    limit: 0,
    period: "",
    startDate: "",
    endDate: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "limit" || name === "categoryID" ? Number(value) : value,
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

    if (!formData.limit || isNaN(formData.limit)) {
      alert("Limit must be a valid number.");
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      alert("Start date and end date are required.");
      return;
    }

    try {
      await axios.post("https://localhost:7058/api/Budget", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Budget added successfully!");
      setFormData({
        userID: "",
        categoryID: 0,
        limit: 0,
        period: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      console.error("Error adding budget:", error);
      setMessage("Failed to add budget. Please try again.");
    }
  };

  return (
    <div className="container mt-3">
      <h3 className="text-center">Add Budget</h3>
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
              type="number"
              name="categoryID"
              value={formData.categoryID}
              onChange={handleChange}
              placeholder="Category ID"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              name="limit"
              value={formData.limit}
              onChange={handleChange}
              placeholder="Limit"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="period"
              value={formData.period}
              onChange={handleChange}
              placeholder="Period (e.g., Monthly)"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Budget
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBudget;