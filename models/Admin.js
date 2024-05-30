const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "ADMİN", 
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
