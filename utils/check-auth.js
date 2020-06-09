const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const { secretOrKey } = require('../config/keys');

/* -------------------------------------------------------------------------- */

const checkAuth = (context) => {
  const authHeader = context.req.headers.authorization;

  if (!authHeader) {
    throw new Error('Authorization header must be provided');
  }

  const token = authHeader.split('Bearer ')[1];

  if (!token) {
    throw new Error('Authentication token must be "Bearer [token]"');
  }

  try {
    const user = jwt.verify(token, secretOrKey);

    return user;
  } catch {
    throw new AuthenticationError('Invalid/Expired token');
  }
};

module.exports = checkAuth;
