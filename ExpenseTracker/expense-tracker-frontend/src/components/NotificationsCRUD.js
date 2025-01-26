import React, { useState, useEffect } from "react";
import axios from "axios";

const NotificationsCRUD = () => {
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    userID: "",
    message: "",
    date: "",
    isRead: false,
    type: "",
  });

  const [editingNotificationId, setEditingNotificationId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("https://localhost:7058/api/Notification");
      const notificationsData = response.data?.$values || [];
      const formattedData = notificationsData.map((notification) => ({
        notificationID: notification.notificationID,
        userID: notification.userID,
        message: notification.message,
        date: notification.date,
        isRead: notification.isRead,
        type: notification.type,
      }));

      setNotifications(formattedData);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setMessage("Failed to load notifications. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.userID || !formData.message || !formData.date || !formData.type) {
      alert("All fields except IsRead are required.");
      return;
    }

    try {
      const dataToSubmit = {
        ...formData,
        isRead: formData.isRead || false,
      };

      if (editingNotificationId) {
        await axios.put(
          `https://localhost:7058/api/Notification/${editingNotificationId}`,
          dataToSubmit
        );
        setMessage("Notification updated successfully!");
      } else {
        await axios.post("https://localhost:7058/api/Notification", dataToSubmit);
        setMessage("Notification added successfully!");
      }

      setFormData({
        userID: "",
        message: "",
        date: "",
        isRead: false,
        type: "",
      });
      setEditingNotificationId(null);
      fetchNotifications();
    } catch (error) {
      console.error("Error saving notification:", error);
      setMessage("Failed to save notification. Please try again.");
    }
  };

  const handleEdit = (notification) => {
    setEditingNotificationId(notification.notificationID);
    setFormData({
      ...notification,
      date: new Date(notification.date).toISOString().split("T")[0],
    });
  };

  const handleDelete = async (id) => {
    setMessage("");

    try {
      await axios.delete(`https://localhost:7058/api/Notification/${id}`);
      setMessage("Notification deleted successfully!");
      fetchNotifications();
    } catch (error) {
      console.error("Error deleting notification:", error);
      setMessage("Failed to delete notification. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Notification Management</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="number"
              name="userID"
              value={formData.userID}
              onChange={handleChange}
              placeholder="User ID"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Type"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <div className="form-check">
              <input
                type="checkbox"
                name="isRead"
                checked={formData.isRead}
                onChange={handleChange}
                className="form-check-input"
                id="isRead"
              />
              <label htmlFor="isRead" className="form-check-label">
                Is Read
              </label>
            </div>
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">
              {editingNotificationId ? "Update Notification" : "Add Notification"}
            </button>
          </div>
        </div>
      </form>

      {/* Notifications table */}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Notification ID</th>
            <th>User ID</th>
            <th>Message</th>
            <th>Date</th>
            <th>Is Read</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <tr key={notification.notificationID}>
                <td>{notification.notificationID}</td>
                <td>{notification.userID}</td>
                <td>{notification.message}</td>
                <td>{new Date(notification.date).toLocaleDateString()}</td>
                <td>{notification.isRead ? "Yes" : "No"}</td>
                <td>{notification.type}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(notification)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(notification.notificationID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No notifications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationsCRUD;
