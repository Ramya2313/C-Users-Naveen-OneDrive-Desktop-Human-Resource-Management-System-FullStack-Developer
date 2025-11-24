// frontend/src/pages/RegisterOrg.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const RegisterOrg = () => {
  const [formData, setFormData] = useState({
    orgName: '',
    adminName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST /api/auth/register
      const response = await api.post('/auth/register', formData);
      
      // Store token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Success: Redirect to Dashboard (or Employees page)
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please check your details.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register Your Organisation</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <input type="text" name="orgName" value={formData.orgName} onChange={handleChange} placeholder="Organisation Name" required />
        <input type="text" name="adminName" value={formData.adminName} onChange={handleChange} placeholder="Your Full Name (Admin)" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Admin Email" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit">Register & Sign In</button>
      </form>
      <p>Already have an account? <Link to="/login">Sign In</Link></p>
    </div>
  );
};

export default RegisterOrg;