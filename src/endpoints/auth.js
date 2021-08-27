const express = require("express");
const bcrypt = require("bcrypt");
const { verify } = require("jsonwebtoken");

const { genCode } = require("../utils/generateEmailCode");
const { User } = require("../models/User");

const { sendConfirmationEmail } = require("../utils/verifyEmail");
const { createAccessToken } = require("../utils/createTokens");

const router = express.Router();

router.post("/sign-up", async (req, res) => {
  if (!req.body)
    return res.status(400).json({ message: "required data  not provided" });
  try {
    const { password, email } = req.body;
    const isDataFine = password !== "" && email !== "";

    if (isDataFine) {
      const mailCode = genCode();
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        email,
        password: hashedPassword,
        confirmationCode: mailCode,
      });
      sendConfirmationEmail(email, mailCode);
      return res
        .status(200)
        .json({ message: "check your email to complete registration process" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

// verify user email
// TODO: do this with the access token instead of manually sending the email and password
router.post("/verify-email", async (req, res) => {
  const { email, password, code } = req.body;

  try {
    let user = await User.findOne({ where: { email: email } });
    const userStoredPassword = user.getDataValue("password");
    const storedConfirmationCode = user.getDataValue("confirmationCode");

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userStoredPassword
    );
    const isCodeCorrect = code === storedConfirmationCode;
    if (isPasswordCorrect && isCodeCorrect) {
      await user.update({ active: true });
      return res.status(200).json({ message: "ok email has been verified" });
    } else {
      return res.status(400).json({ message: "verification code is wrong!" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { password, email } = req.body;
  let user = await User.findOne({ where: { email: email } });

  const isEmailVerified = user.getDataValue("active");
  const storedPassword = user.getDataValue("password");

  if (isEmailVerified === false) {
    return res.status(401).send({
      message: "Pending Account. Please Verify Your Email!",
    });
  } else {
    const isPassCorrect = bcrypt.compare(password, storedPassword);
    if (isPassCorrect) {
      const id = user.getDataValue("id");
      const accessToken = createAccessToken(id, email);
      return res.status(200).send({
        token: accessToken,
      });
    }
  }
});

module.exports = router;
