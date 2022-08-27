const isEmpty = require("./isEmpty.util");

function checkPaylaod(payload) {
  return isEmpty(payload);
}

module.exports = checkPaylaod;
