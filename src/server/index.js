const Koa = require("koa");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const koaValidator = require("koa-async-validator");
const session = require("koa-session");
const passport = require("koa-passport");
const router = require("./routes");
const store = require("./session");

require("./auth");

const app = new Koa();
// const PORT = process.env.PORT || 3001;
const PORT = 3001;

app.keys = ["super-secret-key"];

app
  .use(logger())
  .use(session({ store }, app))
  .use(bodyParser())
  .use(koaValidator())
  .use(passport.initialize())
  .use(passport.session())
  .use(router.routes())
  .use(router.allowedMethods());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
