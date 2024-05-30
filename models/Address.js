const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Bu referans, User modeline atıfta bulunmalıdır
      required: true,
    },
    addresses: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
        },
        addressTitle: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        surname: {
          type: String,
          required: true,
        },
        tcNo: {
          type: Number,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        phoneNo: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
