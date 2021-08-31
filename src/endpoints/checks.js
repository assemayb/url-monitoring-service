const express = require("express");
const axios = require("axios");
const checkAuth = require("../utils/checkAuth");
const isUrlAvialable = require("../utils/checkAvailability");
const { Check } = require("../models/Check");

const { sendAvialabilityCheck } = require("../utils/verifyEmail");
const notifyWebhookURL = require("../utils/notifyWebhook");

const router = express.Router();

const TIMEOUT = 5000; /** 5 seconds */
const INTERVAL = 60 * 10000; /** 10 minutes */
const THRESHOLD = 1; /** threshold of failures */

router.get("/up-or-down", checkAuth, async (req, res) => {
  try {
    const { name, url, path } = req.body;

    const storedCheck = await Check.findOne({ where: { name, url } });
    const checkData = storedCheck.get();
    const value = await isUrlAvialable(url, path);
    checkData.isFine = value;

    sendAvialabilityCheck(checkData);
    notifyWebhookURL(checkData);

    if (value == true) {
      return res.status(200).json({ message: "url is up and running" });
    } else {
      return res.status(204).json({ message: "url is down or not working!" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.post("/create", checkAuth, async (req, res) => {
  try {
    const { name, url, protocol, path, host, webhook, tag } = req.body;

    // neeed data: name - url protocol
    const requestUsername = req.userData.email;
    let check = await Check.create({
      name,
      url,
      protocol,
      webhook,
      tag,
      username: requestUsername,
      path,
      host,
    });

    // console.log(check.get());

    res.status(201).json({ message: "check is Added." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// edit a current check operation
router.put("/:checkId", checkAuth, async (req, res) => {
  const id = req.params.checkId;
  const checkNewData = req.body;
  const check = await Check.findByPk(id);
  check.update(checkNewData);

  try {
    res.status(200).json({ message: "check is updated successfully." });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

// delete a check from stored ones
router.delete("/:checkId", checkAuth, async (req, res) => {
  const id = req.params.checkId;
  await Check.destroy({
    where: id,
  });
  try {
    res.status(204).json({ message: "check deleted." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Pause a check operation
router.put("/pause/:checkId", checkAuth, async (req, res) => {
  const id = req.params.checkId;
  const check = await Check.findByPk(id);
  await check.update({
    active: false,
  });
  try {
    return res.status(200).json({ message: id });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

/// FOR TESTING PURPOSES
router.get("/all-checks", async (req, res) => {
  try {
    let checks = await Check.findAll();
  
    return res.status(200).json({
      checks,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;
