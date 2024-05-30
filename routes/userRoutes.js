const express = require("express");
const router = express.Router();
const {
  signUpUser,
  signInUser,
  getUser,
} = require("../controller/userController");
const { verifyUser } = require("../middleware/middleware");

router.post("/signup", signUpUser);
router.post("/signin", signInUser);

router.route("/me").get([verifyUser], getUser);

module.exports = router;
