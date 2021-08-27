const express = require("express");
const bcrypt = require("bcrypt");
const { verify } = require("jsonwebtoken");



const { genCode } = require("../utils/generateEmailCode");
const { User } = require("../models/User");


const router = express.Router()

router.post("/sign-up", async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: "required data has not been provided" });
  }

  const { password, email } = req.body;
  const isDataFine = password !== "" && email !== "";

  if (isDataFine) {
    const mailCode = genCode();
    console.log("Mail Code", mailCode);

    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await User.create({
      email,
      password: hashedPassword,
      confirmationCode: mailCode,
    });

    // TODO: send the code to the email here 
    return res.status(200).json({
      message: "please check your email to complete the registration process",
    });

    // add to data
  }
});


// verify user email
router.post("/verify-email", async (req, res) => {
  const {email, password, code} = req.body  

  try {
    let user = await User.findOne({
      where: {
        email: email

      }
    })

    const StoredConfirmationCode = user.getDataValue("confirmationCode")
    if(code === StoredConfirmationCode) {

    }
  } catch (error) {
    
  }
})

router.post("/login", async (req, res) => {
  const {password, email} = req.body
  let user = await User.findOne({
    where: {
      email
    }
  }) 
  const status = user.getDataValue("active")
  if(status === false) {
    return res.status(401).send({
      message: "Pending Account. Please Verify Your Email!",
    });

  }  else {
    // TODO: verify the password and send the access token
    // 
  }
})




module.exports = router 