const Router = require("koa-router");
const queries = require("../db/queries/transactions");

const router = new Router();

router.get("/", async (ctx) => {
  try {
    const transactions = await queries.getAllTransactions();
    ctx.body = {
      status: "success",
      data: transactions,
    };
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
