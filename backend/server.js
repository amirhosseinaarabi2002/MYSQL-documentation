const express = require("express");
const cors = require("cors");

require("./db/adminDB");
const usersRoutes = require("./routes/usersRoutes");

const port = 3001;

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/users", usersRoutes);

app.listen(port, () => console.log(`connect on port ${port}`));
