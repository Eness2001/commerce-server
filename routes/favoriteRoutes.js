const express = require("express");
const router = express.Router();
const { verifyUser } = require("../middleware/middleware");
const {
  addProductToFavorites,
  getFavoriteProducts,
  removeProductFromFavorites,
} = require("../controller/favoriController");

router.post("/addProductToFavorites/:id", verifyUser, addProductToFavorites);
router.get("/getFavoriteProducts", verifyUser, getFavoriteProducts);
router.delete(
  "/deleteProductFromFavorites/:id",
  verifyUser,
  removeProductFromFavorites
);
module.exports = router;
