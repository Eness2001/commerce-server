const express = require("express");
const router = express.Router();
const { signInAdmin, signUpAdmin } = require("../controller/adminController");
const { verifyUser } = require("../middleware/middleware");

router.post("/signup", verifyUser, signUpAdmin);
router.post("/signin", verifyUser, signInAdmin);

module.exports = router;
