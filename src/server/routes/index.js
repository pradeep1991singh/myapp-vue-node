const Router = require("koa-router");
const user = require("./user");
const transactions = require("./transactions");

const router = new Router({ prefix: "/api" });

router.use("/user", user.routes());
router.use("/transactions", transactions.routes());

module.exports = router;
