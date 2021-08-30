const axios = require("axios");

// const isUrlAvialable = async (req, res) => {
const isUrlAvialable = async (url, path, host) => {
  try {
    let fullUrl = path !== "" ? `${url}/${path}` : url;

    const request = await axios.get(fullUrl);
    const status = await request.status;
    if (status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = isUrlAvialable;
