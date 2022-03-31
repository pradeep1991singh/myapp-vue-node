const knex = require("../connection");

function getAllTransactions() {
  return knex("transactions").select("*");
}

module.exports = {
  getAllTransactions,
};
