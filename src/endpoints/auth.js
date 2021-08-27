const express = require("express");
const { verify } = require("jsonwebtoken");

const router = express.Router();

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
