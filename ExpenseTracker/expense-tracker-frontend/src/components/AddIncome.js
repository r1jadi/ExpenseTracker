import React, { useState } from "react";
import axios from "axios";

const AddIncome = () => {
  const [formData, setFormData] = useState({
    userID: "",
    currencyID: "",
    amount: "",
    source: "",
    date: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value || "",
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
      await axios.post("https://localhost:7058/api/Income", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Income added successfully!");
      setFormData({
        userID: "",
        currencyID: "",
        amount: "",
        source: "",
        date: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding income:", error);
      setMessage("Failed to add income. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Income</h2>
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
              type="number"
              name="currencyID"
              value={formData.currencyID}
              onChange={handleChange}
              placeholder="Currency ID"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              placeholder="Source"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description (Optional)"
              className="form-control"
            />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Income
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddIncome;
