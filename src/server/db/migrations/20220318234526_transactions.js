exports.up = (knex, Promise) => {
  return knex.schema.createTable("transactions", (table) => {
    table.increments();
    table.integer("amount").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("transactions");
};
