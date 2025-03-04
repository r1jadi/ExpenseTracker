import React, { useState } from "react";
import axios from "axios";

const AddSubscription = () => {
  const [formData, setFormData] = useState({
    userID: "",
    currencyID: 0,
    serviceName: "",
    cost: 0.0,
    renewalDate: "",
    isActive: true,
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

    const dataToSubmit = { ...formData, cost: parseFloat(formData.cost) };

    try {
      await axios.post("https://localhost:7058/api/Subscription", dataToSubmit, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Subscription added successfully!");

      // Reset the form after successful submission
      setFormData({
        userID: "",
        currencyID: 0,
        serviceName: "",
        cost: 0.0,
        renewalDate: "",
        isActive: true,
      });
    } catch (error) {
      console.error("Error saving subscription:", error);
      setMessage("Failed to add subscription. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Subscription</h2>
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
              name="currencyID"
              value={formData.currencyID}
              onChange={handleChange}
              placeholder="Currency ID"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              placeholder="Service Name"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              step="0.01"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              placeholder="Cost"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              name="renewalDate"
              value={formData.renewalDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />{" "}
            Active
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Subscription
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSubscription;
