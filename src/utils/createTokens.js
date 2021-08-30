const {sign } =  require("jsonwebtoken");

const createAccessToken = (userId, userEmail) => {
  return sign(
    { id: userId, email: userEmail },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "120m" }
  );
};

const createRefreshToken = (userId, userEmail) => {
  return sign(
    { id: userId, email: userEmail },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "10d" }
  );
};

module.exports = {
  createAccessToken,
  createRefreshToken
};
