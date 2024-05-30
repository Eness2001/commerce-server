const express = require("express");
const router = express.Router();
const { verifyUser } = require("../middleware/middleware");
const {
  addAddress,
  getAddress,
  deleteAddress,
} = require("../controller/addressController");

router.post("/addAddress", verifyUser, addAddress);
router.get("/getaddress", verifyUser, getAddress);
router.delete("/deleteAddress/:id", verifyUser, deleteAddress);
module.exports = router;
