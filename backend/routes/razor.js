const express = require("express");
const router = express.Router();
const razorController = require("../controllers/razorpay");
router.get("/", (req, res) => {
    res.json({ message: "Success" });
  });
router.post("/order" , razorController.order)
router.post("/payment" , razorController.payment)
module.exports=router;