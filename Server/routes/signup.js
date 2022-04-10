const express = require("express");
const router = express.Router();
const pool = require("../database/config");
const bcrypt = require("bcrypt");
const saltRounds = 5;

async function InsertDB(param) {
  let connection;
  try {
    console.log("try connect");
    connection = await pool.getConnection();
    console.log("success connect");
    connection.query("use study_service");
    console.log("success select database");
    const res = await connection.query(
      "INSERT INTO account(email, password) value (?, ?)",
      param
    );
    console.log("success query, res : ", res);
  } catch (err) {
    throw err;
  } finally {
    if (connection) connection.end();
  }
}

router
  .route("/")
  .get((req, res) => {
    res.sendFile("./");
  })
  .post((req, res, next) => {
    console.log(req.body);
    const param = [req.body.id, req.body.pw];
    console.log(param);
    InsertDB(param);
    res.send("post /abc and send data");
  });

module.exports = router;
