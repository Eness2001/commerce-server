const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
        {
          productId: {
            type: mongoose.Types.ObjectId,
            ref: "product",
            required: true,
          },
          count: {
            type: Number,
            required: true,
          },
        },
      ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
