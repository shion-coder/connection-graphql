const validator = require('validator');
const isEmpty = require('is-empty');

/* -------------------------------------------------------------------------- */

const validatePostInput = (data) => {
  const errors = {};
  const required = ['body'];

  required.forEach((val) => {
    data[val] = !isEmpty(data[val]) ? data[val] : '';
  });

  // Post checks
  if (validator.isEmpty(data.body)) {
    errors.body = 'Post must not be empty';
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

module.exports = validatePostInput;
