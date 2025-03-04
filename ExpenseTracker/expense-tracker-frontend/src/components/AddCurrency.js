import React, { useState } from "react";
import axios from "axios";

const AddCurrency = ({ onCurrencyAdded }) => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    symbol: "",
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
      await axios.post("https://localhost:7058/api/Currency", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Currency added successfully!");
      setFormData({ code: "", name: "", symbol: "" });
      if (onCurrencyAdded) onCurrencyAdded();
    } catch (error) {
      console.error("Error adding currency:", error);
      setMessage("Failed to add currency. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Currency</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input type="text" name="code" value={formData.code} onChange={handleChange} placeholder="Code" className="form-control" required />
          </div>
          <div className="col-md-4">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="form-control" required />
          </div>
          <div className="col-md-4">
            <input type="text" name="symbol" value={formData.symbol} onChange={handleChange} placeholder="Symbol" className="form-control" required />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">Add Currency</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCurrency;
