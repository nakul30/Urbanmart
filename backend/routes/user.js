const express = require("express");
const router = express.Router();
const verifyPermission = require("../middlewares/verifyPermission");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.json({ message: "Success" });
});
router.put("/:id", verifyToken, verifyPermission, userController.updateUser);
router.delete("/:id", verifyToken, verifyPermission, userController.deleteUser);
router.get(
  "/single/:id",
  verifyToken,
  verifyAdmin,
  userController.getSingleUser
);
router.get("/all", verifyToken, verifyAdmin, userController.getAllUsers);
router.get(
  "/stats",
  verifyToken,
  verifyAdmin,
  userController.getUserStatiaclly
);

module.exports = router;
