const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const generateToken = require("../../middleware/generateToken");

const mySqlConnection = require("../../connection");

//creates a new user
router.post("/new", async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.user_password, salt);
  const email = req.body.user_email;

  try {
    mySqlConnection.query(
      `select user_email from users where user_email = ?`,
      [email],
      (err, userEmail) => {
        if (!err) {
          //if there is no similar email id present in db then procedd further
          if (userEmail.length == 0) {
            mySqlConnection.query(
              "INSERT INTO users(user_name,user_email,user_address,user_password)VALUES(?,?,?,?)",
              [req.body.user_name, email, req.body.user_address, password],
              (err, result) => {
                if (!err) {
                  mySqlConnection.query(
                    "SELECT * FROM demo.users WHERE user_email = ?",
                    email,
                    (err, result) => {
                      if (!err) {
                        res.status(200).send({
                          status: 200,
                          data: result,
                          message: "user created successfully",
                        });
                      } else {
                        res.status(400).send({
                          status: 400,
                          message: "bad request",
                        });
                      }
                    }
                  );
                } else {
                  res.status(400).send({
                    status: 400,
                    message: "bad request",
                  });
                }
              }
            );
          } else {
            res.status(409).send({
              message: "email already exists",
            });
          }
        } else next(err);
      }
    );
  } catch (e) {
    next(e);
  }
});

//for login
router.post("/login", async (req, res, next) => {
  const email = req.body.user_email;
  const password = req.body.user_password;
  try {
    mySqlConnection.query(
      "select * from users where user_email = ?",
      [email],
      async (err, userDetail) => {
        if (!err) {
          //if there is no email present then return a error message
          if (userDetail.length == 0) {
            res.status(400).send({
              message: "Email address invalid",
            });
          } else {
            let compare_result = await bcrypt.compare(
              password,
              userDetail[0].user_password
            );
            if (!compare_result) {
              return res.status(500).send({ message: "Invalid Password!" });
            } else {
              let userDetails = {
                user_id: userDetail[0].user_id,
                user_email: userDetail[0].user_email,
                user_name: userDetail[0].user_name,
                user_password: userDetail[0].user_password,
              };
              let token = generateToken(userDetails);
              res.status(200).json({
                status: 200,
                message: "Logged in successful",
                token: token,
                loggedInUser: userDetails,
              });
            }
          }
        } else {
          next(err);
        }
      }
    );
  } catch (e) {
    next(e);
  }
});

//DELETE API ONLY FOR TEST PURPOSE
router.delete("/delete/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    mySqlConnection.query(
      "DELETE FROM users WHERE (user_id = ?);",
      id,
      (err, result) => {
        if (!err) {
          res.status(200).send({
            status: 200,
            message: "user deleted successfully",
          });
        } else {
          res.status(400).send({
            status: 400,
            message: "ERROR ! cannot delete user",
          });
        }
      }
    );
  } catch (e) {
    next(e);
  }
});
module.exports = router;
