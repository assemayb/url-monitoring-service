const axios = require("axios");

const notifyWebhookURL = async (checkData) => {
  const { url, name, webhook, isFine } = checkData;
  const status = isFine == true ? "up" : "down";

  const bodyData = {
    url,
    name,
    message: `${url} is: ${status}`,
  };
  try {
    const req = await axios.post(webhook, bodyData);
    const status = req.status;
    console.log(status);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = notifyWebhookURL;
