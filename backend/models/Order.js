const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    razorOrderId: { type: String, required: true },
    razorPaymentId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('order', Schema);
