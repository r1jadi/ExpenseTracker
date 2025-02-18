import React, { useState, useEffect } from "react";
import axios from "axios";

const PlayerCRUD = () => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    birthYear: "",
    teamId: "",
  });

  const [editingPlayerId, setEditingPlayerId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get("https://localhost:7058/api/Player");
      const playersData = response.data?.$values || [];
      setPlayers(playersData);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

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
    if (!formData.name || !formData.number || !formData.birthYear || !formData.teamId) {
      alert("All fields are required.");
      return;
    }

    try {
      if (editingPlayerId) {
        await axios.put(`https://localhost:7058/api/Player/${editingPlayerId}`, formData);
        setMessage("Player updated successfully!");
      } else {
        await axios.post("https://localhost:7058/api/Player", formData);
        setMessage("Player added successfully!");
      }

      setFormData({ name: "", number: "", birthYear: "", teamId: "" });
      setEditingPlayerId(null);
      fetchPlayers();
    } catch (error) {
      console.error("Error saving player:", error);
      setMessage("Failed to save player.");
    }
  };

  const handleEdit = (player) => {
    setEditingPlayerId(player.playerId);
    setFormData({
      name: player.name,
      number: player.number,
      birthYear: player.birthYear,
      teamId: player.teamId,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7058/api/Player/${id}`);
      setMessage("Player deleted successfully!");
      fetchPlayers();
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Player Management</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Player Name" className="form-control" required />
          </div>
          <div className="col-md-2">
            <input type="text" name="number" value={formData.number} onChange={handleChange} placeholder="Number" className="form-control" required />
          </div>
          <div className="col-md-3">
            <input type="number" name="birthYear" value={formData.birthYear} onChange={handleChange} placeholder="Birth Year" className="form-control" required />
          </div>
          <div className="col-md-4">
            <select name="teamId" value={formData.teamId} onChange={handleChange} className="form-select" required>
              <option value="">Select Team</option>
              {teams.map((team) => (
                <option key={team.teamId} value={team.teamId}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">
              {editingPlayerId ? "Update Player" : "Add Player"}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Player ID</th>
            <th>Name</th>
            <th>Number</th>
            <th>Birth Year</th>
            <th>Team</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.length > 0 ? (
            players.map((player) => (
              <tr key={player.playerId}>
                <td>{player.playerId}</td>
                <td>{player.name}</td>
                <td>{player.number}</td>
                <td>{player.birthYear}</td>
                <td>{teams.find((team) => team.teamId === player.teamId)?.name || "Unknown"}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(player)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(player.playerId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No players found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerCRUD;
