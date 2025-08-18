const mysql = require("mysql");

const adminDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pannel_admin",
});

module.exports = adminDB;
