const Cart = require("../models/Cart");
const Product = require("../models/Product");
// module.exports.createCart = async function (req, res) {
//   console.log("here " ) ;
//   // console.log("req From create CArt ", req.body.userId.id);

//   // const id = req.body.userId.id;
//   // const {data} = req
//   const newCart = new Cart(req.body);

//   try {
//     const savedCart = await newCart.save();
//     return res.json(savedCart);
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };
module.exports.createCart = async function (req, res) {
  console.log("Here");

  const userId = req.body.userId;

  try {
    // Find the existing cart for the user
    let existingCart = await Cart.findOne({ userId });

    if (existingCart) {
      // If a cart exists, update it by appending new products
      const newProducts = req.body.products;

      newProducts.forEach((newProduct) => {
        const existingProduct = existingCart.products.find(
          (product) => product.productId === newProduct.productId
        );

        if (existingProduct) {
          // If the product already exists in the cart, update its quantity
          existingProduct.quantity += newProduct.quantity;
        } else {
          // If the product does not exist, add it to the cart
          existingCart.products.push(newProduct);
        }
      });

      const updatedCart = await existingCart.save();
      return res.json(updatedCart);
    } else {
      // If no cart exists, create a new cart
      const newCart = new Cart(req.body);
      const savedCart = await newCart.save();
      return res.json(savedCart);
    }
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
// module.exports.getCart = async function (req, res) {
//   try {
//     const cart = await Cart.find({ userId: req.params.userId });
//     return res.json(cart);
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };
module.exports.getCart = async function (req, res) {
  console.log("Here");
  const userId = req.params.userId;
  console.log("userId", userId);

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({
        userId,
        products: [],
        quantity: 0,
        totalPrice: 0,
      });
    }

    const productsWithDetails = await Promise.all(
      cart.products.map(async (cartProduct) => {
        const productDetails = await Product.findById(cartProduct.productId).lean();
        return {
          ...productDetails,
          quantity: cartProduct.quantity,
        };
      })
    );

    const totalQuantity = productsWithDetails.length;
    const totalPrice = productsWithDetails.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    return res.json({
      userId: cart.userId,
      products: productsWithDetails,
      quantity: totalQuantity,
      totalPrice,
    });
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
