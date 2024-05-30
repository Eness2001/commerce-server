require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes = require("./routes/orderRoutes");
// ===DB CONNECTİON===
connectDB();

// =============== //

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const corsOptions = {
  origin: "http://localhost:3001", // Specify your frontend domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (cookies, Authorization headers, etc.)
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// === API ENDPOİNT ===
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/favorite", favoriteRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

// === SERVER START===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`===SERVER LİSTEN=== ${PORT}`);
});
