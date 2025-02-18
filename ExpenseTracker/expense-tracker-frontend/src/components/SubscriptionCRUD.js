import React, { useState, useEffect } from "react";
import axios from "axios";

const SubscriptionCRUD = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [formData, setFormData] = useState({
    subscriptionID: null,
    userID: "",
    currencyID: 0,
    serviceName: "",
    cost: 0.0,
    renewalDate: "",
    isActive: true,
  });
  
  const [editingSubscriptionId, setEditingSubscriptionId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }

    try {
      const response = await axios.get("https://localhost:7058/api/Subscription", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubscriptions(response.data?.$values || []);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      setMessage("Failed to load subscriptions. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }

    try {
      const dataToSubmit = { ...formData, cost: parseFloat(formData.cost) };
      
      if (editingSubscriptionId) {
        await axios.put(
          `https://localhost:7058/api/Subscription/${editingSubscriptionId}`,
          dataToSubmit,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Subscription updated successfully!");
      } else {
        await axios.post("https://localhost:7058/api/Subscription", dataToSubmit, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Subscription added successfully!");
      }
      
      setFormData({
        subscriptionID: null,
        userID: "",
        currencyID: 0,
        serviceName: "",
        cost: 0.0,
        renewalDate: "",
        isActive: true,
      });
      setEditingSubscriptionId(null);
      fetchSubscriptions();
    } catch (error) {
      console.error("Error saving subscription:", error);
      setMessage("Failed to save subscription. Please try again.");
    }
  };

  const handleEdit = (subscription) => {
    setEditingSubscriptionId(subscription.subscriptionID);
    setFormData({
      ...subscription,
      renewalDate: new Date(subscription.renewalDate).toISOString().split("T")[0],
    });
  };

  const handleDelete = async (id) => {
    setMessage("");
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }

    try {
      await axios.delete(`https://localhost:7058/api/Subscription/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Subscription deleted successfully!");
      fetchSubscriptions();
    } catch (error) {
      console.error("Error deleting subscription:", error);
      setMessage("Failed to delete subscription. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Subscription Management</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <input type="text" name="userID" value={formData.userID} onChange={handleChange} placeholder="User ID" className="form-control" required />
          </div>
          <div className="col-md-3">
            <input type="number" name="currencyID" value={formData.currencyID} onChange={handleChange} placeholder="Currency ID" className="form-control" required />
          </div>
          <div className="col-md-3">
            <input type="text" name="serviceName" value={formData.serviceName} onChange={handleChange} placeholder="Service Name" className="form-control" required />
          </div>
          <div className="col-md-3">
            <input type="number" step="0.01" name="cost" value={formData.cost} onChange={handleChange} placeholder="Cost" className="form-control" required />
          </div>
          <div className="col-md-3">
            <input type="date" name="renewalDate" value={formData.renewalDate} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3">
            <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} /> Active
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">{editingSubscriptionId ? "Update Subscription" : "Add Subscription"}</button>
          </div>
        </div>
      </form>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>SubscriptionID</th>
            <th>UserID</th>
            <th>CurrencyID</th>
            <th>ServiceName</th>
            <th>Cost</th>
            <th>RenewalDate</th>
            <th>IsActive</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.length > 0 ? subscriptions.map((sub) => (
            <tr key={sub.subscriptionID}>
              <td>{sub.subscriptionID}</td>
              <td>{sub.userID}</td>
              <td>{sub.currencyID}</td>
              <td>{sub.serviceName}</td>
              <td>{sub.cost}</td>
              <td>{new Date(sub.renewalDate).toLocaleDateString()}</td>
              <td>{sub.isActive ? "Yes" : "No"}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(sub)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(sub.subscriptionID)}>Delete</button>
              </td>
            </tr>
          )) : <tr><td colSpan="8" className="text-center">No subscriptions found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionCRUD;
