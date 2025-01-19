import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
        "https://localhost:7058/api/Auth/Login", 
        {
          Email: formData.email,  // Backend expects Email
          Password: formData.password,  // Backend expects Password
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccessMessage("Login successful!");
      setErrorMessage("");
      console.log("Logged in:", response.data);
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.response?.data?.message || "Invalid email or password.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg" style={{ width: "400px", borderRadius: "15px", border: "none" }}>
        <div className="card-body">
          <h2 className="text-center mb-4" style={{ color: "#007bff", fontWeight: "bold" }}>Login</h2>
          <form onSubmit={handleSubmit}>
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
                style={{ borderRadius: "10px" }}
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
                placeholder="Enter your password"
                required
                style={{ borderRadius: "10px" }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ borderRadius: "10px", padding: "12px", fontWeight: "bold" }}
            >
              Login
            </button>
          </form>
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
