import React, { useState } from "react";
import axios from "axios";

const AddTag = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [message, setMessage] = useState("");

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
      await axios.post("https://localhost:7058/api/Tag", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Tag added successfully!");

      // Reset the form after successful submission
      setFormData({
        name: "",
        description: "",
      });
    } catch (error) {
      console.error("Error saving tag:", error);
      setMessage("Failed to add tag. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Tag</h2>
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
              placeholder="Description"
              className="form-control"
            />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Tag
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTag;
