const bcrypt = require("bcryptjs");
const knex = require("../connection");

function getSingleUser(username) {
  return knex("users").select("*").where({ username });
}

function addUser(user) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(user.password, salt);
  return knex("users")
    .insert({
      username: user.username,
      password: hash,
    })
    .returning("*");
}

module.exports = {
  getSingleUser,
  addUser,
};
