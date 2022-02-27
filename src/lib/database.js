const mysql = require("mysql");
const { promisify } = require("util");

//Importing database keys
const config = require("../config/config");

//Creating mysql pool connection
const pool = mysql.createPool(config);

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error in the DB connection");
  }

  if (connection) connection.release();
  console.log("DB is connected");

  return;
});

//Promisify pool querys
pool.query = promisify(pool.query);

module.exports = pool;
