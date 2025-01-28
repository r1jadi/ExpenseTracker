import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
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
            <Link to="/login" className="btn btn-outline-light btn-lg">
              Login
            </Link>
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

      <section className="container my-5">
        <h2 className="text-center mb-5">Other Features</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Categories</h5>
                <p className="card-text">Manage expense categories to keep track of spending.</p>
                <Link to="/categories" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Recurring Expenses</h5>
                <p className="card-text">Easily manage your recurring monthly payments.</p>
                <Link to="/recurring-expenses" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Notifications</h5>
                <p className="card-text">Receive timely alerts for important financial events.</p>
                <Link to="/notifications" className="btn btn-primary w-100">
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
                <h5 className="card-title text-primary">Subscriptions</h5>
                <p className="card-text">Manage your subscriptions and avoid unexpected charges.</p>
                <Link to="/subscriptions" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Transactions</h5>
                <p className="card-text">View and track all your transaction history.</p>
                <Link to="/transactions" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Currency</h5>
                <p className="card-text">Manage and convert currencies for international expenses.</p>
                <Link to="/currency" className="btn btn-primary w-100">
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
                <h5 className="card-title text-primary">Income</h5>
                <p className="card-text">Track and manage your income sources effectively.</p>
                <Link to="/income" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Tags</h5>
                <p className="card-text">Organize expenses with tags for better categorization.</p>
                <Link to="/tags" className="btn btn-primary w-100">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 h-100 rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">Goals</h5>
                <p className="card-text">Set and track your financial goals to stay focused.</p>
                <Link to="/goals" className="btn btn-primary w-100">
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