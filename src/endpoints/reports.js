const express = require("express");
const axios = require("axios");
const checkAuth = require("../utils/checkAuth");
const isUrlAvialable = require("../utils/checkAvailability");
const { Check } = require("../models/Check");

const { sendAvialabilityCheck } = require("../utils/verifyEmail");
const notifyWebhookURL = require("../utils/notifyWebhook");
const { generateByID, generateByTag } = require("../utils/generateReport");

const router = express.Router();

router.get("/tag/:tag", checkAuth, async (req, res) => {
  const tagName = req.params.tag;

  try {
    let result = await generateByTag(tagName);
    return res.status(200).json({ message: result });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/:checkId", checkAuth, async (req, res) => {
  const checkId = req.params.checkId;

  try {
    let result = await generateByID(checkId);
    return res.status(200).json({ message: result });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
