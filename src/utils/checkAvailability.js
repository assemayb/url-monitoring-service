const axios  = require("axios")


// const isUrlAvialable = async (req, res) => {
const isUrlAvialable = async (url, path, host) => {
  try {
    // const { url, path, host } = req.body;
    let fullUrl = path !== "" ? `${url}/${path}` : url;
    const request = await axios.get(fullUrl);
    const status = await request.status;
    if (status === 200) return true;
    return false;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = isUrlAvialable