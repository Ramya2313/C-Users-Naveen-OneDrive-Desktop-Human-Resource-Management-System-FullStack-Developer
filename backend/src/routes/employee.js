// backend/src/routes/employees.js

const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const employeeController = require('../controllers/employeeController');

// All routes in this file require authentication
router.use(authMiddleware);

// GET /api/employees - list all employees for the organization
router.get('/', employeeController.listEmployees);

// POST /api/employees - create a new employee
router.post('/', employeeController.createEmployee);

// GET /api/employees/:id - get employee details
router.get('/:id', employeeController.getEmployeeById);

// PUT /api/employees/:id - update an employee
router.put('/:id', employeeController.updateEmployee);

// DELETE /api/employees/:id - delete an employee
router.delete('/:id', employeeController.deleteEmployee);


module.exports = router;