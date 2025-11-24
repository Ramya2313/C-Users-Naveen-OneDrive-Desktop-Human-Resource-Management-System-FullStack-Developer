// backend/src/middlewares/errorHandler.js

/**
 * Global Error Handler Middleware.
 * This function must have four arguments (err, req, res, next) to be recognized
 * by Express as an error handler.
 */
module.exports.errorHandler = (err, req, res, next) => {
  // 1. Log the full error stack to the server console for debugging purposes
  console.error(err.stack); 

  // 2. Initialize default status code and message
  let statusCode = err.status || 500;
  let message = err.message || 'An unexpected server error occurred.';

  // 3. Handle specific Sequelize ORM errors for better client feedback
  
  // Validation Errors (e.g., failed `isEmail: true` check)
  if (err.name === 'SequelizeValidationError') {
    statusCode = 400; // Bad Request
    // Concatenate all validation error messages
    message = err.errors.map(e => e.message).join(', ');
  } 
  
  // Unique Constraint Violation (e.g., trying to register an email twice)
  else if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409; // Conflict
    // Customize message based on the field that failed (if available)
    const field = err.errors[0]?.path || 'record';
    message = `The ${field} you entered already exists.`;
  } 
  
  // Foreign Key Constraint Error
  else if (err.name === 'SequelizeForeignKeyConstraintError') {
    statusCode = 400; // Bad Request
    message = 'Data relationship error: Cannot complete action due to missing or related data.';
  }
  
  // 4. Send the standardized error response to the client
  res.status(statusCode).json({
    status: 'error',
    message: message,
    // Only send the stack trace in development mode for security
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};