const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    cartId: {
      type: mongoose.Types.ObjectId,
      ref: "cart",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);
module.exports = Order;
