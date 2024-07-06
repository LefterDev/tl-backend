require("dotenv").config();
const express = require("express");
const app = express();
const apiRouter = require("./routers/exporter");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./utilities/connect-db");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", apiRouter);

app.listen(8080)
