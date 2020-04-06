const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");

module.exports = (req, res, next) => {
  let bearerHeader =
    req.headers["x-access-token"] || req.headers["authorization"];
  if (!bearerHeader)
    return res.status(400).json({
      message: "Login failed, not a valid user"
    });

  const userToken = bearerHeader.split(" ")[1];

  try {
    verifyToken(userToken);
    // req.user = jwt.decode("secret", userToken);

    next();
  } catch (err) {
    next(err);
  }
};
