const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add a product Name"],
      maxlength: 32,
    },

    price: {
      type: Number,
      trim: true,
      required: [true, "Product must have a price"],
      maxlength: 32,
    },

    discountRate: {
      type: Number,
      trim: true,
      required: [true, "Please add a product discountRate"],
      maxlength: 3,
    },
    category: {
      type: String,
      trim: true,
      required: [true, "Product must have a category"],
      maxlength: 32,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
