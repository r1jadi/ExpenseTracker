import React, { useState, useEffect } from "react";
import axios from "axios";

const TagCRUD = () => {
  const [tags, setTags] = useState([]);
  const [formData, setFormData] = useState({
    tagID: null,
    name: "",
    description: ""
  });

  const [editingTagId, setEditingTagId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }
    try {
      const response = await axios.get("https://localhost:7058/api/Tag", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTags(response.data?.$values || []);
    } catch (error) {
      console.error("Error fetching tags:", error);
      setMessage("Failed to load tags. Please try again.");
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
      if (editingTagId) {
        await axios.put(`https://localhost:7058/api/Tag/${editingTagId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Tag updated successfully!");
      } else {
        await axios.post("https://localhost:7058/api/Tag", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Tag added successfully!");
      }
      setFormData({ tagID: null, name: "", description: "" });
      setEditingTagId(null);
      fetchTags();
    } catch (error) {
      console.error("Error saving tag:", error);
      setMessage("Failed to save tag. Please try again.");
    }
  };

  const handleEdit = (tag) => {
    setEditingTagId(tag.tagID);
    setFormData(tag);
  };

  const handleDelete = async (id) => {
    setMessage("");
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }

    try {
      await axios.delete(`https://localhost:7058/api/Tag/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Tag deleted successfully!");
      fetchTags();
    } catch (error) {
      console.error("Error deleting tag:", error);
      setMessage("Failed to delete tag. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Tag Management</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="form-control" required />
          </div>
          <div className="col-md-6">
            <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="form-control" />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">{editingTagId ? "Update Tag" : "Add Tag"}</button>
          </div>
        </div>
      </form>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>TagID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tags.length > 0 ? tags.map((tag) => (
            <tr key={tag.tagID}>
              <td>{tag.tagID}</td>
              <td>{tag.name}</td>
              <td>{tag.description}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(tag)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(tag.tagID)}>Delete</button>
              </td>
            </tr>
          )) : <tr><td colSpan="4" className="text-center">No tags found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default TagCRUD;
