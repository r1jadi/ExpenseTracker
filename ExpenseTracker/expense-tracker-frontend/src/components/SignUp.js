import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7058/api/Users",
        {
          Name: formData.name,
          Email: formData.email,
          Password: formData.password,
          Role: formData.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccessMessage(response.data.message || "User registered successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage(error.response?.data?.error || "An error occurred. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg" style={{ width: "400px", borderRadius: "15px" }}>
        <div className="card-body">
          <h2 className="text-center mb-4" style={{ color: "#007bff" }}>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <select
                className="form-control"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ borderRadius: "10px" }}
            >
              Register
            </button>
          </form>
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
