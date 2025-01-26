import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoriesCRUD = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://localhost:7058/api/Category");
      const categoriesData = response.data?.$values || [];

      const formattedData = categoriesData.map((category) => ({
        categoryID: category.categoryID,
        name: category.name,
        description: category.description,
      }));

      setCategories(formattedData);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setMessage("Failed to load categories. Please try again.");
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

    if (!formData.name) {
      alert("Name is required.");
      return;
    }

    try {
      if (editingCategoryId) {
        await axios.put(
          `https://localhost:7058/api/Category/${editingCategoryId}`,
          formData
        );
        setMessage("Category updated successfully!");
      } else {
        await axios.post("https://localhost:7058/api/Category", formData);
        setMessage("Category added successfully!");
      }

      setFormData({
        name: "",
        description: "",
      });
      setEditingCategoryId(null);
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      setMessage("Failed to save category. Please try again.");
    }
  };

  const handleEdit = (category) => {
    setEditingCategoryId(category.categoryID);
    setFormData({
      name: category.name,
      description: category.description || "",
    });
  };

  const handleDelete = async (id) => {
    setMessage("");

    try {
      await axios.delete(`https://localhost:7058/api/Category/${id}`);
      setMessage("Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      setMessage("Failed to delete category. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Category Management</h2>
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
            <button type="submit" className="btn btn-primary w-100">
              {editingCategoryId ? "Update Category" : "Add Category"}
            </button>
          </div>
        </div>
      </form>

      {/* Categories table */}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Category ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category.categoryID}>
                <td>{category.categoryID}</td>
                <td>{category.name}</td>
                <td>{category.description || "-"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(category.categoryID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesCRUD;
