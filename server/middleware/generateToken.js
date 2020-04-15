const jwt = require("jsonwebtoken");
const config = require("config");
const jwtPrivateKey = config.get("jwtPrivateKey");

module.exports = (payload) => {
  const token = jwt.sign(payload, jwtPrivateKey, {
    expiresIn: "12h",
  });
  return token;
};
