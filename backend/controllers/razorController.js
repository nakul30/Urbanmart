const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RAZOR_KEY,
  key_secret: process.env.RAZOR_SECRET,
});

module.exports.order = async function (req, res) {
  const { amount, currency = "INR" } = req.body;
  instance.orders.create(
    {
      amount,
      currency,
    },
    (err, data) => {
      if (err) {
        return res.json({ message: err });
      }
      return res.json(data);
    }
  );
};
module.exports.payment = async function (req, res) {
  const { paymentId, amount, currency = "INR" } = req.body;
  instance.payments.capture(paymentId, amount, currency, (err, data) => {
    if (err) {
      return res.json({ message: err });
    }
    return res.json(data);
  });
};
