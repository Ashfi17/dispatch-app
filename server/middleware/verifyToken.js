const jwt = require("jsonwebtoken");
const jwtPrivateKey = "jwtPrivateKey123456jwtPrivateKey654321";

module.exports = (token) => {
  jwt.verify(token, jwtPrivateKey, (err) => {
    if (err) console.log("consoling errr", err);
    else {
      console.log("token verified");
    }
  });
};
