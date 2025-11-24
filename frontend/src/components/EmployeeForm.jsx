import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Assumes you have an Axios instance configured

// EmployeeForm accepts an optional 'employee' prop (for editing) and an 'onSuccess' callback
const EmployeeForm = ({ employee, onSuccess, onCancel }) => {
  const isEdit = !!employee; // Check if we are in edit mode

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    // Add other fields like phone, job_title here
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Load existing employee data if in edit mode
  useEffect(() => {
    if (isEdit) {
      setFormData({
        first_name: employee.first_name || '',
        last_name: employee.last_name || '',
        email: employee.email || '',
        // Set other fields here
      });
    }
  }, [isEdit, employee]);

  // 2. Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 3. Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let response;
      if (isEdit) {
        // PUT request for updating an existing employee
        response = await api.put(`/employees/${employee.id}`, formData);
        alert(`Employee ${formData.first_name} updated successfully!`);
      } else {
        // POST request for creating a new employee
        response = await api.post('/employees', formData);
        alert(`Employee ${formData.first_name} created successfully!`);
      }

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      console.error('Submission Error:', err);
      // Display a user-friendly error message from the backend
      setError(err.response?.data?.message || 'Failed to save employee data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employee-form-container">
      <h2>{isEdit ? 'Edit Employee' : 'Create New Employee'}</h2>
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Error and Button */}
        {error && <p className="error-message">{error}</p>}
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (isEdit ? 'Save Changes' : 'Create Employee')}
          </button>
          <button type="button" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        </div>
      </form>
      
      {/* Optional: Add a separate component here for Team Assignment */}
      {

      }
         employeeId={employee.id} currentTeams={employee.teams} /
     
    </div>
  );
};

export default EmployeeForm;