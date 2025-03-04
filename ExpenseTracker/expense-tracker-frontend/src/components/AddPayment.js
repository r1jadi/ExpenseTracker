import React, { useState } from "react";
import axios from "axios";

const AddPayment = () => {
  const [formData, setFormData] = useState({
    userID: "",
    name: "",
    details: "",
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
      await axios.post("https://localhost:7058/api/PaymentMethod", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Payment method added successfully!");
      setFormData({
        userID: "",
        name: "",
        details: "",
      });
    } catch (error) {
      console.error("Error adding payment method:", error);
      setMessage("Failed to add payment method. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Payment Method</h2>
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Payment Method Name"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Details (Optional)"
              className="form-control"
            />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Payment Method
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPayment;
