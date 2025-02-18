import React, { useState, useEffect } from "react";
import axios from "axios";

const ExpenseCRUD = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    expenseID: null,
    userID: "",
    categoryID: 0,
    currencyID: 0,
    recurringExpenseID: null,
    amount: 0,
    date: "",
    description: "",
    isRecurring: false,
  });

  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("No token found! User is not authenticated.");
      setMessage("Authentication required. Please log in.");
      return;
    }

    try {
      const response = await axios.get("https://localhost:7058/api/Expense", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data?.$values || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setMessage("Failed to load expenses. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox"
          ? checked
          : name === "amount" || name === "categoryID" || name === "currencyID"
          ? Number(value)
          : name === "recurringExpenseID"
          ? value ? Number(value) : null
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
      const dataToSubmit = { ...formData };
      if (editingExpenseId) {
        await axios.put(`https://localhost:7058/api/Expense/${editingExpenseId}`, dataToSubmit, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Expense updated successfully!");
      } else {
        await axios.post("https://localhost:7058/api/Expense", dataToSubmit, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Expense added successfully!");
      }

      setFormData({
        expenseID: null,
        userID: "",
        categoryID: 0,
        currencyID: 0,
        recurringExpenseID: null,
        amount: 0,
        date: "",
        description: "",
        isRecurring: false,
      });
      setEditingExpenseId(null);
      fetchExpenses();
    } catch (error) {
      console.error("Error saving expense:", error);
      setMessage("Failed to save expense. Please try again.");
    }
  };

  const handleEdit = (expense) => {
    setEditingExpenseId(expense.expenseID);
    setFormData({
      ...expense,
      date: new Date(expense.date).toISOString().split("T")[0],
    });
  };

  const handleDelete = async (id) => {
    setMessage("");

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }

    try {
      await axios.delete(`https://localhost:7058/api/Expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Expense deleted successfully!");
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
      setMessage("Failed to delete expense. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Expense Management</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <input type="text" name="userID" value={formData.userID} onChange={handleChange} placeholder="User ID" className="form-control" required />
          <input type="number" name="categoryID" value={formData.categoryID} onChange={handleChange} placeholder="Category ID" className="form-control" required />
          <input type="number" name="currencyID" value={formData.currencyID} onChange={handleChange} placeholder="Currency ID" className="form-control" required />
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" className="form-control" required />
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-control" required />
          <button type="submit" className="btn btn-primary w-100">{editingExpenseId ? "Update Expense" : "Add Expense"}</button>
        </div>
      </form>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Expense ID</th>
            <th>User ID</th>
            <th>Category ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <tr key={expense.expenseID}>
                <td>{expense.expenseID}</td>
                <td>{expense.userID}</td>
                <td>{expense.categoryID}</td>
                <td>{expense.amount}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(expense)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(expense.expenseID)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="6" className="text-center">No expenses found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseCRUD;
