import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); 

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
        "https://localhost:7058/api/Auth/Register",
        {
          Name: formData.name,
          Email: formData.email,
          Password: formData.password,
          Roles: [formData.role],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccessMessage(response.data.message || "User registered successfully!");
      setErrorMessage("");
      
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage(error.response?.data?.error || "An error occurred. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          width: "400px",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <div
          className="card-header text-center"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Sign Up
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
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
              <label htmlFor="password" className="form-label">
                Password
              </label>
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
              <label className="form-label">Role</label>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="roleUser"
                  name="role"
                  value="User"
                  checked={formData.role === "User"}
                  onChange={handleChange}
                />
                <label htmlFor="roleUser" className="form-check-label">
                  User
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="roleAdmin"
                  name="role"
                  value="Admin"
                  checked={formData.role === "Admin"}
                  onChange={handleChange}
                />
                <label htmlFor="roleAdmin" className="form-check-label">
                  Admin
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{
                borderRadius: "10px",
                backgroundColor: "#007bff",
                border: "none",
                fontWeight: "bold",
                padding: "10px",
                fontSize: "16px",
              }}
            >
              Register
            </button>
          </form>
          {successMessage && (
            <div className="alert alert-success mt-3">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger mt-3">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
