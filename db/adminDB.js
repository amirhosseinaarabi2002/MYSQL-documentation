const mysql = require("mysql");

const adminDB = mysql.createConnection({
  host: "api-users-db",
  user: "root",
  password: "btOFqkPFuYJI4kWteCUt4ie3",
  database: "jovial_lamarr",
  port: 3306,
});

module.exports = adminDB;
