const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./auth/passport");

require("./models/user");

const notFoundMiddleWare = require("./middlewares/notFound");
const errorHandlerMiddleWare = require("./middlewares/errorHandler");

const api = require("./api");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello world!",
  });
});

app.use("/api/v1", api);

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

module.exports = app;