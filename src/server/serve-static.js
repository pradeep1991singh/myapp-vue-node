const compose = require("koa-compose");
const { resolve } = require("path");
const serveStatic = require("koa-static");

const staticPath = resolve(__dirname, "..", "..", "dist");

module.exports = () => {
  if (process.env.NODE_ENV === "development") {
    return compose([serveStatic(staticPath), indexFallbackMiddleware()]);
  } else {
    return compose([serveStatic(staticPath), indexFallbackMiddleware()]);
  }
};

function indexFallbackMiddleware() {
  return async (ctx, next) => {
    if (/^\/api/.test(ctx.path) || ctx.path === "/") {
      await ctx.render("dist/index.html");
    }
    await next();
  };
}
