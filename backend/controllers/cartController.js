const Cart = require("../models/Cart");

module.exports.createCart = async function (req, res) {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    return res.json(savedCart);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports.updateCart = async function (req, res) {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.json(updatedCart);
  } catch (err) {
    if (err) return res.status(500).json({ message: err.message });
  }
};
module.exports.deleteCart = async function (req, res) {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    return res.json({ message: "Cart deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports.getCart = async function (req, res) {
  try {
    const cart = await Cart.find({ userId: req.params.userId });
    return res.json(cart);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports.getAllCarts = async function (req, res) {
  const queryNew = req.query.new;
  const queryCat = req.query.cat;

  try {
    const carts = Cart.find();
    return res.json(carts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
