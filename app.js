import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import passportManager from "./config/passport";
import config from "./config/db";
import router from "./routes";
import errorHandler from './config/errorHandler';

const app = express();

//mongoose setup
mongoose.Promise = Promise;
mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "dist")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "*"
  );
  next();
});

// routes setup
app.use("/", router);

// catch 404 and forward to error handler
/*
app.use((req, res, next) => {
  next(createError(404));
});
*/

// error handler
app.use((err, req, res, next) => {  
  const { message } = err;
  const status = err.status || 500

  errorHandler.run(res, message, status);
});

app.use(passportManager.initialize());

export default app;
