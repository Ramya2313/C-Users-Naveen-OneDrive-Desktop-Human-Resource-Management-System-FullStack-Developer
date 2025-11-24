// backend/src/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/register - Handles Organisation creation and Admin User creation
router.post('/register', authController.register);

// POST /api/auth/login - Handles User login
router.post('/login', authController.login);

module.exports = router;