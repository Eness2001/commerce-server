const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductByProductId,
} = require("../controller/productController");
const { verifyUser } = require("../middleware/middleware");

//ROUTER
router.post("/addproduct", verifyUser, addProduct);
router.get("/getproducts", getProducts);
router.get("/getproduct/:id", verifyUser, getProductById);
router.put("/updateproduct/:id", verifyUser, updateProductById);
router.delete("/deleteproduct/:id", verifyUser, deleteProductByProductId);
module.exports = router;
