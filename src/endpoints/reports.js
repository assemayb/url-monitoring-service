const express = require("express");
const axios = require("axios");
const checkAuth = require("../utils/checkAuth");
const isUrlAvialable = require("../utils/checkAvailability");
const { Check } = require("../models/Check");

const { sendAvialabilityCheck } = require("../utils/verifyEmail");
const notifyWebhookURL = require("../utils/notifyWebhook");
const { generateByID, generateByTag } = require("../utils/generateReport");

const router = express.Router();

// status - The current status of the URL.
// availability - A percentage of the URL availability.
// outages - The total number of URL downtimes.
// downtime - The total time, in seconds, of the URL downtime.
// uptime - The total time, in seconds, of the URL uptime.
// responseTime - The average response time for the URL.
// history - Timestamped logs of the polling requests.

router.get("/tag/:tag", /** checkAuth */ async (req, res) => {
  const tagName = req.params.tag;

  try {
    let result = await generateByTag(tagName);
    console.log(result);
    return res.status(200).json({ message: " ===>>>  ok" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/:checkId", /** checkAuth */ async (req, res) => {
  const checkId = req.params.checkId;

  try {
    let result = await generateByID(checkId);
    // console.log(result);
    return res.status(200).json({ message: " ===>>>  ok" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
