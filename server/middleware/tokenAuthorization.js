const jwt = require("jsonwebtoken");
const config = require("config");
const jwtPrivateKey = config.get("jwtPrivateKey");

function authToken(req, res, next) {
  //passing the token in the header of the api url
  const bearerHeader = req.header("Authorization");
  if (!bearerHeader)
    return res.status(401).send("Access Denied. No token provided.");
  const bearer = bearerHeader.split(" ");
  //the token is present at the 1st index position hence we access it from 1st index position
  const token = bearer[1];

  //if no token is present then send the error message
  if (!token) return res.status(401).send("Access Denied. No token provided.");
  else {
    try {
      // using jwt.verify to verify if it is a valid token

      const decoded = jwt.verify(token, jwtPrivateKey);

      // returns the value of the jwt if the token is verified
      req.user = decoded;
      next();
    } catch (e) {
      res.status(400).send("Invalid token");
    }
  }
}
module.exports = authToken;
