// backend/src/db.js

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false, // Set to console.log to see SQL queries
    define: {
      underscored: true, // Use snake_case for column names (e.g., created_at)
    },
  }
);

// We assume Sequelize CLI has generated model files in /models
// This object will hold all our models
const db = {};

// Optional: Automatically load models if you're not using sequelize-cli init structure
// If you use `sequelize-cli init`, this is usually handled in `models/index.js`

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;