// frontend/src/pages/Employees.jsx

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import EmployeeForm from '../components/EmployeeForm'; // Import the form component

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null); // Employee object for editing

  const fetchEmployees = async () => {
    try {
      // GET /api/employees
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      // Handle error display
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      // DELETE /api/employees/:id
      await api.delete(`/employees/${id}`);
      // Refresh the list after successful deletion
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingEmployee(null);
    fetchEmployees(); // Refresh list after create/update
  };

  if (isLoading) return <div>Loading Employees...</div>;

  return (
    <div className="page-container">
      <h2>Employee Management</h2>
      <button onClick={() => setIsFormOpen(true)}>+ Add New Employee</button>
      
      {/* Employee Form Modal/Sidebar */}
      {isFormOpen && (
        <EmployeeForm 
          employee={editingEmployee} // Pass null for creation, object for editing
          onClose={handleFormClose}
        />
      )}

      {/* Employees List */}
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Teams</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.first_name} {emp.last_name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.Teams.map(t => t.name).join(', ')}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Edit</button>
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;