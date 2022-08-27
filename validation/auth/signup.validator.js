const validator = require("validator").default;

const { isEmpty } = require("../../utils");

module.exports = function validateSignup(data) {
  const errors = {};

  data.username = !isEmpty(data.username)
    ? validator.escape(data.username)
    : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password)
    ? validator.escape(data.password)
    : "";
  data.user_type = !isEmpty(data.user_type)
    ? validator.escape(data.user_type)
    : "";

  // username validation
  if (validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  } else if (!validator.isLength(data.username, { min: 3, max: 30 })) {
    errors.username = "Username must be min 3 and max 30 characters";
  } 

  // Email Validation
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }
  // Password validation
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (!validator.isLength(data.password, { min: 6 })) {
    errors.password = "Pasword must be min 6 charcters";
  }
  // user type validation
  if (validator.isEmpty(data.user_type)) {
    errors.user_type = "User type is required";
  } else if (!(data.user_type === "admin") && !(data.user_type === "employee")) {
    errors.user_type = "User type must be 'admin' or 'employee'";
  }

  return {
    errors,
    isValid: isEmpty(errors),
    data,
  };
};
