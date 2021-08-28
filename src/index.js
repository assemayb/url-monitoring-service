const express = require("express");
const cors = require("cors")
const morgan = require("morgan");
const cookieParser = require("cookie-parser")
const sequelize  = require("./config/dbConfig")


const { config } = require("dotenv");
config({
    path: `${__dirname}/config/.env`,
});



app = express()
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// database configuration
sequelize
  .authenticate()
  .then(console.log("database connected successfulyy"))
  .then(sequelize.sync(/**{ force: true } */))
  // .then(databaseConfig.sync( { force: true }  ))
  .catch((err) => console.log(err));


// API routes
app.use("/auth", require("./endpoints/auth"))
app.use("/checks", require("./endpoints/checks"))
app.use("/play", require("./endpoints/play"))


const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`server is running on port ${PORT}`));