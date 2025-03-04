import React, { useState } from "react";
import axios from "axios";

const AddExpense = ({ onExpenseAdded = () => {} }) => {
  const [formData, setFormData] = useState({
    userID: "",
    categoryID: 0,
    currencyID: 0,
    amount: 0,
    date: "",
    description: "",
    isRecurring: false,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox"
          ? checked
          : name === "amount" || name === "categoryID" || name === "currencyID"
          ? Number(value)
          : value,
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
      await axios.post("https://localhost:7058/api/Expense", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Expense added successfully!");
      setFormData({
        userID: "",
        categoryID: 0,
        currencyID: 0,
        amount: 0,
        date: "",
        description: "",
        isRecurring: false,
      });
      onExpenseAdded(); // Notify parent component
    } catch (error) {
      console.error("Error adding expense:", error);
      setMessage("Failed to add expense. Please try again.");
    }
  };

  return (
    <div className="container mt-3">
      <h4>Add Expense</h4>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="userID" value={formData.userID} onChange={handleChange} placeholder="User ID" className="form-control mb-2" required />
        <input type="number" name="categoryID" value={formData.categoryID} onChange={handleChange} placeholder="Category ID" className="form-control mb-2" required />
        <input type="number" name="currencyID" value={formData.currencyID} onChange={handleChange} placeholder="Currency ID" className="form-control mb-2" required />
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" className="form-control mb-2" required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-control mb-2" required />
        <button type="submit" className="btn btn-primary w-100">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
