const Ping = require("ping-monitor");
const { Check } = require("./models/Check");
const { CheckPoint } = require("./models/Checkpoint");

const TIMEOUT = 5000; /** 5 seconds */
const INTERVAL = 60 * 10000; /** 10 minutes */
const THRESHOLD = 1; /** threshold of failures */

const notificateUser = async (checkData) => {
  await sendAvialabilityCheck(checkData);
  await notifyWebhookURL(checkData);
};

async function pollChecks() {
  // get all added active checks and iterate through them
  const checks = await Check.findAll({
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

    monitor.on("up", async (res) => {
      // const { time, statusCode, statusMessage, responseTime, httpResponse } = res
      const { time, statusCode, statusMessage, responseTime } = res;

      try {
        let allCheckPoints = await CheckPoint.findAll({
          where: { checkId: check.id },
        });
        let allCheckPointsJSON = allCheckPoints.map((c) => (c = c.toJSON()));
        const lastCheckPointUptimeVal =
          allCheckPointsJSON.length !== 0 &&
          allCheckPointsJSON[allCheckPointsJSON.length - 1]["uptime"];

        const lastCheckStatus =
          allCheckPointsJSON.length !== 0 &&
          allCheckPointsJSON[allCheckPointsJSON.length - 1]["currentStatus"];

        if (lastCheckStatus != statusMessage) {
          let isFine = statusCode == 200 ? true : false;
          let chekData = website;
          checkData.isFine = isFine;
          notificateUser(chekData);
        }

        const uptime = () => {
          if (lastCheckPointUptimeVal !== null) {
            return lastCheckPointUptimeVal + 1;
          } else {
            return null;
          }
        };
        await CheckPoint.create({
          checkId: check.id,
          currentStatus: statusMessage,
          responseTime: responseTime,
          uptime: uptime(),
        });
      } catch (error) {
        console.log(error.message);
      }
    });

    monitor.on("down", (res) => {
      // TODO: add the email and notification
      // let checkPoint = await Checkpoint.create({
      // })
      let allCheckPoints = await CheckPoint.findAll({
        where: { checkId: check.id },
      });
      let allCheckPointsJSON = allCheckPoints.map((c) => (c = c.toJSON()));
      const lastCheckPointDownTimeVal =
        allCheckPointsJSON.length !== 0 &&
        allCheckPointsJSON[allCheckPointsJSON.length - 1]["downtime"];

      const lastCheckStatus =
        allCheckPointsJSON.length !== 0 &&
        allCheckPointsJSON[allCheckPointsJSON.length - 1]["currentStatus"];

      if (lastCheckStatus != statusMessage) {
        let isFine = statusCode == 200 ? true : false;
        let chekData = website;
        checkData.isFine = isFine;
        notificateUser(chekData);
      }

      const downtime = () => {
        if (lastCheckPointDownTimeVal !== null) {
          return lastCheckPointDownTimeVal + 1;
        } else {
          return null;
        }
      };
      let newCheckPoint = await CheckPoint.create({
        checkId: check.id,
        currentStatus: statusMessage,
        responseTime: responseTime,
        downtime: downtime(),
      });
    });

    monitor.on("error", (res) => {
      let isFine = res.statusCode == 200 ? true : false;
      let chekData = website;
      chekData.isFine = isFine;
      notificateUser(chekData);
      console.log(res);
    });

    monitor.on("stop", (website) => {
      // TODO: add the email and notification
      console.log(website + " monitor has stopped.");
    });
  });
}

module.exports = pollChecks;
