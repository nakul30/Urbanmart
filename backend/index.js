require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/mongoose");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Success" });
});
app.use('/api' , require('./routes')) ; 

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server Connected on PORT ${process.env.PORT || 5000}`,);
});

