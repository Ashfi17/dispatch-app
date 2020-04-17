const express = require("express");
const router = express.Router();
const mySqlConnection = require("../../connection");
const officegen = require("officegen");
const fs = require("fs");
const path = require("path");

//fetching all the source code
router.get("/source_code", (req, res, next) => {
  try {
    mySqlConnection.query(
      `SELECT source_code  FROM source_master  `,
      (err, result) => {
        if (!err) {
          res.status(200).send({
            status: 200,
            data: result,
            message: "fetched source_codes",
          });
        } else {
          res.status(400).send({
            status: 400,
            message: "Error fetching source  codes",
          });
        }
      }
    );
  } catch (e) {
    next(e);
  }
});
//fetching all the destination code
router.get("/destination_code", (req, res, next) => {
  try {
    mySqlConnection.query(
      `SELECT destn_code  FROM destination_master  `,
      (err, result) => {
        if (!err) {
          res.status(200).send({
            status: 200,
            data: result,
            message: "fetched destination_codes",
          });
        } else {
          res.status(400).send({
            status: 400,
            message: "Error fetching destination  codes",
          });
        }
      }
    );
  } catch (e) {
    next(e);
  }
});
//fetching all the transporter code
router.get("/transporter_code", (req, res, next) => {
  try {
    mySqlConnection.query(
      `SELECT  transporter_code from transporter_master   `,
      (err, result) => {
        if (!err) {
          res.status(200).send({
            status: 200,
            data: result,
            message: "fetched transporter_code",
          });
        } else {
          res.status(400).send({
            status: 400,
            message: "Error fetching transporter  codes",
          });
        }
      }
    );
  } catch (e) {
    next(e);
  }
});

//for adding source destination and transport details in master table
router.post("/add-source-destination", async (req, res, next) => {
  // toUpperCase()
  const source = req.body.source;
  const destination = req.body.destination;
  const transporter = req.body.transporter;
  try {
    if (!source || !destination) {
      res.status(400).send({
        message: "missing parameters",
      });
    } else {
      mySqlConnection.query(
        `(SELECT source_name  FROM source_master WHERE source_name = ?) UNION(SELECT destn_name FROM destination_master WHERE destn_name = ?)UNION(SELECT transporter_name FROM transporter_master WHERE transporter_name = ?)`,
        [
          source.toUpperCase(),
          destination.toUpperCase(),
          transporter.toUpperCase(),
        ],
        (err, result) => {
          if (!err) {
            if (result.length == 0) {
              mySqlConnection.query(
                "INSERT INTO source_master(source_name)VALUES(?)",
                [source.toUpperCase()],

                (err, result) => {
                  if (!err) {
                    mySqlConnection.query(
                      "INSERT INTO destination_master(destn_name)VALUES(?)",
                      [destination.toUpperCase()],
                      (err, result) => {
                        if (!err) {
                          mySqlConnection.query(
                            "INSERT INTO transporter_master(transporter_name)VALUES(?)",
                            [transporter.toUpperCase()],
                            (err, result) => {
                              if (!err) {
                                res.status(200).send({
                                  status: 200,
                                  message: "added data successfully",
                                });
                              }
                            }
                          );
                        } else {
                          res.status(400).send({
                            message: "Bad Request",
                          });
                        }
                      }
                    );
                  } else {
                    res.status(400).send({
                      message: "Bad Request",
                    });
                  }
                }
              );
            } else {
              res.status(200).send({
                message: "source /destination /transporte already exists",
              });
            }
          } else {
            res.status(400).send({
              message: "error",
            });
          }
        }
      );
    }
  } catch (e) {
    next(e);
  }
});

//for adding the dispatch details
router.post("/add-dispatch-details", (req, res, next) => {
  const sourceCode = req.body.source_code;
  const destinationCode = req.body.destination_code;
  const transporterCode = req.body.transporter_code;

  try {
    const startDate = new Date(
      req.body.start_date.split("-").reverse().join("-")
    )
      .toISOString()
      .slice(0, 10);
    const endDate = new Date(req.body.end_date.split("-").reverse().join("-"))
      .toISOString()
      .slice(0, 10);

    const vehicleNumber = req.body.vehicle_number;
    const vRegex = /(([A-Za-z]){2,3}(|-)(?:[0-9]){1,2}(|-)(?:[A-Za-z]){2}(|-)([0-9]){1,4})|(([A-Za-z]){2,3}(|-)([0-9]){1,4})/g;
    if (vRegex.test(vehicleNumber) && endDate > startDate) {
      mySqlConnection.query(
        "INSERT INTO dispatch(source_code,destination_code,transporter_code,vehicle_number,start_date,end_date) VALUES(?,?,?,?,?,?)",
        [
          sourceCode,
          destinationCode,
          transporterCode,
          vehicleNumber,
          startDate,
          endDate,
        ],
        (err, result) => {
          if (!err) {
            res.status(200).send({
              status: 200,
              message: "Created dispatch details successfully",
            });
          } else {
            res.status(400).send({
              message: "Bad Request",
            });
          }
        }
      );
    } else {
      res.status(400).send({
        message: "Please enter Valid details",
      });
    }
  } catch (e) {
    next(e);
  }
});

//for getting the disptahc details
router.get("/dispatch-details", (req, res, next) => {
  try {
    mySqlConnection.query(
      "SELECT * FROM dispatch order by start_date DESC",
      (err, result) => {
        if (!err) {
          if (!result) {
            res.status(200).send({
              message: "No Data Found, Please create some dispatch details",
            });
          } else {
            res.status(200).send({
              status: 200,
              data: result,
              message: "Retrieved all details successfully",
            });
          }
        }
      }
    );
  } catch (e) {
    next(e);
  }
});

//for getting the dispatch details in sorted manner
router.post("/sort-by-date", (req, res, next) => {
  try {
    if (req.body.order === "desc") {
      mySqlConnection.query(
        "SELECT * FROM dispatch order by start_date DESC",
        (err, result) => {
          if (!err) {
            if (!result) {
              res.status(200).send({
                message: "No Data Found, Please create some dispatch details",
              });
            } else {
              res.status(200).send({
                status: 200,
                data: result,
                message: "Retrieved all details successfully",
              });
            }
          }
        }
      );
    } else if (req.body.order === "asc") {
      mySqlConnection.query(
        "SELECT * FROM dispatch order by start_date ASC",
        (err, result) => {
          if (!err) {
            if (!result) {
              res.status(200).send({
                message: "No Data Found, Please create some dispatch details",
              });
            } else {
              res.status(200).send({
                status: 200,
                data: result,
                message: "Retrieved all details successfully",
              });
            }
          }
        }
      );
    }
  } catch (e) {
    next(e);
  }
});

//for searching based on source code
router.post("/search", (req, res, next) => {
  try {
    mySqlConnection.query(
      `SELECT * FROM dispatch WHERE source_code like '${req.body.search}%' or source_code like '%${req.body.search}' limit 2`,
      (err, result) => {
        if (!err) {
          if (result.length != 0) {
            res.status(200).send({
              status: 200,
              data: result,
              message: "Searched required result successfully",
            });
          } else {
            res.status(404).send({
              status: 404,
              message: "No result found",
            });
          }
        } else {
          res.status(400).send({
            status: 400,
            message: "Bad request",
          });
        }
      }
    );
  } catch (e) {
    next(e);
  }
});

module.exports = router;
