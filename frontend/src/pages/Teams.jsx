// frontend/src/pages/Teams.jsx

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TeamForm from '../components/TeamForm';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);

  const fetchTeams = async () => {
    try {
      // GET /api/teams
      const response = await api.get('/teams');
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleEdit = (team) => {
    setEditingTeam(team);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTeam(null);
    fetchTeams();
  };

  // ... Implement handleDelete similar to Employees.jsx

  return (
    <div className="page-container">
      <h2>Team Management</h2>
      <button onClick={() => setIsFormOpen(true)}>+ Create New Team</button>

      {isFormOpen && (
        <TeamForm 
          team={editingTeam}
          onClose={handleFormClose}
        />
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Description</th>
            <th>Employee Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => (
            <tr key={team.id}>
              <td>{team.name}</td>
              <td>{team.description}</td>
              <td>{team.employeeCount}</td>
              <td>
                <button onClick={() => handleEdit(team)}>Edit</button>
                {/* <button onClick={() => handleDelete(team.id)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teams;