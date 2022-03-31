exports.seed = (knex, Promise) => {
  return knex("transactions")
    .del()
    .then(() => {
      let txns = [];
      for (let index = 1; index < 20; index++) {
        let now = new Date();
        txns.push({ amount: index * 1000, created_at: now, updated_at: now });
      }
      return knex("transactions").insert(txns);
    });
};
