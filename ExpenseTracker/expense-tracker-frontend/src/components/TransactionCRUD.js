import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionCRUD = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    transactionID: null,
    userID: "",
    paymentMethodID: null,
    type: "",
    amount: 0.0,
    date: "",
    description: ""
  });
  
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }

    try {
      const response = await axios.get("https://localhost:7058/api/Transaction", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(response.data?.$values || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setMessage("Failed to load transactions. Please try again.");
    }
  };

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
      
      if (editingTransactionId) {
        await axios.put(
          `https://localhost:7058/api/Transaction/${editingTransactionId}`,
          dataToSubmit,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Transaction updated successfully!");
      } else {
        await axios.post("https://localhost:7058/api/Transaction", dataToSubmit, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Transaction added successfully!");
      }
      
      setFormData({
        transactionID: null,
        userID: "",
        paymentMethodID: null,
        type: "",
        amount: 0.0,
        date: "",
        description: ""
      });
      setEditingTransactionId(null);
      fetchTransactions();
    } catch (error) {
      console.error("Error saving transaction:", error);
      setMessage("Failed to save transaction. Please try again.");
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransactionId(transaction.transactionID);
    setFormData(transaction);
  };

  const handleDelete = async (id) => {
    setMessage("");
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }

    try {
      await axios.delete(`https://localhost:7058/api/Transaction/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Transaction deleted successfully!");
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      setMessage("Failed to delete transaction. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Transaction Management</h2>
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
            <button type="submit" className="btn btn-primary w-100">{editingTransactionId ? "Update Transaction" : "Add Transaction"}</button>
          </div>
        </div>
      </form>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>TransactionID</th>
            <th>UserID</th>
            <th>PaymentMethodID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? transactions.map((txn) => (
            <tr key={txn.transactionID}>
              <td>{txn.transactionID}</td>
              <td>{txn.userID}</td>
              <td>{txn.paymentMethodID}</td>
              <td>{txn.type}</td>
              <td>{txn.amount}</td>
              <td>{new Date(txn.date).toLocaleDateString()}</td>
              <td>{txn.description}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(txn)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(txn.transactionID)}>Delete</button>
              </td>
            </tr>
          )) : <tr><td colSpan="8" className="text-center">No transactions found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionCRUD;