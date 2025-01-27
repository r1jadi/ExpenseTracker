import React, { useState, useEffect } from "react";
import axios from "axios";

const BudgetCRUD = () => {
  const [budgets, setBudgets] = useState([]);
  const [formData, setFormData] = useState({
    budgetID: null,
    userID: "",
    categoryID: 0,
    limit: 0,
    period: "",
    startDate: "",
    endDate: "",
  });

  const [editingBudgetId, setEditingBudgetId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get("https://localhost:7058/api/Budget");
      const budgetData = response.data?.$values || [];
      setBudgets(budgetData);
    } catch (error) {
      console.error("Error fetching budgets:", error);
      setMessage("Failed to load budgets. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "limit" || name === "categoryID" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.limit || isNaN(formData.limit)) {
      alert("Limit must be a valid number.");
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      alert("Start date and end date are required.");
      return;
    }

    try {
      const dataToSubmit = { ...formData };

      if (editingBudgetId) {
        await axios.put(
          `https://localhost:7058/api/Budget/${editingBudgetId}`,
          dataToSubmit
        );
        setMessage("Budget updated successfully!");
      } else {
        await axios.post("https://localhost:7058/api/Budget", dataToSubmit);
        setMessage("Budget added successfully!");
      }

      setFormData({
        budgetID: null,
        userID: "",
        categoryID: 0,
        limit: 0,
        period: "",
        startDate: "",
        endDate: "",
      });
      setEditingBudgetId(null);
      fetchBudgets();
    } catch (error) {
      console.error("Error saving budget:", error);
      setMessage("Failed to save budget. Please try again.");
    }
  };

  const handleEdit = (budget) => {
    setEditingBudgetId(budget.budgetID);
    setFormData({
      ...budget,
      startDate: new Date(budget.startDate).toISOString().split("T")[0],
      endDate: new Date(budget.endDate).toISOString().split("T")[0],
    });
  };

  const handleDelete = async (id) => {
    setMessage("");

    try {
      await axios.delete(`https://localhost:7058/api/Budget/${id}`);
      setMessage("Budget deleted successfully!");
      fetchBudgets();
    } catch (error) {
      console.error("Error deleting budget:", error);
      setMessage("Failed to delete budget. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Budget Management</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-3">
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
              name="limit"
              value={formData.limit}
              onChange={handleChange}
              placeholder="Limit"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="period"
              value={formData.period}
              onChange={handleChange}
              placeholder="Period (e.g., Monthly)"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">
              {editingBudgetId ? "Update Budget" : "Add Budget"}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>BudgetID</th>
            <th>UserID</th>
            <th>CategoryID</th>
            <th>Limit</th>
            <th>Period</th>
            <th>StartDate</th>
            <th>EndDate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgets.length > 0 ? (
            budgets.map((budget) => (
              <tr key={budget.budgetID}>
                <td>{budget.budgetID}</td>
                <td>{budget.userID}</td>
                <td>{budget.categoryID}</td>
                <td>{budget.limit}</td>
                <td>{budget.period}</td>
                <td>{new Date(budget.startDate).toLocaleDateString()}</td>
                <td>{new Date(budget.endDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(budget)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(budget.budgetID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No budgets found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetCRUD;
