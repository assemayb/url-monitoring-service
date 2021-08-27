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


sequelize
  .authenticate()
  .then(console.log("database connected successfulyy"))
  .then(databaseConfig.sync(/**{ force: true } */))
  // .then(databaseConfig.sync( { force: true }  ))
  .catch((err) => console.log(err));

app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// API routes
app.use("/auth", require("./endpoints/auth"))
app.use("/checks", require("./endpoints/checks"))


const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`server is running on port ${PORT}`));