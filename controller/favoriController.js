const Favorite = require("../models/Favorite");
const { sendResponseError } = require("../middleware/middleware");

// === ADD PRODUCT TO FAVORİTES ===
const addProductToFavorites = async (req, res) => {
  const productId  = req.params.id;

  try {
    // Find user's favorites
    let favorites = await Favorite.findOne({ userId: req.user._id });

    // If favorites don't exist, create a new favorite document
    if (!favorites) {
      favorites = new Favorite({
        userId: req.user._id,
        products: [{ productId }],
      });

      await favorites.save();
      return res.status(201).send({ status: "OK", favorites });
    }

    // Check if the product is already in favorites
    const isProductInFavorites = favorites.products.some(
      (product) => product.productId.toString() === productId
    );

    if (!isProductInFavorites) {
      // If the product is not in favorites, add it
      favorites.products.push({ productId });
      await favorites.save();
    }

    res
      .status(200)
      .send({ status: "=== PRODUCT ADDED TO FAVORITES ===", favorites });
  } catch (error) {
    sendResponseError(
      500,
      `=== ERROR ADDING PRODUCT TO FAVORİTES ${error}`,
      res
    );
  }
};

// === GET FAVORİTE PRODUCTS
const getFavoriteProducts = async (req, res) => {
  try {
    const favorites = await Favorite.findOne({ userId: req.user._id }).populate(
      "products.productId"
    );
    res
      .status(200)
      .send({ status: "=== GET FAVORITE PRODUCTS ===", favorites });
  } catch (error) {
    sendResponseError(
      500,
      `=== ERROR GETTING FAVORITE PRODUCTS ===${error}`,
      res
    );
  }
};

// DELETE PRODUCT FROM FAVORİTES
const removeProductFromFavorites = async (req, res) => {
  const productId = req.params.id;

  try {
    const favorites = await Favorite.findOne({ userId: req.user._id });

    // If favorites don't exist, return an error
    if (!favorites) {
      return sendResponseError(404, "Favorites not found", res);
    }

    // Find the index of the product in favorites
    const productIndex = favorites.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    // If the product is not found in favorites, return an error
    if (productIndex === -1) {
      return sendResponseError(404, "Product not found in favorites", res);
    }

    // Remove the product from favorites
    favorites.products.splice(productIndex, 1);
    await favorites.save();

    res
      .status(200)
      .send({ status: "=== PRODUCT REMOVED FROM FAVORITES ===", favorites });
  } catch (error) {
    sendResponseError(
      500,
      `=== ERROR REMOVING PRODUCT FROM FAVORITES ===${error}`,
      res
    );
  }
};
module.exports = {
  addProductToFavorites,
  getFavoriteProducts,
  removeProductFromFavorites,
};
