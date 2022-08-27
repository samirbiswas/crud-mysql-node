const validator = require('validator').default;
const { isEmpty } = require('../../utils');

module.exports = function validateSignup(data) {
  const errors = {};

  data.username = !isEmpty(data.username) ? validator.escape(data.username) : '';
  data.password = !isEmpty(data.password) ? validator.escape(data.password) : '';

  // username validation
  if (!validator.isLength(data.username, { min: 3, max: 30 })) {
    errors.username = 'Username must be between 3 and 30 characters';
  }  else if (validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  }

  // password validation
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  } else if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
    data,
  };
};