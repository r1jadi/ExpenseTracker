import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import etImage1 from "../assets/etimage1.png";
import etImage2 from "../assets/etimage2.png";

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
      <section className="bg-info text-white text-center py-5">
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
        <img src={etImage1} alt="Expense Tracker Overview" className="img-fluid mt-4 rounded shadow" style={{ maxWidth: "600px" }} />
      </section>
      
      

      <section className="container my-5">
        <h2 className="text-center mb-5">Key Features</h2>
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
          <div className="col-md-4 mb-4 text">
            <div className="card shadow-lg border-0 h-100 rounded bg-dark text-white">
              <div className="card-body">
                <h5 className="card-title">Add Expenses</h5>
                <p className="card-text">Effortlessly add your expenses and stay within your budget.</p>
                <Link to="/addexpense" className="btn btn-light w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          {isLoggedIn && userRole === "admin" && (
            <div className="col-md-4 mb-4">
              <div className="card shadow-lg border-0 h-100 rounded bg-dark text-white">
                <div className="card-body">
                  <h5 className="card-title">Manage Users</h5>
                  <p className="card-text">View and manage user details, roles, and permissions.</p>
                  <Link to="/users" className="btn btn-light w-100">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          )}

          {(!isLoggedIn || userRole !== "admin") && (
            <div className="col-md-4 mb-4">
              <div className="card shadow-lg border-0 h-100 rounded bg-dark text-white">
                <div className="card-body">
                  <h5 className="card-title">Add Goals</h5>
                  <p className="card-text">Add your financial goals</p>
                  <Link to="/addgoal" className="btn btn-light w-100">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          )}

          {(!isLoggedIn || userRole !== "admin") && (
            <div className="col-md-4 mb-4">
              <div className="card shadow-lg border-0 h-100 rounded bg-dark text-white">
                <div className="card-body">
                  <h5 className="card-title">Add Income</h5>
                  <p className="card-text">Add your incomes</p>
                  <Link to="/addincome" className="btn btn-light w-100">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      <section className="container my-5 text-center">
      <img src={etImage2} alt="Expense Analysis" className="img-fluid rounded shadow mt-3" style={{ maxWidth: "60%" }} />
      </section>
        
      <section className="container my-5">
        <h2 className="text-center mb-5">See Other Features</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded bg-dark text-white">
              <div className="card-body">
                <h5 className="card-title">Add Categories</h5>
                <p className="card-text">Add expense categories to keep track of spending.</p>
                <Link to="/addcategory" className="btn btn-light w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded bg-dark text-white">
              <div className="card-body">
                <h5 className="card-title">Add Recurring Expenses</h5>
                <p className="card-text">Easily add your recurring monthly payments.</p>
                <Link to="/addrecurringexpense" className="btn btn-light w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded bg-dark text-white">
              <div className="card-body">
                <h5 className="card-title">Add Notifications</h5>
                <p className="card-text">Add timely alerts for important financial events.</p>
                <Link to="/addnotification" className="btn btn-light w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded bg-dark text-white">
              <div className="card-body">
                <h5 className="card-title">Add Subscriptions</h5>
                <p className="card-text">Add your subscriptions and avoid unexpected charges.</p>
                <Link to="/addsubscription" className="btn btn-light w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded bg-dark text-white">
              <div className="card-body">
                <h5 className="card-title">Add Transactions</h5>
                <p className="card-text">Add your transaction history.</p>
                <Link to="/addtransaction" className="btn btn-light w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded bg-dark text-white">
              <div className="card-body">
                <h5 className="card-title">Add Currency</h5>
                <p className="card-text">Add currencies for international expenses.</p>
                <Link to="/addcurrency" className="btn btn-light w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded bg-dark text-white">
              <div className="card-body">
                <h5 className="card-title">Add Income</h5>
                <p className="card-text">Add your income sources effectively.</p>
                <Link to="/addincome" className="btn btn-light w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded bg-dark text-white">
              <div className="card-body">
                <h5 className="card-title">Add Tags</h5>
                <p className="card-text">Organize expenses with tags for better categorization.</p>
                <Link to="/addtag" className="btn btn-light w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded bg-dark text-white">
              <div className="card-body">
                <h5 className="card-title">Add Payment Method</h5>
                <p className="card-text">Payment Method</p>
                <Link to="/addpayment" className="btn btn-light w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded bg-dark text-white">
              <div className="card-body">
                <h5 className="card-title">Add Settings</h5>
                <p className="card-text">Settings</p>
                <Link to="/addsettings" className="btn btn-light w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded bg-dark text-white">
              <div className="card-body">
                <h5 className="card-title">Add Goals</h5>
                <p className="card-text">Set your financial goals to stay focused.</p>
                <Link to="/addgoal" className="btn btn-light w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded bg-dark text-white">
              <div className="card-body">
                <h5 className="card-title">Add Budgets</h5>
                <p className="card-text">Create customizable budgets and track your spending.</p>
                <Link to="/addbudget" className="btn btn-light w-100">
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