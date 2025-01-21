import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ExpenseCRUD from "./components/ExpenseCRUD";
import BudgetCRUD from "./components/BudgetCRUD"; 

const App = () => {
  return (
    <Router>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <header className="bg-dark text-white py-3">
          <div className="container d-flex justify-content-between align-items-center">
            <h1 className="m-0">Expense Tracker</h1>
            <nav>
              <a href="/" className="text-white me-3 text-decoration-none">
                Home
              </a>
              <a href="/signup" className="text-white me-3 text-decoration-none">
                Sign Up
              </a>
              <a href="/login" className="text-white me-3 text-decoration-none">
                Login
              </a>
              <a href="/expenses" className="text-white me-3 text-decoration-none">
                Expenses
              </a>
              <a href="/budgets" className="text-white me-3 text-decoration-none">
                Budgets
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/expenses" element={<ExpenseCRUD />} />
            <Route path="/budgets" element={<BudgetCRUD />} /> {/* Add budgets route */}
          </Routes>
        </main>

        <footer className="bg-dark text-white text-center py-3">
          <div className="container">
            <p className="mb-0">&copy; 2025 Expense Tracker. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
