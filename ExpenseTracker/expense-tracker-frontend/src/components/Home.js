import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Home = () => {
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
          
          setUserRole(role?.toLowerCase()); // Store as lowercase
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

  return (
    <div>
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to Expense Tracker</h1>
          <p className="lead mb-4">
            Add your expenses, manage budgets, and set financial goals with ease.
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
      {isLoggedIn && userRole === "admin" && (
        <h2 className="text-center mb-5">Key Features</h2>
      )}
        <div className="row">
          {isLoggedIn && userRole === "admin" && (
            <div className="col-md-4 mb-4">
              <div className="card shadow-lg border-0 h-100 rounded bg-dark text-white">
                <div className="card-body">
                  <h5 className="card-title">Admin Dashboard</h5>
                  <p className="card-text">Manage users, roles, and app settings.</p>
                  <Link to="/admin" className="btn btn-light w-100">Go to Dashboard</Link>
                </div>
              </div>
            </div>
          )}
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Add Expenses</h5>
                <p className="card-text">Effortlessly add your expenses and stay within your budget.</p>
                <Link to="/addexpense" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          {isLoggedIn && userRole === "admin" && (
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
          )}
        </div>
      </section>
        
      <section className="container my-5">
        <h2 className="text-center mb-5">See Other Features</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Add Categories</h5>
                <p className="card-text">Add expense categories to keep track of spending.</p>
                <Link to="/addcategory" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Add Recurring Expenses</h5>
                <p className="card-text">Easily add your recurring monthly payments.</p>
                <Link to="/addrecurringexpense" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Add Notifications</h5>
                <p className="card-text">Add timely alerts for important financial events.</p>
                <Link to="/addnotification" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Add Subscriptions</h5>
                <p className="card-text">Add your subscriptions and avoid unexpected charges.</p>
                <Link to="/addsubscription" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Add Transactions</h5>
                <p className="card-text">Add your transaction history.</p>
                <Link to="/addtransaction" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Add Currency</h5>
                <p className="card-text">Add currencies for international expenses.</p>
                <Link to="/addcurrency" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Add Income</h5>
                <p className="card-text">Add your income sources effectively.</p>
                <Link to="/addincome" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Add Tags</h5>
                <p className="card-text">Organize expenses with tags for better categorization.</p>
                <Link to="/addtag" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Add Payment Method</h5>
                <p className="card-text">Payment Method</p>
                <Link to="/addpayment" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Add Settings</h5>
                <p className="card-text">Settings</p>
                <Link to="/addsettings" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Add Goals</h5>
                <p className="card-text">Set your financial goals to stay focused.</p>
                <Link to="/addgoal" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Add Budgets</h5>
                <p className="card-text">Create customizable budgets and track your spending.</p>
                <Link to="/addbudget" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;