const passport = require("passport"); // Import passport
const localStrategy = require("passport-local").Strategy; // Import Strategy

const { users } = require("../../models"); // Import user model
const bcrypt = require("bcrypt"); // Import bcrypt
const JWTstrategy = require("passport-jwt").Strategy; // Import JWT Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt; // Import ExtractJWT


passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email", // username from req.body.email
      passwordField: "password", // password from req.body.password
    },
    async (email, password, done) => {
      // find user depends on email
      const userLogin = await users.findOne({
        where: {
          email: email
        },
      });

      // if user not found
      if (!userLogin) {
        return done(null, false, {
          message: "User is not found!",
        });
      }
      console.log(password, userLogin.password);
      const validate = await bcrypt.compare(password, userLogin.password);

      // if user found and validate the password of user
      // const validate = await bcrypt.compare(password, userLogin.password);
      // const validate = password === userLogin.password

      // if wrong password
      if (!validate) {
        return done(null, false, {
          message: "Wrong password!",
        });
      }

      // login success
      return done(null, userLogin, {
        message: "Login success!",
      });
    }
  )
);


// USER AUTH
passport.use(
  "user",
  new JWTstrategy(
    {
      secretOrKey: "secret_password", // key for jwt
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // extract token from authorization
    },
    async (token, done) => {
      // find user depend on token.user.email
      const userLogin = await users.findOne({
        email: token.user.email,
      });
      // console.log(token.user.email);
      // if user.role includes user it will next
      if (userLogin) {
        return done(null, token.user);
      }

      // if user.role not includes user it will not authorization
      return done(null, false);
    }
  )
);

// ADMIN AUTH
passport.use(
  "user",
  new JWTstrategy(
    {
      secretOrKey: "secret_password", // key for jwt
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // extract token from authorization
    },
    async (token, done) => {
      // find user depend on token.user.email
      const userLogin = await users.findOne({
        email: token.user.email,
      });
      // console.log(token.user.email);
      // if user.role includes user it will next
      if (userLogin) {
        return done(null, token.user);
      }

      // if user.role not includes user it will not authorization
      return done(null, false);
    }
  )
);

module.exports = passport
