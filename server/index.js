const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const logger = require("morgan");
const config = require("config");
const auth = require("./middleware/tokenAuthorization");
const users = require("./routes/apis/Users");
const dispatch = require("./routes/apis/Dispatch");

//using environment variables to store the sensitive data
const mySqlHost = config.get("mySqlHost");
const mySqlUser = config.get("mySqlUser");
const mySqlPassword = config.get("mySqlPassword");
const mySqlDatabase = config.get("mySqlDatabase");

const app = express();

//creating connection to the database
const mySqlConnection = mysql.createConnection({
  host: mySqlHost,
  user: mySqlUser,
  password: mySqlPassword,
  database: mySqlDatabase,
});
//checking if the connection is established
mySqlConnection.connect((err) => {
  if (err) throw err;
  else console.log("connected to db");
});

app.use(cors());
app.use(bodyParser.json());
//to view logs on cmd console
app.use(logger("common"));
app.use("/apis/users", users);
app.use("/apis/dispatch", auth, dispatch);

const port = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test")
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
module.exports = app;
