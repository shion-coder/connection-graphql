const validator = require('validator');
const isEmpty = require('is-empty');

/* -------------------------------------------------------------------------- */

const validateLoginInput = (data) => {
  const errors = {};
  const required = ['username', 'password'];

  required.forEach((val) => {
    data[val] = !isEmpty(data[val]) ? data[val] : '';
  });

  // Email checks
  if (validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  }

  // Password checks
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

module.exports = validateLoginInput;
