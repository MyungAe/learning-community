const mariaDB = require("mariadb");

const pool = mariaDB.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionLimit: 5,
  port: process.env.DB_PORT,
});

module.exports = pool;
