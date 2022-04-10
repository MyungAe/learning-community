const express = require("express");
const router = express.Router();
const pool = require("../database/config");

const SignIn = async (param) => {
  let connection;
  try {
    console.log("try connection db");
    connection = await pool.getConnection();
    console.log("success connection to db");
    await connection.query("use study_service");
    console.log("select database in db");
    const rows = await connection.query(
      `select email, password from account where email='${param}'`
    );
    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (connection) connection.end();
  }
};

router
  .route("/")
  .get((req, res) => {
    res.sendFile("./");
  })
  .post((req, res, next) => {
    console.log(req.body);
    const param = req.body.id;
    SignIn(param).then((data) => {
      if (req.body.id === data[0].email && req.body.pw === data[0].password)
        res.send("success to login");
      else res.send("fail to login");
    });
  });

module.exports = router;
