import React, { useState, useEffect } from "react";
import axios from "axios";

const AddBudget = ({ onBudgetAdded }) => {
  const [formData, setFormData] = useState({
    categoryID: 0,
    limit: 0,
    period: "",
    startDate: "",
    endDate: "",
  });
  const [message, setMessage] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    if (storedUserID) {
      setUserID(storedUserID);
    }
  }, []);

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
      const budgetData = { ...formData, userID };
      await axios.post("https://localhost:7058/api/Budget", budgetData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Budget added successfully!");
      setFormData({ categoryID: 0, limit: 0, period: "", startDate: "", endDate: "" });
      if (onBudgetAdded) onBudgetAdded();
    } catch (error) {
      console.error("Error adding budget:", error);
      setMessage("Failed to add budget. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add New Budget</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
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
            <button type="submit" className="btn btn-primary w-100">Add Budget</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBudget;
