const express = require("express");
const axios = require("axios");
const checkAuth = require("../utils/checkAuth");
const isUrlAvialable = require("../utils/checkAvailability");
const { Check } = require("../models/Check");

const { sendAvialabilityCheck } = require("../utils/verifyEmail");
const notifyWebhookURL = require("../utils/notifyWebhook");

const router = express.Router();


// TODO: create the report gen endpoints here
// TODO: put the main function in the utils file 


router.get("/", checkAuth, (req, res) => {
    const {name, url} = req.body
    try {
        
    } catch (error) {
        
    }
})


router.get("/:tagName", checkAuth, (req, res) => {
    // TODO: get checks with the same tag and gen the report
    try {
        
    } catch (error) {
        
    }
})



// status - The current status of the URL.
// availability - A percentage of the URL availability.
// outages - The total number of URL downtimes.
// downtime - The total time, in seconds, of the URL downtime.
// uptime - The total time, in seconds, of the URL uptime.
// responseTime - The average response time for the URL.
// history - Timestamped logs of the polling requests.


module.exports = router