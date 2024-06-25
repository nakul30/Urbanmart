require("dotenv").config();
const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/mongoose");
const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'] }));
app.get("/", (req, res) => {
  res.json({ message: "Success" });
});
app.use('/api' , require('./routes')) ; 

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server Connected on PORT ${process.env.PORT || 5000}`,);
});

