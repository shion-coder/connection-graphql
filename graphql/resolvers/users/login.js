const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');

const User = require('../../../models/User');

const validateLoginInput = require('../../../validation/login');
const generateToken = require('../../../utils/genereate-token');

/* -------------------------------------------------------------------------- */

const login = async (username, password) => {
  const { errors, isValid } = validateLoginInput({ username, password });

  if (!isValid) {
    throw new UserInputError('Errors', { errors });
  }

  const user = await User.findOne({ username }).catch((err) => {
    throw new Error(err);
  });

  if (!user) {
    errors.general = 'User not found';

    throw new UserInputError('Wrong credentials', { errors });
  }

  const isMatch = await bcrypt.compare(password, user.password).catch((err) => {
    throw new Error(err);
  });

  if (!isMatch) {
    errors.general = 'Password incorrect';

    throw new UserInputError('Wrong credentials', { errors });
  }

  const token = generateToken(user);

  return {
    ...user._doc,
    id: user._id,
    token,
  };
};

module.exports = login;
