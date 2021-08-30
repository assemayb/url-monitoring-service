const checkNeededData = (req, res, next) => {
  let isFine = true;
  const needKeys = ["name", "url", "protocol", "tag", "webhook"];
  for (let key of needKeys) {
    if (!Object.keys(req.body).includes(key)) {
      isFine = false;
    }
  }
  if (isFine) return next();
  return res.status(400).json({
    message: "needed data is not available",
  });
};

module.exports = checkNeededData;
