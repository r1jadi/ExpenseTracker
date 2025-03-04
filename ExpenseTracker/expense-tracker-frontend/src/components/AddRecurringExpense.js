import React, { useState } from "react";
import axios from "axios";

const AddRecurringExpense = () => {
  const [formData, setFormData] = useState({
    userID: "",
    amount: "",
    interval: "",
    nextDueDate: "",
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
      await axios.post("https://localhost:7058/api/RecurringExpense", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Recurring expense added successfully!");
      setFormData({
        userID: "",
        amount: "",
        interval: "",
        nextDueDate: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding recurring expense:", error);
      setMessage("Failed to add recurring expense. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Recurring Expense</h2>
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
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <select
              name="interval"
              value={formData.interval}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Interval</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
          <div className="col-md-4">
            <input
              type="date"
              name="nextDueDate"
              value={formData.nextDueDate}
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
              Add Recurring Expense
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRecurringExpense;
