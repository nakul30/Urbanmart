const express = require("express");
const router = express.Router();
const verifyPermission = require("../middlewares/verifyPermission");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");
const cartController = require("../controllers/cartController");
const addUserIdToBody = require("../middlewares/addUserToBody");
router.get("/", (req, res) => {
  res.json({ message: "Success" });
});

router.post("/", verifyToken, cartController.createCart);
router.put("/:id", verifyToken, verifyPermission, cartController.updateCart);
router.delete("/:id", verifyToken, verifyPermission, cartController.deleteCart);
router.get(
  "/single/:userId",
  verifyToken,
  verifyPermission,
  cartController.getCart
);

router.get("/all", verifyToken, verifyAdmin, cartController.getAllCarts);
module.exports = router;
