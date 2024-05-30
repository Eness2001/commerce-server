require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/e-commerce",
      console.log("MongoDB connection succesfully")
    );
  } catch (error) {
    console.error("Mongo DB connecton Fail");
    process.exit(1);
  }
};


module.exports = {connectDB}