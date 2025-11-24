// frontend/src/services/api.js

import axios from 'axios';

// Get the backend API base URL from the environment variables
// Ensure you have REACT_APP_API_BASE=http://localhost:5000 in your frontend/.env file
const API_BASE_URL = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically attach the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Response Interceptor for handling global 401/403 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      // Token is expired or invalid. Clear storage and redirect to login.
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // window.location.href = '/login'; // Use history.push/navigate if inside a component
      console.error('Session expired. Redirecting to login.');
    }
    return Promise.reject(error);
  }
);

export default api;