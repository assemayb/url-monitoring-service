const express = require("express");
const bcrypt = require("bcrypt");
const { verify } = require("jsonwebtoken");

const router = express.Router();

const { genCode } = require("../utils/generateEmailCode");
const User  = require("../models/User")

router.post("/sign-up", async (req, res) => {
  if (req.body) {
    return res
      .status(400)
      .json({ message: "required data has not been provided" });
  }

  const { password, email } = req.body;
  const isDataFine = password !== "" && email !== "";
  

  if (isDataFine) {
    const mailCode = genCode();
    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      email,
      password: hashedPassword
    })
    
    return res.status(200).json({
      message: "please check your email to complete the registration process",
    });

    // add to data
  }
});

const checkAuth = (req, next) => {
  const authorization = req.headers["authorization"];
  if (authorization === null) {
    throw new Error("there is no auth header");
  }
  try {
    const token = authorization.split(" ")[1];
    const paylaod = verify(token, process.env.ACCESS_TOKEN_SECRET);
    return next();
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};
