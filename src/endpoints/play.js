const express = require("express");
const bcrypt = require("bcrypt");
const axios = require("axios");
const { verify } = require("jsonwebtoken");

const { genCode } = require("../utils/generateEmailCode");
const { User } = require("../models/User");

const { sendConfirmationEmail } = require("../utils/verifyEmail");
const { createAccessToken } = require("../utils/createTokens");

const checkNeededData = require("../utils/neededDataExist");

const router = express.Router();

const axiosRequestInterceptor = (req) => {
  req.time = { startTime: new Date() };
  return req;
};

const axiosResponseInterceptor = (res) => {
  res.config.time.endTime = new Date();
  res.duration = res.config.time.endTime - res.config.time.startTime;
  return res;
};

const handleAxiosInterceptorError = (err) => {
  return Promise.reject(err);
};

router.post("/", checkNeededData, async (req, res) => {
  const { name, url, protocol } = req.body;

  try {
    axios.interceptors.request.use(
      (req) => axiosRequestInterceptor(req),
      (err) => handleAxiosInterceptorError(err)
    );
    axios.interceptors.response.use(
      (res) => axiosResponseInterceptor(res),
      (err) => handleAxiosInterceptorError(err)
    );

    const request = await axios.get(url);
    const staus = await request.status;
    const responseTime = await request.duration; /** in milliseconds */

    console.log("staus", staus);
    console.log("responseTime", responseTime);

    // const status = response.status;
    // const config = response.config;
    // const responseX = response.res;

    // console.log(status);
    // console.log(config);
    // console.log(Object.keys(response.request));

    res.status(200).json({ message: "okkkk" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
