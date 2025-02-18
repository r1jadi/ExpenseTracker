import React, { useState, useEffect } from "react";
import axios from "axios";

const GoalsCRUD = () => {
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    userID: "",
    targetAmount: "",
    description: "",
    dueDate: "",
  });

  const [editingGoalId, setEditingGoalId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.error("No token found! User is not authenticated.");
      setMessage("Authentication required. Please log in.");
      return;
    }

    try {
      const response = await axios.get("https://localhost:7058/api/Goal", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const goalsData = response.data?.$values || [];
      setGoals(goalsData);
    } catch (error) {
      console.error("Error fetching goals:", error);
      setMessage("Failed to load goals. Please try again.");
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

    if (!formData.targetAmount || isNaN(formData.targetAmount)) {
      alert("Target Amount must be a valid number.");
      return;
    }
    if (!formData.dueDate) {
      alert("Due Date is required.");
      return;
    }

    try {
      const dataToSubmit = { ...formData };

      if (editingGoalId) {
        await axios.put(
          `https://localhost:7058/api/Goal/${editingGoalId}`,
          dataToSubmit,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Goal updated successfully!");
      } else {
        await axios.post("https://localhost:7058/api/Goal", dataToSubmit, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Goal added successfully!");
      }

      setFormData({ userID: "", targetAmount: "", description: "", dueDate: "" });
      setEditingGoalId(null);
      fetchGoals();
    } catch (error) {
      console.error("Error saving goal:", error);
      setMessage("Failed to save goal. Please try again.");
    }
  };

  const handleEdit = (goal) => {
    setEditingGoalId(goal.goalID);
    setFormData({ ...goal, dueDate: new Date(goal.dueDate).toISOString().split("T")[0] });
  };

  const handleDelete = async (id) => {
    setMessage("");
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }

    try {
      await axios.delete(`https://localhost:7058/api/Goal/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Goal deleted successfully!");
      fetchGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
      setMessage("Failed to delete goal. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Goal Management</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <input type="text" name="userID" value={formData.userID} onChange={handleChange} placeholder="User ID" className="form-control" required />
          </div>
          <div className="col-md-3">
            <input type="number" name="targetAmount" value={formData.targetAmount} onChange={handleChange} placeholder="Target Amount" className="form-control" required />
          </div>
          <div className="col-md-3">
            <input type="text" name="description" value={formData.description || ""} onChange={handleChange} placeholder="Description (Optional)" className="form-control" />
          </div>
          <div className="col-md-3">
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">
              {editingGoalId ? "Update Goal" : "Add Goal"}
            </button>
          </div>
        </div>
      </form>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Goal ID</th>
            <th>User ID</th>
            <th>Target Amount</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {goals.length > 0 ? (
            goals.map((goal) => (
              <tr key={goal.goalID}>
                <td>{goal.goalID}</td>
                <td>{goal.userID}</td>
                <td>{goal.targetAmount}</td>
                <td>{goal.description || "-"}</td>
                <td>{new Date(goal.dueDate).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(goal)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(goal.goalID)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No goals found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GoalsCRUD;
