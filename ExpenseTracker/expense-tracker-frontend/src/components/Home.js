import React from "react";
import { Link } from "react-router-dom";

// You can replace the below constant with actual user data from localStorage or a similar method of storing the logged-in user
const user = JSON.parse(localStorage.getItem("user")); // Assuming user data is stored in localStorage
const isAdmin = user?.role === "Admin"; // Check if the user is an admin

const Home = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Welcome to Expense Tracker</h2>
      <div className="row">
        {/* Admin Dashboard Card - Shown only for admin users */}
        {isAdmin && (
          <div className="col-md-3 mb-4">
            <div className="card">
              <img src="/assets/admin-dashboard.jpg" alt="Admin Dashboard" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Admin Dashboard</h5>
                <p className="card-text">Manage all aspects of the application from here.</p>
                <Link to="/admin" className="btn btn-primary">Go to Dashboard</Link>
              </div>
            </div>
          </div>
        )}

        {/* Add Budget Card */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <img src="/assets/add-budget.jpg" alt="Add Budget" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Add Budget</h5>
              <p className="card-text">Create and manage your budgets easily.</p>
              <Link to="/addbudget" className="btn btn-primary">Create Budget</Link>
            </div>
          </div>
        </div>

        {/* Add Category Card */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <img src="/assets/add-category.jpg" alt="Add Category" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Add Category</h5>
              <p className="card-text">Organize your expenses into categories.</p>
              <Link to="/addcategory" className="btn btn-primary">Add Category</Link>
            </div>
          </div>
        </div>

        {/* Add Currency Card */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <img src="/assets/add-currency.jpg" alt="Add Currency" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Add Currency</h5>
              <p className="card-text">Add and manage your currencies for transactions.</p>
              <Link to="/addcurrency" className="btn btn-primary">Add Currency</Link>
            </div>
          </div>
        </div>

        {/* Add Expense Card */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <img src="/assets/add-expense.jpg" alt="Add Expense" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Add Expense</h5>
              <p className="card-text">Track your expenses and manage them efficiently.</p>
              <Link to="/addexpense" className="btn btn-primary">Add Expense</Link>
            </div>
          </div>
        </div>

        {/* Add Goal Card */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <img src="/assets/add-goal.jpg" alt="Add Goal" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Add Goal</h5>
              <p className="card-text">Set financial goals and track your progress.</p>
              <Link to="/addgoal" className="btn btn-primary">Add Goal</Link>
            </div>
          </div>
        </div>

        {/* Add Income Card */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <img src="/assets/add-income.jpg" alt="Add Income" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Add Income</h5>
              <p className="card-text">Record your income sources for better tracking.</p>
              <Link to="/addincome" className="btn btn-primary">Add Income</Link>
            </div>
          </div>
        </div>

        {/* Add Notification Card */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <img src="/assets/add-notification.jpg" alt="Add Notification" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Add Notification</h5>
              <p className="card-text">Set up reminders and alerts for your expenses.</p>
              <Link to="/addnotification" className="btn btn-primary">Add Notification</Link>
            </div>
          </div>
        </div>

        {/* Add Payment Card */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <img src="/assets/add-payment.jpg" alt="Add Payment" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Add Payment</h5>
              <p className="card-text">Record your payments for better management.</p>
              <Link to="/addpayment" className="btn btn-primary">Add Payment</Link>
            </div>
          </div>
        </div>

        {/* Add Recurring Expense Card */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <img src="/assets/add-recurring-expense.jpg" alt="Add Recurring Expense" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Add Recurring Expense</h5>
              <p className="card-text">Track recurring expenses with ease.</p>
              <Link to="/addrecurringexpense" className="btn btn-primary">Add Recurring Expense</Link>
            </div>
          </div>
        </div>

        {/* Add Settings Card */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <img src="/assets/add-settings.jpg" alt="Add Settings" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Add Settings</h5>
              <p className="card-text">Customize your application settings.</p>
              <Link to="/addsettings" className="btn btn-primary">Add Settings</Link>
            </div>
          </div>
        </div>

        {/* Add Subscription Card */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <img src="/assets/add-subscription.jpg" alt="Add Subscription" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Add Subscription</h5>
              <p className="card-text">Manage your subscriptions easily.</p>
              <Link to="/addsubscription" className="btn btn-primary">Add Subscription</Link>
            </div>
          </div>
        </div>

        {/* Add Tag Card */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <img src="/assets/add-tag.jpg" alt="Add Tag" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Add Tag</h5>
              <p className="card-text">Organize your expenses with tags.</p>
              <Link to="/addtag" className="btn btn-primary">Add Tag</Link>
            </div>
          </div>
        </div>

        {/* Add Transaction Card */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <img src="/assets/add-transaction.jpg" alt="Add Transaction" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Add Transaction</h5>
              <p className="card-text">Record and track your financial transactions.</p>
              <Link to="/addtransaction" className="btn btn-primary">Add Transaction</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
