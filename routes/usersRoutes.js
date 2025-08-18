const express = require("express");
const adminDB = require("../db/adminDB");

const usersRoutes = express.Router();

usersRoutes.post("/", (req, res) => {
  const body = req.body;
  let date = new Date().toLocaleDateString("fa-IR");
  adminDB.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connected");
      let newUser = `INSERT INTO users VALUES (NULL,${body.firstname},${body.lastname},${body.username},${body.password},${date})`;
      adminDB.query(newUser, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("user added");
        }
      });
    }
  });
});

module.exports = usersRoutes;
