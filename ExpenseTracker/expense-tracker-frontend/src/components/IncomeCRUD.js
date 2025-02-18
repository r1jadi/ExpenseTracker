import React, { useState, useEffect } from "react";
import axios from "axios";

const IncomeCRUD = () => {
  const [incomes, setIncomes] = useState([]);
  const [formData, setFormData] = useState({
    incomeID: null,
    userID: "",
    currencyID: "",
    amount: "",
    source: "",
    date: "",
    description: ""
  });

  const [editingIncomeId, setEditingIncomeId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }
    try {
      const response = await axios.get("https://localhost:7058/api/Income", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncomes(response.data?.$values || []);
    } catch (error) {
      console.error("Error fetching incomes:", error);
      setMessage("Failed to load incomes. Please try again.");
    }
  };

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
      if (editingIncomeId) {
        await axios.put(`https://localhost:7058/api/Income/${editingIncomeId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Income updated successfully!");
      } else {
        await axios.post("https://localhost:7058/api/Income", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Income added successfully!");
      }
      setFormData({ incomeID: null, userID: "", currencyID: "", amount: "", source: "", date: "", description: "" });
      setEditingIncomeId(null);
      fetchIncomes();
    } catch (error) {
      console.error("Error saving income:", error);
      setMessage("Failed to save income. Please try again.");
    }
  };

  const handleEdit = (income) => {
    setEditingIncomeId(income.incomeID);
    setFormData(income);
  };

  const handleDelete = async (id) => {
    setMessage("");
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }

    try {
      await axios.delete(`https://localhost:7058/api/Income/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Income deleted successfully!");
      fetchIncomes();
    } catch (error) {
      console.error("Error deleting income:", error);
      setMessage("Failed to delete income. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Income Management</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input type="text" name="userID" value={formData.userID} onChange={handleChange} placeholder="User ID" className="form-control" required />
          </div>
          <div className="col-md-4">
            <input type="number" name="currencyID" value={formData.currencyID} onChange={handleChange} placeholder="Currency ID" className="form-control" required />
          </div>
          <div className="col-md-4">
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" className="form-control" required />
          </div>
          <div className="col-md-4">
            <input type="text" name="source" value={formData.source} onChange={handleChange} placeholder="Source" className="form-control" required />
          </div>
          <div className="col-md-4">
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-4">
            <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="form-control" />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">{editingIncomeId ? "Update Income" : "Add Income"}</button>
          </div>
        </div>
      </form>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>IncomeID</th>
            <th>UserID</th>
            <th>CurrencyID</th>
            <th>Amount</th>
            <th>Source</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {incomes.length > 0 ? incomes.map((income) => (
            <tr key={income.incomeID}>
              <td>{income.incomeID}</td>
              <td>{income.userID}</td>
              <td>{income.currencyID}</td>
              <td>{income.amount}</td>
              <td>{income.source}</td>
              <td>{income.date}</td>
              <td>{income.description}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(income)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(income.incomeID)}>Delete</button>
              </td>
            </tr>
          )) : <tr><td colSpan="8" className="text-center">No incomes found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeCRUD;
