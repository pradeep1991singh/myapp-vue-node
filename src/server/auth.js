const bcrypt = require("bcryptjs");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const jwtSecret = require("./jwtConfig");
const queries = require("./db/queries/users");
const knex = require("./db/connection");

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  return knex("users")
    .where({ id })
    .first()
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    async (username, password, done) => {
      try {
        const user = await queries.getSingleUser(username);
        if (user != null) {
          console.log("username already taken");
          return done(null, false, { message: "username already taken" });
        } else {
          const user = await queries.addUser({ username, password });
          return done(null, user);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    async (username, password, done) => {
      try {
        const user = await queries.getSingleUser(username);
        console.log(user);
        if (user === null || !user.length) {
          return done(null, false, { message: "bad username" });
        } else {
          if (!comparePass(password, user[0].password)) {
            return done(null, false);
          } else {
            return done(null, user[0]);
          }
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: jwtSecret.secret,
};

passport.use(
  "jwt",
  new JWTstrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await queries.getSingleUser(jwt_payload.id);
      if (user) {
        console.log("user found in db in passport");
        // note the return removed with passport JWT - add this return for passport local
        done(null, user);
      } else {
        console.log("user not found in db");
        done(null, false);
      }
    } catch (err) {
      done(err);
    }
  })
);
