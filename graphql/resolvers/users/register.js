const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');

const User = require('../../../models/User');

const validateRegisterInput = require('../../../validation/register');
const generateToken = require('../../../utils/genereate-token');

/* -------------------------------------------------------------------------- */

const register = async (input) => {
  // Validate user data
  const { errors, isValid } = validateRegisterInput(input);

  if (!isValid) {
    throw new UserInputError('Invalid input', { errors });
  }

  const { name, username, email, password } = input;

  // Make sure user doesn't already exist
  const existingUsername = await User.findOne({ username }).catch((err) => {
    throw new Error(err);
  });

  const existingEmail = await User.findOne({ email }).catch((err) => {
    throw new Error(err);
  });

  if (existingUsername && existingEmail) {
    errors.username = 'This username is already taken';
    errors.email = 'This username is already taken';

    throw new UserInputError('Username & email are already taken', { errors });
  } else if (existingUsername) {
    errors.username = 'This username is already taken';

    throw new UserInputError('Username is already taken', { errors });
  } else if (existingEmail) {
    errors.email = 'This username is already taken';

    throw new UserInputError('Email is already taken', { errors });
  }

  // Hash password and create an auth token
  const hashPassword = await bcrypt.hash(password, 10).catch((err) => {
    throw new Error(err);
  });

  const newUser = new User({
    name,
    username,
    email,
    password: hashPassword,
  });

  const res = await newUser.save().catch((err) => {
    throw new Error(err);
  });

  const token = generateToken(res);

  return {
    ...res._doc,
    id: res._id,
    token,
  };
};

module.exports = register;
