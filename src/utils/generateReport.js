const { Check } = require("../models/Check");
const { CheckPoint } = require("../models/Checkpoint");

const handleNullValue = (val) => {
  if (val == null || val == undefined) {
    return 0;
  }
  return val;
};

const countAvgResponseTime = (checkPoints, totalCount) => {
  let sumOfResponseTime = 0;
  checkPoints.forEach((ch) => {
    let resTime = ch.responseTime;
    sumOfResponseTime += resTime;
  });
  return sumOfResponseTime / totalCount;
};

const getCurrentStatus = (checkPoints, totalCount) => {
  return checkPoints[totalCount - 1]["currentStatus"];
};

const getAvailability = (checkPoints) => {
  let result = 0;
  checkPoints.forEach((ch) => {
    let uptime = ch.uptime;
    uptime = handleNullValue(uptime);
    result += uptime;
  });
  return `${result} times`;
};

const getOutages = (checkPoints) => {
  let result = 0;
  checkPoints.forEach((ch) => {
    let downtime = ch.downtime;
    uptime = handleNullValue(downtime);
    result += downtime;
  });

  return `${result} times`;
};
const generateByID = async (checkId) => {
  try {
    let checkPoints = await CheckPoint.findAndCountAll({
      where: {
        checkId,
      },
    });
    const checkPointsCount = checkPoints.count;
    checkPoints = checkPoints.rows.map((ch, idx) => ch.toJSON());
    let responseTime = Math.round(
      countAvgResponseTime(checkPoints, checkPointsCount)
    );
    let currentStatus = getCurrentStatus(checkPoints, checkPointsCount);
    let availability = getAvailability(checkPoints);
    let outages = getOutages(checkPoints);
    let timeStamps = checkPoints.map((ch) => JSON.stringify(ch.createdAt));

    return {
      currentStatus,
      responseTime,
      availability,
      outages,
      timeStamps,
    };
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

const generateByTag = async (tagName) => {
  let allChecks = [];
  try {
    let checks = await Check.findAll({
      where: { tag: tagName },
    });
    for (let ch of checks) {
      const singleCheck = await generateByID(ch.id);
      singleCheck.name = ch.name
      allChecks.push(singleCheck);
    }
    return allChecks;
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

module.exports = {
  generateByID,
  generateByTag,
};
