const verifyPermission = require('../middlewares/verifyPermission');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
router.get("/", (req, res) => {
    res.json({ message: "Success" });
  });

router.post("/",orderController.createOrder);
router.put("/:id",verifyToken,verifyAdmin,orderController.updateOrder);
router.delete("/:id",verifyToken,verifyAdmin,orderController.deleteOrder);
router.get("/single/:userId",verifyToken,verifyPermission,orderController.getOrderByUser);
router.get("/all",verifyToken,verifyAdmin,orderController.getAllOrders);
router.get("/income",verifyToken,verifyAdmin,orderController.getIncome);

module.exports=router;