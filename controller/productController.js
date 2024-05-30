const Product = require("../models/Product");
const { sendResponseError } = require("../middleware/middleware");
const cloudinary = require("../config/cloudinary");
const upload = require("../middleware/multer");

// === ADD PRODUCT ===

const addProduct = async (req, res) => {
  try {
    upload.single("image")(req, res, async function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ succes: false, message: "Error.." });
      }

      const { name, price, discountRate, category } = req.body;
      const allowedCategories = ["SAAT", "KULAKLIK", "ADAPTÖR"];
      if (!allowedCategories.includes(category)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid category" });
      }
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "products",
        });
        const product = await Product.create({
          name,
          price,
          discountRate,
          category,
          image: {
            public_id: result.public_id,
            url: result.secure_url,
          },
        });
        console.log(req.file.path);
        res.status(201).json({
          success: true,
          message: "=== PRODUCT ADDED SUCCESSFULLY ===",
          product,
        });
      } catch (error) {
        sendResponseError(500, `===ERROR=== ${error}`, res);
      }
    });
  } catch (error) {
    sendResponseError(500, `===ERROR=== ${error}`, res);
  }
};

// === GET ALL PRODUCTS ===
const getProducts = async (req, res) => {
  try {
    const product = await Product.find({});
    res.json(product);
  } catch (error) {
    sendResponseError(400, `===ERROR===${error}`, res);
  }
};

// === GET PRODUCT BY ID ===
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    sendResponseError(400, `===ERROR===${error}`, res);
  }
};

// === UPDATE PRODUCT BY PRODUCT ID ===
const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedFields = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedFields,
      { new: true }
    );

    res
      .status(200)
      .send({ status: "===PRODUCT UPDATED===", product: updatedProduct });
    if (!updatedProduct) {
      sendResponseError(404, "=== PRODUCT NOT FOUND ===", res);
      return;
    }
  } catch (error) {
    sendResponseError(400, `===ERROR===${error}`, res);
  }
};
// === DELETE PRODUCT BY PRODUCT ID ===

const deleteProductByProductId = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (deletedProduct) {
      res
        .status(200)
        .send({ status: "===PRODUCT DELETED===", product: deletedProduct });
    } else {
      sendResponseError(404, `=== PRODUCT NOT FOUND ===`, res);
    }
  } catch (error) {
    sendResponseError(400, `===ERROR===${error}`, res);
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductByProductId,
};
