import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
  
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
  
        const currentTime = Date.now() / 1000;
  
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("jwtToken");
          setIsLoggedIn(false);
          navigate("/login");
        } else {
          setIsLoggedIn(true);
  
          const role =
            decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          
          setUserRole(role?.toLowerCase()); 
          console.log("User Role:", role?.toLowerCase());
        }
      } catch (error) {
        localStorage.removeItem("jwtToken");
        setIsLoggedIn(false);
        navigate("/login");
      }
    }
  }, [navigate]);
  
  

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false); 
    navigate("/login");  
  };

  const myColor = "#48CFCB";

  return (
    <div>
      <section className="text-white text-center py-5" style={{backgroundColor: myColor}}>
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to Expense Tracker Dashboard</h1>
          <p className="lead mb-4">
            Track the system features with ease.
          </p>
          <div className="d-flex justify-content-center">
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
      {isLoggedIn && userRole === "admin" && (
        <h2 className="text-center mb-5">Manage Key Features</h2>
      )}
        <div className="row">
          {isLoggedIn && userRole === "admin" && (
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded" style={{backgroundColor: myColor}}>
              <div className="card-body">
                <h5 className="card-title">Track Expenses</h5>
                <p className="card-text">Effortlessly monitor system expenses</p>
                <Link to="/expenses" className="btn btn-secondary w-100" >
                  Explore
                </Link>
              </div>
            </div>
          </div>
          )}
          {isLoggedIn && userRole === "admin" && (
            <div className="col-md-4 mb-4">
              <div className="card shadow-lg border-0 h-100 rounded" style={{backgroundColor: myColor}}>
                <div className="card-body">
                  <h5 className="card-title">Manage Users</h5>
                  <p className="card-text">View and manage user details, roles, and permissions.</p>
                  <Link to="/users" className="btn btn-secondary w-100">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
        
      {isLoggedIn && userRole === "admin" && (
      <section className="container my-5">
        <h2 className="text-center mb-5">Manage Other Features</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded" style={{backgroundColor: myColor}}>
              <div className="card-body">
                <h5 className="card-title">Categories</h5>
                <p className="card-text">Manage expense categories</p>
                <Link to="/categories" className="btn btn-secondary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded" style={{backgroundColor: myColor}}>
              <div className="card-body">
                <h5 className="card-title">Recurring Expenses</h5>
                <p className="card-text">Easily manage system recurring monthly payments.</p>
                <Link to="/recurring-expenses" className="btn btn-secondary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded" style={{backgroundColor: myColor}}>
              <div className="card-body">
                <h5 className="card-title">Notifications</h5>
                <p className="card-text">Manage system notifications</p>
                <Link to="/notifications" className="btn btn-secondary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded" style={{backgroundColor: myColor}}>
              <div className="card-body">
                <h5 className="card-title">Subscriptions</h5>
                <p className="card-text">Manage system subscriptions</p>
                <Link to="/subscriptions" className="btn btn-secondary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded " style={{backgroundColor: myColor}}>
              <div className="card-body">
                <h5 className="card-title">Transactions</h5>
                <p className="card-text">View and track all system transaction history.</p>
                <Link to="/transactions" className="btn btn-secondary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded" style={{backgroundColor: myColor}}>
              <div className="card-body">
                <h5 className="card-title">Currency</h5>
                <p className="card-text">Manage and convert currencies for international expenses.</p>
                <Link to="/currency" className="btn btn-secondary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded" style={{backgroundColor: myColor}}>
              <div className="card-body">
                <h5 className="card-title">Income</h5>
                <p className="card-text">Track and manage system income sources effectively.</p>
                <Link to="/income" className="btn btn-secondary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded" style={{backgroundColor: myColor}}>
              <div className="card-body">
                <h5 className="card-title">Tags</h5>
                <p className="card-text">Organize expenses with tags for better categorization.</p>
                <Link to="/tags" className="btn btn-secondary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded" style={{backgroundColor: myColor}}>
              <div className="card-body">
                <h5 className="card-title">Payment Method</h5>
                <p className="card-text">Payment Method</p>
                <Link to="/paymentmethods" className="btn btn-secondary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded" style={{backgroundColor: myColor}}>
              <div className="card-body">
                <h5 className="card-title">Settings</h5>
                <p className="card-text">Settings</p>
                <Link to="/settings" className="btn btn-secondary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded" style={{backgroundColor: myColor}}>
              <div className="card-body">
                <h5 className="card-title">Goals</h5>
                <p className="card-text">Set and track system financial goals</p>
                <Link to="/goals" className="btn btn-secondary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded" style={{backgroundColor: myColor}}>
              <div className="card-body">
                <h5 className="card-title">Manage Budgets</h5>
                <p className="card-text">Manage customizable budgets and track system spending.</p>
                <Link to="/budgets" className="btn btn-secondary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}
    </div>
  );
};

export default AdminDashboard;