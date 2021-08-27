// after will not be used in the user login/signup process

const { verify } = require("jsonwebtoken");
const { User } = require("../models/User");

// only in the checks actions
const checkAuth = async (req, res,  next) => {
  const authorization = req.headers["authorization"];
  if (authorization === null) {
    throw new Error("No Auth Header!!");
  }
  try {
    const token = authorization.split(" ")[1];
    const paylaod = verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { id, email } = paylaod;
    const user = await User.findOne({
      where: {
        email: email,
        id: id,
      },
    });
    if (user !== null) {
      console.log(user.get());
      return next();
    }
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

module.exports = checkAuth;
