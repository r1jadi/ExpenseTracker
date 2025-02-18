import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentMethodCRUD = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [formData, setFormData] = useState({
    paymentMethodID: null,
    userID: "",
    name: "",
    details: ""
  });

  const [editingPaymentMethodId, setEditingPaymentMethodId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }
    try {
      const response = await axios.get("https://localhost:7058/api/PaymentMethod", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPaymentMethods(response.data?.$values || []);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      setMessage("Failed to load payment methods. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
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
      if (editingPaymentMethodId) {
        await axios.put(`https://localhost:7058/api/PaymentMethod/${editingPaymentMethodId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Payment method updated successfully!");
      } else {
        await axios.post("https://localhost:7058/api/PaymentMethod", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Payment method added successfully!");
      }
      setFormData({ paymentMethodID: null, userID: "", name: "", details: "" });
      setEditingPaymentMethodId(null);
      fetchPaymentMethods();
    } catch (error) {
      console.error("Error saving payment method:", error);
      setMessage("Failed to save payment method. Please try again.");
    }
  };

  const handleEdit = (paymentMethod) => {
    setEditingPaymentMethodId(paymentMethod.paymentMethodID);
    setFormData(paymentMethod);
  };

  const handleDelete = async (id) => {
    setMessage("");
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }
    try {
      await axios.delete(`https://localhost:7058/api/PaymentMethod/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Payment method deleted successfully!");
      fetchPaymentMethods();
    } catch (error) {
      console.error("Error deleting payment method:", error);
      setMessage("Failed to delete payment method. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Payment Method Management</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input type="text" name="userID" value={formData.userID} onChange={handleChange} placeholder="User ID" className="form-control" required />
          </div>
          <div className="col-md-4">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Payment Method Name" className="form-control" required />
          </div>
          <div className="col-md-4">
            <input type="text" name="details" value={formData.details} onChange={handleChange} placeholder="Details (Optional)" className="form-control" />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">{editingPaymentMethodId ? "Update Payment Method" : "Add Payment Method"}</button>
          </div>
        </div>
      </form>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>PaymentMethodID</th>
            <th>UserID</th>
            <th>Name</th>
            <th>Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods.length > 0 ? paymentMethods.map((method) => (
            <tr key={method.paymentMethodID}>
              <td>{method.paymentMethodID}</td>
              <td>{method.userID}</td>
              <td>{method.name}</td>
              <td>{method.details}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(method)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(method.paymentMethodID)}>Delete</button>
              </td>
            </tr>
          )) : <tr><td colSpan="5" className="text-center">No payment methods found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentMethodCRUD;
