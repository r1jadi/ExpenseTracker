import React, { useState, useEffect } from "react";
import axios from "axios";

const TeamCRUD = () => {
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
  });

  const [editingTeamId, setEditingTeamId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get("https://localhost:7058/api/Team");
      const teamsData = response.data?.$values || [];
      setTeams(teamsData);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert("Team name is required.");
      return;
    }

    try {
      if (editingTeamId) {
        await axios.put(`https://localhost:7058/api/Team/${editingTeamId}`, formData);
        setMessage("Team updated successfully!");
      } else {
        await axios.post("https://localhost:7058/api/Team", formData);
        setMessage("Team added successfully!");
      }

      setFormData({ name: "" });
      setEditingTeamId(null);
      fetchTeams();
    } catch (error) {
      console.error("Error saving team:", error);
      setMessage("Failed to save team.");
    }
  };

  const handleEdit = (team) => {
    setEditingTeamId(team.teamId);
    setFormData({
      name: team.name,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7058/api/Team/${id}`);
      setMessage("Team deleted successfully!");
      fetchTeams();
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Team Management</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-8">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Team Name" className="form-control" required />
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary w-100">
              {editingTeamId ? "Update Team" : "Add Team"}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Team ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.length > 0 ? (
            teams.map((team) => (
              <tr key={team.teamId}>
                <td>{team.teamId}</td>
                <td>{team.name}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(team)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(team.teamId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No teams found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeamCRUD;
