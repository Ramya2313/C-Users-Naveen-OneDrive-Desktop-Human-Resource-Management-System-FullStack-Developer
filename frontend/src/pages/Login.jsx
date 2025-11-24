// frontend/src/pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST /api/auth/login
      const response = await api.post('/auth/login', formData);
      
      // Store token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Success: Redirect to Dashboard
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check email and password.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
      <p>Don't have an organisation account? <Link to="/register">Register Organization</Link></p>
    </div>
  );
};

export default Login;