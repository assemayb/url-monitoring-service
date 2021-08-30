const checks = require("../data/data");
const isUrlAvialable = require("../utils/checkAvailability");

// const TIMEOUT = 5000; /** 5 seconds */
// const INTERVAL = 60 * 10000; /** 10 minutes */

const TIMEOUT = 5000;
const INTERVAL = 5000;
const THRESHOLD = 1; /** threshold of failures */

function simulateChecker() {
  checks.forEach((check, idx) => {
    setInterval(() => {
      console.log("interval logger");
      setTimeout(async () => {
        const { id, url, name, webhook, protocol } = check;
        const isAvailable = await isUrlAvialable(url, "", "");
        console.log(`${url} ====> ${isAvailable}`);
      }, TIMEOUT);
    }, INTERVAL);
  });
}

simulateChecker();
