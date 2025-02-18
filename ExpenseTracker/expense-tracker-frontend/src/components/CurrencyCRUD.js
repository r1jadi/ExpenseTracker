import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrencyCRUD = () => {
  const [currencies, setCurrencies] = useState([]);
  const [formData, setFormData] = useState({
    currencyID: null,
    code: "",
    name: "",
    symbol: ""
  });
  
  const [editingCurrencyId, setEditingCurrencyId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }
    try {
      const response = await axios.get("https://localhost:7058/api/Currency", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrencies(response.data?.$values || []);
    } catch (error) {
      console.error("Error fetching currencies:", error);
      setMessage("Failed to load currencies. Please try again.");
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
      if (editingCurrencyId) {
        await axios.put(`https://localhost:7058/api/Currency/${editingCurrencyId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Currency updated successfully!");
      } else {
        await axios.post("https://localhost:7058/api/Currency", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Currency added successfully!");
      }
      setFormData({ currencyID: null, code: "", name: "", symbol: "" });
      setEditingCurrencyId(null);
      fetchCurrencies();
    } catch (error) {
      console.error("Error saving currency:", error);
      setMessage("Failed to save currency. Please try again.");
    }
  };

  const handleEdit = (currency) => {
    setEditingCurrencyId(currency.currencyID);
    setFormData(currency);
  };

  const handleDelete = async (id) => {
    setMessage("");
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }

    try {
      await axios.delete(`https://localhost:7058/api/Currency/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Currency deleted successfully!");
      fetchCurrencies();
    } catch (error) {
      console.error("Error deleting currency:", error);
      setMessage("Failed to delete currency. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Currency Management</h2>
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
            <button type="submit" className="btn btn-primary w-100">{editingCurrencyId ? "Update Currency" : "Add Currency"}</button>
          </div>
        </div>
      </form>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>CurrencyID</th>
            <th>Code</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currencies.length > 0 ? currencies.map((currency) => (
            <tr key={currency.currencyID}>
              <td>{currency.currencyID}</td>
              <td>{currency.code}</td>
              <td>{currency.name}</td>
              <td>{currency.symbol}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(currency)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(currency.currencyID)}>Delete</button>
              </td>
            </tr>
          )) : <tr><td colSpan="5" className="text-center">No currencies found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyCRUD;
