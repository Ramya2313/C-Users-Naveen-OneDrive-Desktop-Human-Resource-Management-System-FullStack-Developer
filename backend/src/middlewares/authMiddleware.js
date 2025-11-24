// backend/src/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Assuming User model is available

module.exports.authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or invalid.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user/org data to the request object for use in controllers
    req.user = { 
      userId: payload.userId, 
      orgId: payload.orgId 
    };

    // Optional: Fetch full user object from DB if needed (less common for every request)
    // const user = await User.findByPk(payload.userId);
    // if (!user) return res.status(401).json({ message: 'User not found.' });

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired.' });
    }
    return res.status(403).json({ message: 'Invalid token.' });
  }
};