const express = require("express"); // import express
const router = express.Router(); // import router
const passport = require("passport"); // import passport
require("../middleware/auth"); // import passport auth strategy
// const auth = require('../middlewares/auth'); // import passport auth strategy
const NewsController = require("../controller/newsControllers"); // import userController
const userValidator = require("../middleware/validators"); // import userValidator
const multer = require("multer");
const upload = multer();
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get("/", NewsController.getAllNews);
router.get("/getOne/:id", NewsController.getOneNews);
router.post("/", upload.any(), NewsController.postNews);
router.put("/:id", upload.any(), NewsController.updateNews);
router.delete("/:id", NewsController.deleteNews);


// router.post(
//   "/signin",
//   [userValidator.login, auth.signin],
//   UserController.login
// );

module.exports = router;
