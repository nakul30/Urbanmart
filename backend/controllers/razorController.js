const Razorpay = require("razorpay");
// import Razorpay from "razorpay";
// import crypto from "crypto";
const instance = new Razorpay({
  key_id: process.env.RAZOR_KEY,
  key_secret: process.env.RAZOR_SECRET,
});

module.exports.order = async function (req, res) {
  console.log("Order request");
  const { amount, currency = "INR" } = req.body;
  console.log(amount, currency);
  instance.orders.create(
    {
      amount,
      currency,
    },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.json({ message: err });
      }
      console.log(data);
      return res.json(data);

    }
  );
};
// {-----------------Response-----------------}
//   "id": "order_HmtYjJks02nUpz",
//   "entity": "order",
//   "amount": 5000,
//   "amount_paid": 0,
//   "amount_due": 5000,
//   "currency": "INR",
//   "receipt": null,
//   "offer_id": null,
//   "status": "created",
//   "attempts": 0,
//   "notes": [],
//   "created_at": 1627381738
// }

module.exports.payment = async function (req, res) {
  const { paymentId,orderId,signature, amount, currency = "INR" } = req.body;
  // const body = razorpay_order_id + "|" + paymentId;
  // const expectedSignature = crypto.createHmac("sha256", process.env.RAZOR_SECRET).update(body.toString()).digest("hex");
  // var response = { status: "failure" };
  // instance.payments.capture(paymentId, amount, currency, (err, data) => {
  //   if (err) {
  //     return res.json({ message: err });
  //   }
  //   return res.json(data);
  // }
  // );
  generated_signature = hmac_sha256(orderId + "|" + paymentId, process.env.RAZOR_SECRET);

  if (generated_signature == signature) {
    res.status(200).json({ message: "Payment Successful" });
  }
  res.status(400).json({ message: "Payment Failed" });

};
// {-----------------Response-----------------}
// {
//   "id": "pay_HmtYjJks02nUpz",
//   "entity": "payment",
//   "amount": 5000,
//   "currency": "USD",
//   "status": "captured",
//   "order_id": "order_HmtYjJks02nUpz",
//   "invoice_id": null,
//   "international": false,
//   "method": "card",
//   "amount_refunded": 0,
//   "refund_status": null,
//   "captured": true,
//   "description": "Payment for order #order_HmtYjJks02nUpz",
//   "card_id": "card_8F7nMk3Jskjdks",
//   "bank": null,
//   "wallet": null,
//   "vpa": null,
//   "email": "customer@example.com",
//   "contact": "+911234567890",
//   "notes": [],
//   "fee": 100,
//   "tax": 18,
//   "error_code": null,
//   "error_description": null,
//   "created_at": 1627381738
// }
