import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking for the JWT token in localStorage
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true);  // User is logged in
    }
  }, []);

  const handleLogout = () => {
    // Remove JWT token from localStorage to log out the user
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);  // Update state to reflect logged out status
    navigate("/login");  // Redirect to login page
  };

  return (
    <div>
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to Expense Tracker</h1>
          <p className="lead mb-4">
            Track your expenses, manage budgets, and set financial goals with ease.
          </p>
          <div className="d-flex justify-content-center">
            <Link to="/signup" className="btn btn-light btn-lg me-3">
              Get Started
            </Link>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="btn btn-outline-light btn-lg">
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-outline-light btn-lg">
                Login
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="container my-5">
        <h2 className="text-center mb-5">Explore Our Key Features</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Track Expenses</h5>
                <p className="card-text">Effortlessly monitor your expenses and stay within your budget.</p>
                <Link to="/expenses" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Manage Budgets</h5>
                <p className="card-text">Create customizable budgets and track your spending.</p>
                <Link to="/budgets" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Manage Users</h5>
                <p className="card-text">View and manage user details, roles, and permissions.</p>
                <Link to="/users" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other sections... */}

    </div>
  );
};

export default Home;
