import React, { useState, useEffect } from "react";
import axios from "axios";

const ExpenseCRUD = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    userID: "",
    categoryID: "",
    currencyID: "",
    recurringExpenseID: "",
    amount: "",
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
    try {
      const response = await axios.get("https://localhost:7058/api/Expense");
      console.log("API Response:", response.data);

      
      const expensesData = response.data?.$values || [];

      console.log("Formatted Data:", expensesData);

      const formattedData = expensesData.map((expense) => ({
        expenseID: expense.expenseID, 
        userID: expense.userID,
        categoryID: expense.categoryID,
        currencyID: expense.currencyID,
        recurringExpenseID: expense.recurringExpenseID,
        amount: expense.amount,
        date: expense.date,
        description: expense.description,
        isRecurring: expense.isRecurring,
      }));

      setExpenses(formattedData);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setMessage("Failed to load expenses. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.amount || isNaN(formData.amount)) {
      alert("Amount must be a valid number.");
      return;
    }
    if (!formData.date) {
      alert("Date is required.");
      return;
    }

    try {
      const dataToSubmit = {
        ...formData,
        recurringExpenseID: formData.recurringExpenseID || null,
      };

      if (editingExpenseId) {
        await axios.put(
          `https://localhost:7058/api/Expense/${editingExpenseId}`,
          dataToSubmit
        );
        setMessage("Expense updated successfully!");
      } else {
        await axios.post("https://localhost:7058/api/Expense", dataToSubmit);
        setMessage("Expense added successfully!");
      }

      setFormData({
        userID: "",
        categoryID: "",
        currencyID: "",
        recurringExpenseID: "",
        amount: "",
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

    try {
      await axios.delete(`https://localhost:7058/api/Expense/${id}`);
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
          <div className="col-md-3">
            <input
              type="number"
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
              name="categoryID"
              value={formData.categoryID}
              onChange={handleChange}
              placeholder="Category ID"
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
              type="number"
              name="recurringExpenseID"
              value={formData.recurringExpenseID || ""}
              onChange={handleChange}
              placeholder="Recurring Expense ID (Optional)"
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Description (Optional)"
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <div className="form-check">
              <input
                type="checkbox"
                name="isRecurring"
                checked={formData.isRecurring}
                onChange={handleChange}
                className="form-check-input"
                id="isRecurring"
              />
              <label htmlFor="isRecurring" className="form-check-label">
                Is Recurring
              </label>
            </div>
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">
              {editingExpenseId ? "Update Expense" : "Add Expense"}
            </button>
          </div>
        </div>
      </form>

      {/* Expenses table */}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Expense ID</th>
            <th>User ID</th>
            <th>Category ID</th>
            <th>Currency ID</th>
            <th>Recurring Expense ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th>Is Recurring</th>
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
                <td>{expense.currencyID}</td>
                <td>{expense.recurringExpenseID || "-"}</td>
                <td>{expense.amount}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.description || "-"}</td>
                <td>{expense.isRecurring ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(expense)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(expense.expenseID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">
                No expenses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseCRUD;
