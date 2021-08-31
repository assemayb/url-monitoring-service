const Ping = require("ping-monitor");
const { Check } = require("./models/Check");

const TIMEOUT = 5000; /** 5 seconds */
const INTERVAL = 60 * 10000; /** 10 minutes */
const THRESHOLD = 1; /** threshold of failures */

const notificateUser = async (checkData) => {
  await sendAvialabilityCheck(checkData);
  await notifyWebhookURL(checkData);
};

async function pollChecks() {
  // get all added checks and iterate throgh them
  const checks = await Check.findAll({
    // include: "reports",
    where: {
      active: true,
    },
  });

  checks.forEach((check, idx) => {
    let website = check.get();

    // create the polling instance to the check
    let monitor = new Ping({
      website: website.url,
      interval: 0.6,
      config: {
        intervalUnits: "minutes",
        generateId: false,
      },
      ignoreSSL: true,
      httpOptions: {
        method: "get",
      },
    });

    monitor.on("up", (res) => {
      console.log(Object.keys(res));
      console.log(res.website + " is up and working fine");
    });

    monitor.on("down", (res) => {
      // TODO: add the email and notification
      // console.log(res);
      console.log(website, " is down ==========>");
    });

    monitor.on("error", (res) => {
      // TODO: add the email and notification
      console.log(res);
    });

    monitor.on("stop", (website) => {
      // TODO: add the email and notification
      console.log(website + " monitor has stopped.");
    });

    //   urls.push(website.url);
    //   monitors.push(monitor);
  });
}

module.exports = pollChecks;
