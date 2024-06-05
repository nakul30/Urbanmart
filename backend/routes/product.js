const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verifyAdmin = require("../middlewares/verifyAdmin");
const verifyToken = require("../middlewares/verifyToken");
router.get("/", (req, res) => {
    res.json({ message: "Success" });
  });
router.post("/",verifyToken,verifyAdmin,productController.createProduct);
router.put("/:id",verifyToken,verifyAdmin,productController.updateProduct);
router.delete("/:id",verifyToken,verifyAdmin,productController.deleteProduct);
router.get("/single/:id",productController.getProduct);
router.get("/all",productController.getAllProducts);  

module.exports=router;