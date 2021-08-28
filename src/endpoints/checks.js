const express = require("express");
const axios = require("axios");
const checkAuth = require("../utils/checkAuth");

const router = express.Router();

router.get(
  "/up-or-down",
  /**checkAuth */ async (req, res) => {
    try {
      const { url, path, host } = req.body;
      let fullUrl = path !== "" ? `${url}/${path}` : url;
      const request = await axios.get(fullUrl);
      const status = await request.status;
      if (status === 200)
        return res.status(200).json({ message: "url is up and running" });
      return res.status(204).json({ message: "url is down or not working!" });
    } catch (error) {
      console.log(error.message);
      // return res.status(500).json({ message: error.message });
    }
  }
);

router.post("/create", checkAuth, async (req, res) => {
  try {
    const { url, path, host } = req.body;
    res.status(200).json({ message: { url, path, host } });
  } catch (error) {
    console.log(error.message);
  }
});

// edit a current check operation
router.put("/edit/:checkId", checkAuth, (req, res) => {
  const id = req.params.checkId;
  try {
    res.status(200).json({ message: id });
  } catch (error) {
    console.log(error.message);
  }
});

// Pause a check operation
router.put("/pause/:checkId", checkAuth, (req, res) => {
  const id = req.params.checkId;
  try {
    res.status(200).json({ message: id });
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:checkId", (req, res) => {
  const id = req.params.checkId;
  try {
    res.status(200).json({ message: id });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
