const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");



app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))




const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`server is running on port ${PORT}`));