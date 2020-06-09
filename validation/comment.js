const validator = require('validator');
const isEmpty = require('is-empty');

/* -------------------------------------------------------------------------- */

const validateCommentInput = (data) => {
  const errors = {};
  const required = ['body'];

  required.forEach((val) => {
    data[val] = !isEmpty(data[val]) ? data[val] : '';
  });

  // Comment checks
  if (validator.isEmpty(data.body)) {
    errors.body = 'Comment must not be empty';
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

module.exports = validateCommentInput;
