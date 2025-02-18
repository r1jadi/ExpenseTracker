import React, { useState, useEffect } from "react";
import axios from "axios";

const RecurringExpenseCRUD = () => {
  const [recurringExpenses, setRecurringExpenses] = useState([]);
  const [formData, setFormData] = useState({
    userID: "",
    amount: "",
    interval: "",
    nextDueDate: "",
    description: "",
  });
  const [editingRecurringExpenseId, setEditingRecurringExpenseId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchRecurringExpenses();
  }, []);

  const fetchRecurringExpenses = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("No token found! User is not authenticated.");
      setMessage("Authentication required. Please log in.");
      return;
    }

    try {
      const response = await axios.get("https://localhost:7058/api/RecurringExpense", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecurringExpenses(response.data?.$values || []);
    } catch (error) {
      console.error("Error fetching recurring expenses:", error);
      setMessage("Failed to load recurring expenses. Please try again.");
    }
  };

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
      if (editingRecurringExpenseId) {
        await axios.put(
          `https://localhost:7058/api/RecurringExpense/${editingRecurringExpenseId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Recurring expense updated successfully!");
      } else {
        await axios.post("https://localhost:7058/api/RecurringExpense", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Recurring expense added successfully!");
      }

      setFormData({
        userID: "",
        amount: "",
        interval: "",
        nextDueDate: "",
        description: "",
      });
      setEditingRecurringExpenseId(null);
      fetchRecurringExpenses();
    } catch (error) {
      console.error("Error saving recurring expense:", error);
      setMessage("Failed to save recurring expense. Please try again.");
    }
  };

  const handleEdit = (expense) => {
    setEditingRecurringExpenseId(expense.recurringExpenseID);
    setFormData({
      userID: expense.userID,
      amount: expense.amount,
      interval: expense.interval,
      nextDueDate: new Date(expense.nextDueDate).toISOString().split("T")[0],
      description: expense.description,
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
      await axios.delete(`https://localhost:7058/api/RecurringExpense/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Recurring expense deleted successfully!");
      fetchRecurringExpenses();
    } catch (error) {
      console.error("Error deleting recurring expense:", error);
      setMessage("Failed to delete recurring expense. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Recurring Expense Management</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <input type="text" name="userID" value={formData.userID} onChange={handleChange} placeholder="User ID" className="form-control" required />
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" className="form-control" required />
          <select name="interval" value={formData.interval} onChange={handleChange} className="form-control" required>
            <option value="">Select Interval</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
          <input type="date" name="nextDueDate" value={formData.nextDueDate} onChange={handleChange} className="form-control" required />
          <input type="text" name="description" value={formData.description || ""} onChange={handleChange} placeholder="Description (Optional)" className="form-control" />
          <button type="submit" className="btn btn-primary w-100">{editingRecurringExpenseId ? "Update Recurring Expense" : "Add Recurring Expense"}</button>
        </div>
      </form>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Amount</th>
            <th>Interval</th>
            <th>Next Due Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recurringExpenses.length > 0 ? (
            recurringExpenses.map((expense) => (
              <tr key={expense.recurringExpenseID}>
                <td>{expense.recurringExpenseID}</td>
                <td>{expense.userID}</td>
                <td>{expense.amount}</td>
                <td>{expense.interval}</td>
                <td>{new Date(expense.nextDueDate).toLocaleDateString()}</td>
                <td>{expense.description || "-"}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(expense)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(expense.recurringExpenseID)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="7" className="text-center">No recurring expenses found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecurringExpenseCRUD;
