const express = require("express");
const cors = require("cors");

const adminDB = require("./db/adminDB");
const usersRoutes = require("./routes/usersRoutes");

const port = 4000;

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/users", usersRoutes);

app.listen(port, () => console.log(`connect on port ${port}`));
