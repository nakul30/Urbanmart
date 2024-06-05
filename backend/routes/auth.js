const express = require("express");
const router = express.Router();
const authContoller = require("../controllers/authController");

router.get("/", (req, res) => {
    res.json({ message: "Success" });
});

router.post("/register", authContoller.register);
router.post("/login", authContoller.login);

module.exports=router;