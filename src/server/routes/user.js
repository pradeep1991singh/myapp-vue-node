const Router = require("koa-router");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const queries = require("../db/queries/users");
const jwtSecret = require("../jwtConfig");
const helpers = require("./_helpers");

const router = new Router();

router.post("/register", async (ctx, next) => {
  await queries.addUser(ctx.request.body);
  return passport.authenticate("register", (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      ctx.body = {
        status: "success",
        // data: user,
      };
    } else {
      ctx.status = 400;
      ctx.body = { status: "error" };
    }
  })(ctx);
});

router.post("/login", async (ctx, next) => {
  return passport.authenticate("login", (err, user, info, status) => {
    if (err || !user) {
      const error = new Error("An error occurred.");
      return next(error);
    }
    if (user) {
      ctx.login(user);
      const token = jwt.sign({ id: user.username }, jwtSecret.secret);
      ctx.status = 200;
      ctx.body = {
        auth: true,
        token: token,
        message: "user found & logged in",
      };
    } else {
      ctx.status = 400;
      ctx.body = { status: "error" };
    }
  })(ctx);
});

router.get("/logout", async (ctx) => {
  if (helpers.ensureAuthenticated(ctx)) {
    ctx.logout();
    ctx.body = {
      status: "success",
    };
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
});

module.exports = router;
