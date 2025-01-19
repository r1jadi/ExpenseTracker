import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1>Welcome to Expense Tracker</h1>
          <p className="lead">
            A smarter way to track expenses, manage budgets, and achieve your financial goals.
          </p>
          <Link to="/signup" className="btn btn-light btn-lg mt-3">
            Get Started
          </Link>
        </div>
      </section>

      <section className="container my-5">
        <h2 className="text-center mb-4">Features</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Track Expenses</h5>
                <p className="card-text">Stay on top of your spending with ease.</p>
                <Link to="/expenses" className="btn btn-primary">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Manage Budgets</h5>
                <p className="card-text">Plan your finances with customizable budgets.</p>
                <Link to="/budgets" className="btn btn-primary">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Set Goals</h5>
                <p className="card-text">Achieve your financial dreams with clear targets.</p>
                <Link to="/goals" className="btn btn-primary">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Why Choose Us?</h2>
          <div className="row text-center">
            <div className="col-md-6">
              <div className="card border-0">
                <div className="card-body">
                  <h5 className="card-title">Notifications</h5>
                  <p>Get timely updates on your financial activities.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-0">
                <div className="card-body">
                  <h5 className="card-title">Transaction Insights</h5>
                  <p>Analyze your spending patterns with detailed reports.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
