const express = require("express");
const router = express.Router();
const { verifyUser } = require("../middleware/middleware");
const {
  addProductInCart,
  getCart,
  deleteCart,
  updateProductCount,
  deleteProductInCart,
} = require("../controller/cartController");

router.post("/addProductInCart/:id", verifyUser, addProductInCart);
router.get("/getCart", verifyUser, getCart);
router.delete("/deleteCart/:id", verifyUser, deleteCart);
router.delete("/deleteProductInCart/:id", verifyUser, deleteProductInCart);
router.put("/updateProductCount/:id", verifyUser, updateProductCount);
module.exports = router;
