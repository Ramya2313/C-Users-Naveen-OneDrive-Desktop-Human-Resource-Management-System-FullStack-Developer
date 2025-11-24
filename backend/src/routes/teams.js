// backend/src/routes/teams.js

const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const teamController = require('../controllers/teamController');

// Apply authentication middleware to all team routes
router.use(authMiddleware);

// CRUD operations for Teams
router.get('/', teamController.listTeams);
router.post('/', teamController.createTeam);
// router.put('/:id', teamController.updateTeam); // Implement in teamController
// router.delete('/:id', teamController.deleteTeam); // Implement in teamController

// Team Assignment operations
router.post('/:teamId/assign', teamController.assignEmployeesToTeam);
router.delete('/:teamId/unassign', teamController.unassignEmployeeFromTeam);

module.exports = router;