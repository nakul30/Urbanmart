const express = require("express");
const router = express.Router();

const authRouter = require('./auth');
const userRouter = require('./user');
const productRouter = require('./product');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const razorRouter = require('./razor');
const verifyToken = require("../middlewares/verifyToken");

console.log("Router deployed");
router.get('/test', verifyToken , async(req,res)=>{
    try{
        res.status(200).json("Welcome to the backend");
    }
    catch(err){
        res.status(500).json(err);
    }
})
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);
router.use('/checkout', razorRouter);

module.exports=router;