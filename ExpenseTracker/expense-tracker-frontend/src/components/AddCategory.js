import React, { useState } from "react";
import axios from "axios";

const AddCategory = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value || "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }

    if (!formData.name) {
      alert("Name is required.");
      return;
    }

    try {
      await axios.post("https://localhost:7058/api/Category", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Category added successfully!");
      setFormData({ name: "", description: "" });
    } catch (error) {
      console.error("Error saving category:", error.response?.data || error.message);
      setMessage("Failed to save category. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Category</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description (Optional)"
              className="form-control"
            />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">Add Category</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
