const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "product",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Favorite = mongoose.model("favorite", favoriteSchema);

module.exports = Favorite;
