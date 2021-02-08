const express = require('express'); // import express
const router = express.Router(); // import router
const passport = require('passport'); // import passport
const userControllers = require('../controller/userControllers');
require('../middleware/auth'); // import passport auth strategy
// const auth = require('../middlewares/auth'); // import passport auth strategy
const UserController = require('../controller/userControllers'); // import userController
const userValidator = require('../middleware/validators'); // import userValidator


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get( "/", UserController.getAll);
router.post("/login", (req, res, next) => {
  userValidator.signin,
    passport.authenticate(
      "login",
      async function (err, user, info) {
        console.log("dataxxx")
        if (err) {
          return next(err);
        }
        if (!user) {
          res.status(401).json({
            status: "Error",
            message: info.message,
          });
          return;
        }

        UserController.login(user, req, res);
      }
    )(req, res, next);
  });

  router.post("/signup", UserController.signup);
// router.post(
//   "/signin",
//   [userValidator.login, auth.signin],
//   UserController.login
// );

module.exports = router;
