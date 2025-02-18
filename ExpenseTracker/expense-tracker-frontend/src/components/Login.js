import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
        "https://localhost:7058/api/Auth/Login",
        {
          email: formData.email,  // Match the field names expected by API (email not Email)
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      // Store the JWT token in localStorage
      if (response.data?.jwtToken) {  // Ensure the correct token field name is used
        localStorage.setItem("jwtToken", response.data.jwtToken);  // Store the token in the correct key
      }

      setSuccessMessage("Login successful!");
      setErrorMessage("");
      console.log("Logged in:", response.data);
      
      // Redirect to the home or dashboard page after login
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.response?.data?.message || "Invalid email or password.");
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
          Login
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                required
              />
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
              Login
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

export default Login;
