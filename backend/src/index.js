// backend/src/index.js

const express = require('express');
const dotenv = require('dotenv');
const db = require('./db');
const cors = require('cors'); // Required for frontend communication
const { errorHandler } = require('./middlewares/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const teamRoutes = require('./routes/teams');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow frontend to talk to backend
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Basic Health Check Route
app.get('/', (req, res) => {
  res.send('HRMS Backend API is running!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/teams', teamRoutes);

// Global Error Handler (must be the last middleware)
app.use(errorHandler);

// Database Sync and Server Start
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
    
    // NOTE: In a professional project, use `npx sequelize-cli db:migrate`
    // If you are only testing, you can uncomment db.sequelize.sync()
    // db.sequelize.sync({ alter: true }); 
    
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database. Check DB_ credentials in .env', err);
  });