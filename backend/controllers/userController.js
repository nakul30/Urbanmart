const bcrypt = require("bcrypt");
const User = require("../models/User");
module.exports.updateUser = async function (req, res) {
  // res.json({ message: "Update User" });
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    const parsed = updatedUser.toObject();
    delete parsed.password;
    return res.json(parsed);
  } catch (err) {
    if (err) return res.status(500).json({ message: err.message });
  }
};
module.exports.deleteUser = async function (req, res) {
  //   res.json({ message: "Delete User" });
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports.getSingleUser = async function (req, res) {
  //   res.json({ message: "Get Single User" });
  try {
    const user = await User.findById(req.params.id, { password: 0 });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports.getAllUsers = async function (req, res) {
  //   res.json({ message: "Get All Users" });
  const query = req.query.new;
  try {
    const users = query
      ? await User.find({}, { password: 0 }).sort({ _id: -1 }).limit(5)
      : await User.find({}, { password: 0 });
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports.getUserStatiaclly = async function (req, res) {
  //   res.json({ message: "Get User Statistically" });
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
