const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");
const Product = require("../models/Product");

module.exports.createProduct = async function (req, res) {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    return res.json(savedProduct);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports.updateProduct = async function (req, res) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.json(updatedProduct);
  } catch (err) {
    if (err) return res.status(500).json({ message: err.message });
  }
};
module.exports.deleteProduct = async function (req, res) {
  // res.json({ message: "Success" });
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports.getProduct = async function (req, res) {
  try {
    const product = await Product.findById(req.params.id);
    return res.json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports.getAllProducts = async function (req, res) {
  // res.json({ message: "Success" })
  const queryNew = req.query.new;
  console.log("Query new ", queryNew);
  const queryCat = req.query.cat;
  console.log("Query cat ", queryCat);

  try {
    let products;
    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (queryCat) {
      products = await Product.find({ categories: { $in: [queryCat] } });
    } else {
      products = await Product.find();
    }
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
