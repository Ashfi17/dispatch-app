const mysql = require("mysql");
const config = require("config");

//using environment variables to store the sensitive data
const mySqlHost = config.get("mySqlHost");
const mySqlUser = config.get("mySqlUser");
const mySqlPassword = config.get("mySqlPassword");
const mySqlDatabase = config.get("mySqlDatabase");

//creating connection to the database
const mySqlConnection = mysql.createConnection({
  host: mySqlHost,
  user: mySqlUser,
  password: mySqlPassword,
  database: mySqlDatabase,
});
module.exports = mySqlConnection;
