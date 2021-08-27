const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors")
const morgan = require("morgan");

dotenv.config({
    path: `${__dirname}/config/.env`,
});


app = express()

console.log(process.env.ACCESS_TOKEN_SECRET);

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`server is running on port ${PORT}`));