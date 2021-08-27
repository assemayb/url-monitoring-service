const express = require("express");
const checkAuth = require("../utils/checkAuth");

const router = express.Router();

router.post("/create", checkAuth , async (req, res) => {
  try {
    const { url, path, host } = req.body;
    res.status(200).json({ message: { url, path, host } });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
