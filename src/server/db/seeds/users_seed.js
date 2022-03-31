const bcrypt = require("bcryptjs");

exports.seed = (knex, Promise) => {
  return knex("users")
    .del()
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync("john_doe", salt);
      return knex("users").insert({
        username: "john",
        password: hash,
      });
    });
};
