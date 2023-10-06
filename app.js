const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const createError = require('http-errors');
require("dotenv").config();

const indexRouter = require("./routes/index");
const gamesRouter = require("./routes/games");
const genresRouter = require("./routes/genresRouter");
const systemsRouter = require("./routes/systemsRouter");

const Genre = require("./models/genre");
const System = require("./models/system");
const { title } = require("process");

const app = express();
// db setup
mongoose.set("strictQuery", false);
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_CONN);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/css",
  express.static(
    path.join(__dirname, "node_modules", "bootstrap", "dist", "css")
  )
);
app.use(
  "/js",
  express.static(
    path.join(__dirname, "node_modules", "bootstrap", "dist", "js")
  )
);
app.use(
  "/icons",
  express.static(
    path.join(__dirname, "node_modules", "bootstrap-icons", "font")
  )
);
app.use(
  "/js2",
  express.static(path.join(__dirname, "node_modules", "bootstrap", ""))
);

app.use(async (req, res, next) => {
  const [systemList, genresList] =
   await Promise.all([System.find({}, "title").exec(), Genre.find({}, "title").exec()]);
  res.locals.systemList = systemList;
  res.locals.genresList = genresList;
  next();
});
app.use("/", indexRouter);
app.use("/genres", genresRouter);
app.use("/games", gamesRouter);
app.use("/system", systemsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
