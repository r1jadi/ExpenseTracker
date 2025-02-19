import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ExpenseCRUD from "./components/ExpenseCRUD";
import BudgetCRUD from "./components/BudgetCRUD";
import GoalsCRUD from "./components/GoalsCRUD";
import CategoriesCRUD from "./components/CategoriesCRUD"; 
import RecurringExpenseCRUD from "./components/RecurringExpenseCRUD"; 
import NotificationsCRUD from "./components/NotificationsCRUD"; 
import Users from "./components/Users";
import TeamCRUD from "./components/TeamCRUD";
import PlayerCRUD from "./components/PlayerCRUD";
import SubscriptionCRUD from "./components/SubscriptionCRUD";
import TransactionCRUD from "./components/TransactionCRUD";
import CurrencyCRUD from "./components/CurrencyCRUD";
import IncomeCRUD from "./components/IncomeCRUD";
import TagCRUD from "./components/TagCRUD";
import SettingsCRUD from "./components/SettingsCRUD";
import PaymentMethodCRUD from "./components/PaymentMethodCRUD";
// import AdminDashboard from "./components/AdminDashboard";
import logo from "./assets/expense.png";

const App = () => {
  return (
    <Router>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <header className="bg-dark text-white py-3">
          <div className="container d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Link to="/" className="d-flex align-items-center text-decoration-none">
                <img
                  src={logo}
                  alt="Expense Tracker Logo"
                  style={{ height: "50px", marginRight: "10px" }}
                />
                <h1 className="m-0 text-white">Expense Tracker</h1>
              </Link>
            </div>
            <nav>
              <a href="/signup" className="text-white me-3 text-decoration-none">
                Sign Up
              </a>
              <a href="/login" className="text-white me-3 text-decoration-none">
                Login
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
            <Route path="/budgets" element={<BudgetCRUD />} />
            <Route path="/goals" element={<GoalsCRUD />} />
            <Route path="/categories" element={<CategoriesCRUD />} />
            <Route path="/recurring-expenses" element={<RecurringExpenseCRUD />} />
            <Route path="/notifications" element={<NotificationsCRUD />} /> 
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<TeamCRUD />} />
            <Route path="/players" element={<PlayerCRUD />} />
            <Route path="/subscriptions" element={<SubscriptionCRUD />} />
            <Route path="/transactions" element={<TransactionCRUD />} />
            <Route path="/currency" element={<CurrencyCRUD />} />
            <Route path="/income" element={<IncomeCRUD />} />
            <Route path="/tags" element={<TagCRUD />} />
            <Route path="/settings" element={<SettingsCRUD />} />
            <Route path="/paymentmethods" element={<PaymentMethodCRUD />} />
            {/* <Route path="/admin" element={<AdminDashboard />} /> */}
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
