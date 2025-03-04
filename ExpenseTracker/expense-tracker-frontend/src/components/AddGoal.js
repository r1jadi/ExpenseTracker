import React, { useState } from "react";
import axios from "axios";

const AddGoal = () => {
  const [formData, setFormData] = useState({
    userID: "",
    targetAmount: "",
    description: "",
    dueDate: "",
  });
  const [message, setMessage] = useState("");

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

      await axios.post("https://localhost:7058/api/Goal", dataToSubmit, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Goal added successfully!");
      setFormData({ userID: "", targetAmount: "", description: "", dueDate: "" });
    } catch (error) {
      console.error("Error adding goal:", error);
      setMessage("Failed to add goal. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Goal</h2>
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
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleChange}
              placeholder="Target Amount"
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
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Goal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddGoal;
