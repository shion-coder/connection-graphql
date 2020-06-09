const jwt = require('jsonwebtoken');

const { secretOrKey } = require('../config/keys');

/* -------------------------------------------------------------------------- */

const generateToken = (user) =>
  jwt.sign({ id: user.id, name: user.name, username: user.username, email: user.email }, secretOrKey, {
    expiresIn: '1h',
  });

module.exports = generateToken;
