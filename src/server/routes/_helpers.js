const queries = require("../db/queries/users");

function ensureAuthenticated(context) {
  return context.isAuthenticated();
}

module.exports = {
  ensureAuthenticated,
};
