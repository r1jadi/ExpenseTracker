import React, { useState, useEffect } from "react";
import axios from "axios";

const SettingsCRUD = () => {
  const [settings, setSettings] = useState([]);
  const [formData, setFormData] = useState({
    settingsID: null,
    userID: "",
    preferenceName: "",
    value: ""
  });
  
  const [editingSettingsId, setEditingSettingsId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }
    try {
      const response = await axios.get("https://localhost:7058/api/Settings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSettings(response.data?.$values || []);
    } catch (error) {
      console.error("Error fetching settings:", error);
      setMessage("Failed to load settings. Please try again.");
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
      if (editingSettingsId) {
        await axios.put(`https://localhost:7058/api/Settings/${editingSettingsId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Settings updated successfully!");
      } else {
        await axios.post("https://localhost:7058/api/Settings", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Settings added successfully!");
      }
      setFormData({ settingsID: null, userID: "", preferenceName: "", value: "" });
      setEditingSettingsId(null);
      fetchSettings();
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage("Failed to save settings. Please try again.");
    }
  };

  const handleEdit = (setting) => {
    setEditingSettingsId(setting.settingsID);
    setFormData(setting);
  };

  const handleDelete = async (id) => {
    setMessage("");
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }
    try {
      await axios.delete(`https://localhost:7058/api/Settings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Settings deleted successfully!");
      fetchSettings();
    } catch (error) {
      console.error("Error deleting settings:", error);
      setMessage("Failed to delete settings. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Settings Management</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input type="text" name="userID" value={formData.userID} onChange={handleChange} placeholder="User ID" className="form-control" required />
          </div>
          <div className="col-md-4">
            <input type="text" name="preferenceName" value={formData.preferenceName} onChange={handleChange} placeholder="Preference Name" className="form-control" required />
          </div>
          <div className="col-md-4">
            <input type="text" name="value" value={formData.value} onChange={handleChange} placeholder="Value" className="form-control" required />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">{editingSettingsId ? "Update Settings" : "Add Settings"}</button>
          </div>
        </div>
      </form>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>SettingsID</th>
            <th>UserID</th>
            <th>Preference Name</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {settings.length > 0 ? settings.map((setting) => (
            <tr key={setting.settingsID}>
              <td>{setting.settingsID}</td>
              <td>{setting.userID}</td>
              <td>{setting.preferenceName}</td>
              <td>{setting.value}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(setting)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(setting.settingsID)}>Delete</button>
              </td>
            </tr>
          )) : <tr><td colSpan="5" className="text-center">No settings found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default SettingsCRUD;
