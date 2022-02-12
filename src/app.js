//all of our routes like app.use
const path = require("path");
const express = require("express");
// const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
module.exports = app;

// keys
if (process.env.NODE_ENV !== "production") {
  require("../.keys") && require("dotenv").config();
}

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// cors middleware
app.use(cors({ origin: true }));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// auth and api routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "public/index.html"));
// });

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
