import React, { useState } from "react";
import axios from "axios";

const AddTransaction = ({ onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    userID: "",
    paymentMethodID: null,
    type: "",
    amount: 0.0,
    date: "",
    description: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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
      const dataToSubmit = { ...formData, amount: parseFloat(formData.amount) };
      await axios.post("https://localhost:7058/api/Transaction", dataToSubmit, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Transaction added successfully!");
      setFormData({ userID: "", paymentMethodID: null, type: "", amount: 0.0, date: "", description: "" });
      if (onTransactionAdded) onTransactionAdded();
    } catch (error) {
      console.error("Error saving transaction:", error);
      setMessage("Failed to save transaction. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Transaction</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <input type="text" name="userID" value={formData.userID} onChange={handleChange} placeholder="User ID" className="form-control" required />
          </div>
          <div className="col-md-3">
            <input type="number" name="paymentMethodID" value={formData.paymentMethodID} onChange={handleChange} placeholder="Payment Method ID" className="form-control" />
          </div>
          <div className="col-md-3">
            <input type="text" name="type" value={formData.type} onChange={handleChange} placeholder="Type" className="form-control" required />
          </div>
          <div className="col-md-3">
            <input type="number" step="0.01" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" className="form-control" required />
          </div>
          <div className="col-md-3">
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3">
            <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="form-control" />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">Add Transaction</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
