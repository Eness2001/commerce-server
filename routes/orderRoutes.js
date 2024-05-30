const express = require("express");
const router = express.Router();
const { verifyUser } = require("../middleware/middleware");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  updateOrderStatus,
} = require("../controller/orderController");

router.post("/addOrder", verifyUser, createOrder);
router.get("/getOrders", verifyUser, getAllOrders);
router.get("/getOrderById/:id", verifyUser, getOrderById);
router.delete("/deleteOrder/:id", verifyUser, deleteOrder);
router.put("/updateOrderStatus/:id", verifyUser, updateOrderStatus);

module.exports = router;
