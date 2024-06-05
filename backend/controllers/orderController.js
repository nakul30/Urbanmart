const Order = require("../models/Order");
module.exports.createOrder = async function (req, res) {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    return res.json(savedOrder);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports.updateOrder = async function (req, res) {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.json(updatedOrder);
  } catch (err) {
    if (err) return res.status(500).json({ message: err.message });
  }
};
module.exports.deleteOrder = async function (req, res) {
  try {
    await Order.findByIdAndDelete(req.params.id);
    return res.json({ message: "Order deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports.getOrderByUser = async function (req, res) {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports.getAllOrders = async function (req, res) {
  try {
    const orders = Order.find();
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getIncome = async function (req, res) {
  const date = new Date();
  const previousMonth = new Date(date.setMonth(date.getMonth() - 2));

  try {
    const income = await Order.aggregate([
      { $match: { $gte: previousMonth } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    return res.json(income);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
