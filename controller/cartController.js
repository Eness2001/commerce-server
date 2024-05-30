const Cart = require("../models/Cart");
const { sendResponseError } = require("../middleware/middleware");

// === ADD CART===

/* 
--> Her kullanıcıya ait bir sepet olabilir. 
*/
const addProductInCart = async (req, res) => {
  const productId = req.params.id;
  try {
    // FİND USER CART
    const cart = await Cart.findOne({ userId: req.user._id });
    // İF CART DONT EXIST
    if (!cart) {
      // CREATE NEW CART
      const newCart = new Cart({
        userId: req.user._id,
        items: [{ productId, count: 1 }],
      });
      await newCart.save();
      res.status(201).send({ status: "OK", cart: newCart });
    } else {
      // İF CART EXİST CONTROL THİS İTEM EXİST İN CART
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingItemIndex !== -1) {
        // İF THİS İTEM EXİST İN CART İNCREASE COUNT
        cart.items[existingItemIndex].count += 1;
      } else {
        // İF ITEM DONT EXİST İN CART PUSH NEW İTEM TO CART
        cart.items.push({ productId, count: 1 });
      }
      // SAVE CART
      await cart.save();
      res.status(201).send({ status: "===CART CREATED ===", cart });
    }
  } catch (error) {
    sendResponseError(500, `=== ERROR ADDİNG PRODUCT IN CART===${error}`, res);
  }
};

// === GET CART ===
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.user._id }).populate(
      "items.productId"
    );
    res.status(200).send({ status: "=== GET CART ===", cart });
  } catch (error) {
    sendResponseError(500, `=== ERROR GET CART ===${error}`, res);
  }
};
// === DELETE CART ===

const deleteCart = async (req, res) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).send({ status: "=== DELETE CART ===", deletedCart });
  } catch (error) {
    console.log(error);
    sendResponseError(500, `=== ERROR DELETE CART ===${error}`, res);
  }
};

// === UPDATE PRODUCT COUNT ===

const updateProductCount = async (req, res) => {
  const  productId  = req.params.id;
  const { count } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return sendResponseError(404, `=== CART NOT FOUND ===`, res);
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex === -1) {
      return sendResponseError(
        404,
        `=== PRODUCT NOT FOUND IN THE CART ===`,
        res
      );
    }

    cart.items[existingItemIndex].count = count;

    await cart.save();

    res.status(200).send({ status: "=== PRODUCT COUNT UPDATED ===", cart });
  } catch (error) {
    sendResponseError(500, `=== ERROR UPDATE PRODUCT COUNT ===${error}`, res);
  }
};

// === DELETE PRODUCT IN CART ===

const deleteProductInCart = async (req, res) => {
  const productIdToDelete = req.params.id;
  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId: req.user._id });

    // If the cart doesn't exist, return an error
    if (!cart) {
      return sendResponseError(404, "=== CART NOT FOUND", res);
    }

    // Find the index of the product in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productIdToDelete
    );

    // If the product is not found in the cart, return an error
    if (existingItemIndex === -1) {
      return sendResponseError(404, "=== PRODUCT NOT FOUND IN CART", res);
    }

    // Remove the product from the cart
    cart.items.splice(existingItemIndex, 1);

    // Save the updated cart
    await cart.save();

    res.status(200).send({ status: "=== PRODUCT DELETED FROM CART ===", cart });
  } catch (error) {
    sendResponseError(
      500,
      `=== ERROR DELETING PRODUCT FROM CART ===${error}`,
      res
    );
  }
};

module.exports = {
  addProductInCart,
  getCart,
  deleteCart,
  updateProductCount,
  deleteProductInCart,
};
