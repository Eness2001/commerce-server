const Order = require('../models/Orders');
const Cart = require('../models/Cart');

const createOrder = async (req, res) => {
  try {
    const { userId, cartId, totalAmount } = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const order = new Order({
      userId,
      cartId,
      totalAmount,
      status: 'pending',
    });

    await order.save();

    // Opsiyonel olarak, cart'ı temizle veya güncelle
    // Örneğin, "completed" durumunda cart'ı boşaltabilirsiniz.
    // cart.items = [];
    // await cart.save();

    return res.status(201).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: 'cartId',
      populate: {
        path: 'items.productId',
        model: 'product',
      },
    }).populate('userId');

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate({
      path: 'cartId',
      populate: {
        path: 'items.productId',
        model: 'product',
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  updateOrderStatus,
};